import Vue from 'vue';
import Router from 'vue-router';
import routeConfig from './config';

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
        name: 'signIn',
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
        name: 'signOut',
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

const routes2 = [];
Object.keys(routeConfig).forEach(function (key) {
    const v = routeConfig[key];
    routes2.push({
        path: v.pathRoute,
        name: v.name,
        meta: v.meta,
        /*
        component: function (resolve) {
            require.ensure([], function () {
                resolve(require(`${path.view}${v.component ? v.component : key}.vue`));
            }, key);
        },
        */
        // component: resolve => require([`${path.view}${v.component ? v.component : key}.vue`], resolve),
        // component: require(pathView),
        component: require('../views/logs.vue'), // 写成变量就是不行,呵呵呵,去路由页面添加试试
    });
});
console.log(routes);
console.log(routes2);

export default new Router({
    // mode: 'history',
    // base: '/base/url/',
    // 上述模式需要后台配置一些什么东西,懒得看,先贴个链接:https://router.vuejs.org/zh-cn/essentials/history-mode.html
    routes: routes2,
});
