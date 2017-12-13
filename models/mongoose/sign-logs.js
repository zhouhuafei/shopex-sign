const mongoose = require('../../../../db/mongoose');
const schema = new mongoose.Schema({
    // 用户名(账号)
    username: {
        type: String,
        default: null,
        unique: true,
        required: [true, 'username is required'],
    },
    // 账号创建时间
    createTime: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('sign-logs', schema);
