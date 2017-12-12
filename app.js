// 环境
const env = process.env.NODE_ENV; // 开发环境 or 生产环境
const isProduction = env !== 'development'; // 是否是生产环境

// 应用
const express = require('express');
const app = express();

// gzip压缩
const compression = require('compression');
app.use(compression()); // gzip压缩

// 模版引擎(ejs)
const ejs = require('ejs');
app.set('views', 'views');
app.set('view engine', 'ejs');
app.set('view cache', true);

// 托管资源文件
app.use(express.static('assets'));

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

// 服务
const server = app.listen('5552', function () {
    console.log('server connection open to:\n', `http://localhost:${server.address().port}`);
});
