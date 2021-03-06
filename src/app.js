import Vue from 'vue';
import app from './app.vue';
import router from './routes/route';
import store from './vuex/store';
import tools from './utils/tools';
import applications from './utils/applications';
import axios from './api/axios';

// 公共的样式
require('./scss/commons/common.scss');

// 工具方法
Vue.prototype.$tools = tools;
Vue.prototype.$applications = applications;
Vue.prototype.$axios = axios;

// 关闭vue的提示
Vue.config.productionTip = false;

// 路由处理
router.beforeEach(function (to, from, next) {
    // 标题
    const titleDom = document.querySelector('title');
    if (titleDom) {
        titleDom.innerHTML = to.meta.title;
    }

    // 验证是否登录
    const isLogin = true;
    if (to.meta.isValidateLogin && !isLogin) {
        next({path: '/'});
    } else {
        next();
    }
});
router.afterEach(function (to, from) {
    // 二维码
    const qrDom = document.querySelector('.g-qr-code-svg');
    if (qrDom) {
        qrDom.innerHTML = applications.qrCode(window.location.href);
    }
});

window.addEventListener('load', function () {
    setTimeout(function () {
        new Vue({
            el: '#app',
            router,
            store,
            template: '<app></app>',
            components: {app},
        });
    }, 0);
});
