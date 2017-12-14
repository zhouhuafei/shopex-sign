const Super = require('../api-super/super');

class Sub extends Super {
    init() {
        const self = this;
        const req = this.req;
        const body = req.body;
        const SignLogs = require('../../models/mongoose/sign-logs');
        const reqNowPage = body.nowPage || 1;
        const reqNowCount = body.nowCount <= 20 ? 20 : body.nowCount;
        let allCount = null;
        let allPage = null;
        SignLogs.count('*', function (error, result) {
            if (error) {
                self.render({
                    status: 'failure',
                    message: '数据库查询失败',
                });
            } else {
                allCount = result;
                self.render({
                    status: 'success',
                    message: '数据库查询成功',
                });
            }
        });
    }
}

module.exports = Sub;
