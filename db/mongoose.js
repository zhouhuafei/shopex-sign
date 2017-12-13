// process.env.NODE_ENV
const env = process.env.NODE_ENV;

// config
const config = require('./config');
const configMongodb = config.mongodb[env];

// mongodb
const mongoose = require('mongoose');

// 路径,数据库名字
const url = `mongodb://${configMongodb.host}:${configMongodb.port}/${configMongodb.db}`;

// mongoose不推荐使用它们自己封装好的Promise
mongoose.Promise = global.Promise;

// 链接
mongoose.connect(url, {useMongoClient: true});

// 连接成功
mongoose.connection.on('connected', function () {
    console.log('mongoose connection open to:\n', `http://${configMongodb.host}:${configMongodb.port}`);
});

// 连接异常
mongoose.connection.on('error', function (error) {
    console.log('mongoose connection error:\n', error);
});

// 连接断开
mongoose.connection.on('disconnected', function () {
    console.log('mongoose connection disconnected');
});

module.exports = mongoose;
