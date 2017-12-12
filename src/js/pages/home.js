require('../../scss/pages/home.scss');
const Super = require('../pages-super/super');

class Sub extends Super {
    power() {
        const superSelf = this;
        // slide切换
        (function () {
            const Slide = require('../components-dom/g-slide');
            new Slide({
                wrap: '.page-slide',
                data: {
                    items: [
                        {
                            img: {
                                width: 0,
                                height: 0,
                                src: 'http://img1.imgtn.bdimg.com/it/u=1056872014,4038868309&fm=23&gp=0.jpg',
                            },
                            href: '',
                        },
                        {
                            img: {
                                width: 0,
                                height: 0,
                                src: 'http://img3.imgtn.bdimg.com/it/u=1732308780,3782498029&fm=23&gp=0.jpg',
                            },
                            href: '',
                        },
                        {
                            img: {
                                width: 0,
                                height: 0,
                                src: 'http://img3.imgtn.bdimg.com/it/u=4027566086,3099254237&fm=23&gp=0.jpg',
                            },
                            href: '',
                        },
                        {
                            img: {
                                width: 0,
                                height: 0,
                                src: 'http://img4.imgtn.bdimg.com/it/u=120609946,455952432&fm=23&gp=0.jpg',
                            },
                            href: '',
                        },
                        {
                            img: {
                                width: 0,
                                height: 0,
                                src: 'http://img2.imgtn.bdimg.com/it/u=2763208243,961494673&fm=23&gp=0.jpg',
                            },
                            href: '',
                        },
                    ],
                },
            });
        }());

        // 导航
        (function () {
            const Navigation = require('../components-dom/g-navigation');
            new Navigation({wrap: '.page-navigation'});
        }());

        // vue
        (function () {
            const Vue = superSelf.Vue;
            require.ensure([], function (require) {
                require('../components-vue/g-img-list')(Vue);
                new Vue({
                    el: '.page-vue-app',
                    template: `<div class="page-vue">
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                        <g-img-list></g-img-list>
                    </div>`,
                    mounted: function () {
                        console.log(this);
                    },
                });
            }, 'g-img-list');
        }());

        // jsonp错误测试
        /*
        this.jsonp({
            url: '/phone/api/verify-code-register-random2/',
            data: {
                isJsonp: true,
            },
            callback: function (dadaInfo) {
                console.log('jsonp error test:\n', dadaInfo);
            },
        });
        */

        // axios错误测试
        /*
        this.axios({
            url: '/phone/api/verify-code-register-random2/',
            method: 'get',
        }).then(function (dadaInfo) {
            console.log('axios error test:\n', dadaInfo);
        });
        */
    }
}

new Sub();
