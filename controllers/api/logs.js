const Super = require('../api-super/super');

class Sub extends Super {
    init() {
        const self = this;
        const req = this.req;
        const body = req.body;
        const SignLogs = require('../../models/mongoose/sign-logs');
        const reqNowPage = body.nowPage || 1;
        const reqNowCount = body.nowCount <= 20 ? 20 : body.nowCount;
        SignLogs.count({}, function (error, result) {
            if (error) {
                self.render({
                    status: 'failure',
                    message: '数据库查询失败',
                });
            } else {
                const allCount = result;
                SignLogs
                    .find({})
                    .sort({'_id': -1})
                    .skip((reqNowPage - 1) * reqNowCount)
                    .limit(reqNowCount)
                    .exec(function (error, result) {
                        if (error) {
                            self.render({
                                status: 'failure',
                                message: '数据库查询失败',
                            });
                        } else {
                            const nowCount = result.length;
                            result.forEach(function (v) {
                                const temporary = v.username.split('');
                                temporary[0] = '*';
                                temporary[1] = '*';
                                temporary[3] = '*';
                                v.username = temporary.join('');
                            });
                            self.render({
                                status: 'success',
                                message: '数据库查询成功',
                                result: {
                                    data: result,
                                    nowPage: reqNowPage,
                                    nowCount: nowCount,
                                    allPage: Math.ceil(allCount / nowCount),
                                    allCount: allCount,
                                },
                            });
                        }
                    });
            }
        });
    }
}

module.exports = Sub;
