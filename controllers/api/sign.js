const Super = require('../api-super/super');

class Sub extends Super {
    init() {
        const self = this;
        const app = this.app;
        const req = this.req;
        const axios = this.axios;
        const smallTail = this.smallTail;
        const qs = this.qs;
        const SignLogs = require('../../models/mongoose/sign-logs');
        const redisClient = app.redisClient;
        const whiteList = require('../../db/white-list');
        const fnCatch = function (data) {
            self.render({
                status: 'failure',
                failureInfo: data,
                message: data,
            });
        };
        const fnFailure = function (data) {
            self.render({
                status: 'failure',
                failureInfo: data,
                message: data.error,
            });
        };
        const body = req.body;
        const power = body.power;
        let username = body.username;
        if (username.trim() === '') {
            self.render({
                message: '账号不能为空',
            });
            return;
        }
        const reUsername = /\d+/ig.exec(username);
        username = reUsername ? `s${reUsername[0]}` : '';
        const password = body.password;
        const url = 'http://oa.shopex.cn:89/client.do';
        let isWhite = false;
        whiteList.forEach(function (v) {
            console.log(username, v);
            if (username === v) {
                isWhite = true;
            }
        });
        if (!isWhite) {
            self.render({
                message: '该账户是黑户,暂无权限',
            });
            return;
        }
        if (!username) {
            self.render({
                message: '账号格式错误',
            });
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
                const getCookie = function (cookie) {
                    const arr = [];
                    cookie.forEach(function (v) {
                        arr.push(v.split(';')[0]);
                    });
                    return arr.join('; ');
                };
                const cookie = getCookie(setCookie);
                if (!data.error) {
                    const ajaxData = {
                        method: 'checkin',
                        latlng: '31.168059, 121.417951',
                        addr: '上海市徐汇区桂林路靠近中核浦原科技园',
                        sessionkey: data.sessionkey,
                    };
                    if (power === 'signIn') { // 签到
                        ajaxData.type = 'checkin';
                        redisClient.get(`${username}IsLogin`, function (error, reply) {
                            if (!reply && !error) {
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
                                        const nowDate = new Date();
                                        const TomorrowDate = new Date();
                                        TomorrowDate.setDate(nowDate.getDate() + 1);
                                        TomorrowDate.setHours(0);
                                        TomorrowDate.setMinutes(0);
                                        TomorrowDate.setSeconds(0);
                                        const lastSeconds = parseInt((TomorrowDate.getTime() - nowDate.getTime()) / 1000);
                                        redisClient.set(`${username}IsLogin`, true, 'ex', lastSeconds);
                                        self.render({
                                            status: 'success',
                                            message: data.msg,
                                        });
                                    } else {
                                        fnFailure(data);
                                    }
                                }).catch(fnCatch);
                            } else {
                                self.render({
                                    message: '我已经签过了,但是我不知道',
                                });
                            }
                        });
                    } else if (power === 'signOut') { // 签退
                        ajaxData.type = 'checkout';
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
                                const signLogs = new SignLogs({
                                    username: username,
                                    signMessage: data.msg,
                                    smallTail: smallTail[Math.round(Math.random() * (smallTail.length - 1))],
                                });
                                signLogs.save(function (error, result) {
                                    if (error) {} else {}
                                    self.render({
                                        status: 'success',
                                        message: data.msg,
                                    });
                                });
                            } else {
                                fnFailure(data);
                            }
                        }).catch(fnCatch);
                    } else {
                        self.render();
                    }
                } else {
                    fnFailure(data);
                }
            }).catch(fnCatch);
        }
    }
}

module.exports = Sub;
