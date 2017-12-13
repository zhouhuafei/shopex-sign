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
const axios = require('axios');
const qs = require('qs');
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
    const fnError = function (data) {
        dataInfo.status = 'error';
        dataInfo.error = data;
        dataInfo.message = data;
        res.json(dataInfo);
    };
    const fnFailure = function (data) {
        dataInfo.status = 'failure';
        dataInfo.error = data;
        dataInfo.message = data.error;
        res.json(dataInfo);
    };
    const body = req.body;
    const power = body.power;
    let username = body.username;
    const reUsername = /\d+/ig.exec(username);
    username = reUsername ? `s${reUsername[0]}` : '';
    const password = body.password;
    const url = 'http://oa.shopex.cn:89/client.do';
    if (!username) {
        dataInfo.message = '用户名必填';
        res.json(dataInfo);
    } else {
        // 登录
        axios({
            url: url,
            method: 'post',
            data: qs.stringify({
                method: 'login',
                loginid: username,
                password: password,
            }),
        }).then(function (axiosData) {
            const data = axiosData.data;
            const setCookie = axiosData.headers['set-cookie'];
            console.log('setCookie=>:', setCookie);
            const getCookie = function (cookie) {
                const arr = [];
                cookie.forEach(function (v) {
                    arr.push(v.split(';')[0]);
                });
                return arr.join('&');
            };
            const cookie = getCookie(setCookie);
            console.log('cookie=>:', cookie);
            if (!data.error) {
                const ajaxData = {
                    method: 'checkin',
                    latlng: '31.168059, 121.417951',
                    addr: '上海市徐汇区桂林路靠近中核浦原科技园',
                    sessionkey: data.sessionkey,
                };
                if (power === 'signIn') { // 签到
                    ajaxData.type = 'checkin';
                    console.log('ajaxData=>:', ajaxData);
                    // axios({
                    //     url: url,
                    //     method: 'post',
                    //     data: qs.stringify(ajaxData),
                    // }).then(function (axiosData) {
                    //     const data = axiosData.data;
                    //     if (!data.error) {
                    //
                    //     } else {
                    //         fnFailure(data);
                    //     }
                    //     console.log('signIn-data=>:', data);
                    // }).catch(fnError);
                } else if (power === 'signOut') { // 签退
                    ajaxData.type = 'checkout';
                    console.log('ajaxData=>:', ajaxData);
                    axios({
                        url: url,
                        headers: {
                            'Cookie': cookie,
                        },
                        method: 'post',
                        data: qs.stringify(ajaxData),
                    }).then(function (axiosData) {
                        const data = axiosData.data;
                        if (!data.error) {

                        } else {
                            fnFailure(data);
                        }
                        console.log('signOut-data=>:', data);
                    }).catch(fnError);
                } else {
                    res.json(dataInfo);
                }
            } else {
                fnFailure(data);
            }
        }).catch(fnError);
    }
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

// mongodb数据库链接
const mongoose = require('./db/mongoose');
mongoose.connection.on('connected', function () {
    // redis数据库链接
    const redisClient = require('./db/redis');
    redisClient.on('connect', function () {
        // 把redis的客户端应用到全局的app上使用
        app.redisClient = redisClient;

        // 服务
        const server = app.listen('5552', function () {
            console.log('server connection open to:\n', `http://localhost:${server.address().port}`);
        });
    });
});
