import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    // 日志
    {
        path: '/logs/',
        name: 'logs',
        meta: {
            title: '日志',
            isValidateLogin: false,
        },
        component: function (resolve) {
            require.ensure([], function () {
                resolve(require('../views/logs.vue'));
            }, 'logs');
        },
    },
    // 签到
    {
        path: '/',
        name: 'sign-in',
        meta: {
            title: '签到',
            isValidateLogin: false,
        },
        component: function (resolve) {
            require.ensure([], function () {
                resolve(require('../views/sign-in.vue'));
            }, 'sign-in');
        },
    },
    // 签到
    {
        path: '/sign-out/',
        name: 'sign-out',
        meta: {
            title: '签退',
            isValidateLogin: false,
        },
        component: function (resolve) {
            require.ensure([], function () {
                resolve(require('../views/sign-out.vue'));
            }, 'sign-out');
        },
    },
];

export default new Router({
    routes: routes,
});
