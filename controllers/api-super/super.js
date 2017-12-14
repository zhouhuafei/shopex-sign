class Super {
    constructor(opts) {
        this.app = opts.app;
        this.req = opts.req;
        this.res = opts.res;
        this.axios = require('axios');
        this.qs = require('qs');
        this.tools = require('../../src/utils/tools');
        this.smallTail = require('../../db/smll-tail');
        this.dataInfo = {
            status: 'failure', // 'failure' | 'success'
            message: '请求失败',
            failureInfo: null,
            failureCode: null, // 401 未授权 未登录
            result: {
                data: [],
                nowPage: 1,
                allPage: 1,
                nowCount: 0,
                allCount: 0,
            },
        };
        this.init();
    }

    init() {}

    render(json = {}) {
        const self = this;
        self.res.json(self.tools.extend({defaults: self.dataInfo, inherits: json}));
    }
}

module.exports = Super;
