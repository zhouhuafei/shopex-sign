// 应用
const express = require('express');
const app = express();

// gzip压缩
const compression = require('compression');
app.use(compression()); // gzip压缩

// 托管资源文件
app.use(express.static('dist'));

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
