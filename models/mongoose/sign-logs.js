const mongoose = require('../../db/mongoose');
const schema = new mongoose.Schema({
    // 用户名(账号)
    username: {
        type: String,
        default: null,
        index: true,
    },
    // 签到信息
    signMessage: {
        type: String,
        default: null,
    },
    // 小尾巴
    smallTail: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model('sign-logs', schema);
