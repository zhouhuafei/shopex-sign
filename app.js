// 应用
const express = require('express');
const app = express();

// 托管资源文件
const ms = require('ms'); // 转成毫秒数
app.use(express.static('dist', {maxAge: ms('1y')})); // 托管资源文件(一年缓存)

// gzip压缩
const compression = require('compression');
app.use(compression()); // gzip压缩

// 数据解析
const bodyParser = require('body-parser'); // 可以对post delete update请求方式进行数据解析
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// 接口
const api = require('./routes/api/route');
api(app);

// 404
app.use(function (req, res, next) {
    res.status(404).send('404 - not found');
});

// 500
app.use(function (err, req, res, next) {
    if (err) {
        res.status(500).send(`500 - server error\n${err}`);
    }
});

const multipleCalls = require('zhf.multiple-calls');
const server = multipleCalls(2, function () {
    const server = app.listen('5552', function () {
        console.log('server connection open to:\n', `http://localhost:${server.address().port}`);
    });
});

// mongodb数据库链接
const mongoose = require('./db/mongoose');
mongoose.connection.on('connected', function () {
    server();
});

// redis数据库链接
const redisClient = require('./db/redis');
redisClient.on('connect', function () {
    // 把redis的客户端应用到全局的app上使用
    app.redisClient = redisClient;
    server();
});
