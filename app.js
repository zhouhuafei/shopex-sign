// 应用
const express = require('express');
const app = express();
const axios = require('axios');

// 数据解析
const bodyParser = require('body-parser'); // 可以对post delete update请求方式进行数据解析
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// gzip压缩
const compression = require('compression');
app.use(compression()); // gzip压缩

// 托管资源文件
const ms = require('ms'); // 转成毫秒数
app.use(express.static('dist', {maxAge: ms('1y')})); // 托管资源文件(一年缓存)

// 接口
app.post('/api/', function (req, res) {
    const dataInfo = {
        status: 'failure',
        message: '请求失败',
        error: null,
        result: {
            data: [],
            nowPage: 1,
            allPage: 1,
            nowCount: 0,
            allCount: 0,
        },
    };
    const body = req.body;
    const power = body.power;
    const username = body.username;
    const password = body.password;
    if (!username) {
        dataInfo.message = '用户名必填';
    }

    // 签到
    if (power === 'signIn') {

    }
    // 签退
    if (power === 'signOut') {

    }

    // 登录
    function login () {
        axios({
            url: '',
            method: 'post',
        }).then(function (data) {
            console.log('data', data);
            dataInfo.result.data.push(data);
            res.json(dataInfo);
        }).catch(function (error) {
            console.log('error', error);
            dataInfo.error = error;
            res.json(dataInfo);
        });
    }

    login();
});

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
