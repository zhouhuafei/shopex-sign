const path = {
    route: '/',
    view: '../views/',
};

const routes = [
    {
        name: 'logs',
        meta: {
            title: '日志',
        },
    },
    {
        name: 'sign-out',
        component: 'sign',
        meta: {
            title: '签退',
        },
    },
    {
        name: 'sign-in',
        component: 'sign',
        meta: {
            title: '签到',
        },
    },
];
// 路由的配置
const routeConfig = {};
routes.forEach(function (v) {
    const key = v.name;
    let pathRoute = `${path.route}${key}/`;
    if (key === 'sign-in') {
        pathRoute = `/`;
    }
    routeConfig[key] = {
        pathRoute: pathRoute,
        pathView: `${path.view}${v.component ? v.component : key}.vue`,
        name: key,
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
    };
});
export default routeConfig;
