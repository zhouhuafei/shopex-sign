const path = {
    route: '/',
    view: '../views/',
};

const objRoutes = {
    logs: {
        meta: {
            title: '日志',
        },
    },
    'sign-out': {
        componentName: 'sign',
        meta: {
            title: '签退',
        },
    },
    'sign-in': {
        route: '/',
        componentName: 'sign',
        meta: {
            title: '签到',
        },
    },
};
const arrRoutes = [];
Object.keys(objRoutes).forEach(function (key) {
    const v = objRoutes[key];
    console.log(`${path.view}${v.componentName ? v.componentName : key}.vue`);
    arrRoutes.push({
        path: `${path.route}${v.route ? v.route : key}/`,
        name: key,
        meta: v.meta,
        /*
        component: function (resolve) {
            require.ensure([], function () {
                resolve(require(`${path.view}${v.componentName ? v.componentName : key}.vue`));
            }, key);
        },
        */
        component: resolve => require([`${path.view}${v.componentName ? v.componentName : key}.vue`], resolve),
    });
});
export default arrRoutes;
