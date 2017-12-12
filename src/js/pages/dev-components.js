require('../../scss/pages/dev-components.scss');
const Super = require('../pages-super/super');

class Sub extends Super {
    power() {
        const self = this;
        const applications = self.applications;

        // ajax测试
        (function () {
            // const Ajax = require('../api/ajax');
            // new Ajax({
            //     callback: {},
            //     config: {
            //         url: '/api/getList',
            //     },
            //     data: {
            //         hellow: 'hellow',
            //     },
            // });
        }());

        // 测试滚动到底部功能以及loading组件
        (function () {
            const Loading = require('../components-dom/g-loading');
            const WhenScrollBottom = applications.whenScrollBottom();
            let num = 0;
            new WhenScrollBottom({
                isInitRender: false,
                callback: {
                    success: function (self) {
                        num++;
                        new Loading({
                            wrap: '.g-body',
                            config: {
                                status: 'loading',
                            },
                        });
                        if (num >= 5) {
                            self.isLoadOver = true;
                            new Loading({
                                config: {
                                    status: 'over',
                                },
                            });
                        }
                    },
                },
            });
        }());

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

        // 弹窗测试
        (function () {
            const Dialog = require('../components-dom/g-dialog');
            document.querySelector('.page-button-dialog').addEventListener('click', function () {
                new Dialog({
                    callback: {
                        confirm: function () {
                            new Dialog({config: {alert: {icon: 'icon-chenggong', content: '已确认'}}});
                        },
                        cancel: function () {
                            new Dialog({config: {alert: {icon: 'icon-chenggong', content: '已取消'}}});
                        },
                        close: function () {
                            new Dialog({config: {alert: {icon: 'icon-chenggong', content: '已关闭'}}});
                        },
                    },
                    config: {
                        type: 'confirm',
                    },
                });
            });
        }());

        // 分页测试
        (function () {
            const Pagination = require('../components-dom/g-pagination');
            new Pagination({wrap: '.page-pagination'});
        }());

        // 没有数据
        (function () {
            const NoData = require('../components-dom/g-no-data');
            new NoData({wrap: '.page-no-data'});
        }());

        // 超类型模块测试
        (function () {
            const Super = require('../components-dom-super/g-super');
            new Super({wrap: '.page-super-type'});
            const Sub = require('../components-dom/g-sub');
            new Sub({wrap: '.page-super-type'});
            new Sub(); // constructorInherit里parameter去掉了对象引用,否则这个子类的默认参数wrap会变成上面.page-super-type(bug回忆)
            const SuperEs6 = require('../components-dom-super/g-super-es6');
            new SuperEs6({wrap: '.page-super-type'});
            const SubEs6 = require('../components-dom/g-sub-es6');
            new SubEs6({wrap: '.page-super-type'});
        }());

        // 单选开关
        (function () {
            const Radio = require('../components-dom/g-radio-switch');
            new Radio({
                wrap: '.page-radio-switch',
                callback: {
                    click: function (json) {
                        console.log(json);
                    },
                },
            });
        }());

        // 表格
        (function () {
            const Table = require('../components-dom/g-table');
            new Table({
                wrap: '.page-table',
                data: {
                    header: [
                        {
                            content: '<div>header0</div>',
                        },
                        {
                            content: '<div>header1</div>',
                        },
                        {
                            content: '<div>header2</div>',
                        },
                    ],
                    body: [
                        [
                            {
                                content: '<div>body0-0</div>',
                            },
                            {
                                content: '<div>body1-0</div>',
                            },
                            {
                                content: '<div>body2-0</div>',
                            },
                        ],
                        [
                            {
                                content: '<div>body0-1</div>',
                            },
                            {
                                content: '<div>body1-1</div>',
                            },
                            {
                                content: '<div>body2-1</div>',
                            },
                        ],
                        [
                            {
                                content: '<div>body0-2</div>',
                            },
                            {
                                content: '<div>body1-2</div>',
                            },
                            {
                                content: '<div>body2-2</div>',
                            },
                        ],
                    ],
                    footer: '',
                },
            });
        }());

        // 星评
        (function () {
            require.ensure([], function (require) {
                const Star = require('../components-dom/g-star');
                new Star({
                    wrap: '.page-star',
                    callback: {
                        click: function (json) {
                            console.log(json);
                        },
                    },
                });
            }, 'g-star');
        }());
    }
}

new Sub();
