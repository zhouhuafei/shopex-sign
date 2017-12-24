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
        },
        component: function (resolve) {
            require.ensure([], function () {
                resolve(require('../views/sign.vue'));
            }, 'sign');
        },
    },
    // 签退
    {
        path: '/sign-out/',
        name: 'sign-out',
        meta: {
            title: '签退',
        },
        component: function (resolve) {
            require.ensure([], function () {
                resolve(require('../views/sign.vue'));
            }, 'sign');
        },
    },
];

export default new Router({
    // mode: 'history',
    // base: '/base/url/',
    // 上述模式需要后台配置一些什么东西,懒得看,先贴个链接:https://router.vuejs.org/zh-cn/essentials/history-mode.html
    routes: routes,
});
