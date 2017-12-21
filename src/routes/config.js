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
        component: 'sign',
        meta: {
            title: '签退',
        },
    },
    'sign-in': {
        component: 'sign',
        meta: {
            title: '签到',
        },
    },
};
const arrRoutes = [];
Object.keys(objRoutes).forEach(function (key) {
    const v = objRoutes[key];
    console.log('componentPath', `${path.view}${v.component ? v.component : key}.vue`);
    let pathRoute = `${path.route}${key}/`;
    if (key === 'sign-in') {
        pathRoute = `/`;
    }
    arrRoutes.push({
        path: pathRoute,
        name: key,
        meta: v.meta,
        /*
        component: function (resolve) {
            require.ensure([], function () {
                resolve(require(`${path.view}${v.component ? v.component : key}.vue`));
            }, key);
        },
        */
        component: resolve => require([`${path.view}${v.component ? v.component : key}.vue`], resolve),
    });
});
export default arrRoutes;
