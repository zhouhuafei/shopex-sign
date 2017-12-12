const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合
const Super = require('../components-dom-super/g-super'); // 超类型(子类型继承的对象)
const TouchSlide = require('../plugs/touch-slide'); // 轮播图插件

// 子类型
const Sub = tools.constructorInherit(Super, {
    // 回调
    callback: {
        startFun: function () {
        },
        endFun: function () {
        },
    },
    // 配置
    config: {
        isShowHref: true, // 是否有跳转
        // TouchSlide插件的配置
        touchSlide: {
            slideCell: '', // 外部容器,这个值会在底部进行覆盖,因为在这里没办法获取this
            mainCell: '.g-slide-body', // 切换元素的包裹层对象
            titCell: '.g-slide-header .g-slide-items', // 导航元素对象
            effect: 'leftLoop', // 效果'left' 'leftLoop'
            autoPlay: true, // 自动播放
            delayTime: 200, // 切换一次的持续时间
            interTime: 3000, // 多久切换一次
            startFun: function () {
                console.log('此处的函数会被覆盖,请在callback里执行回调');
            },
            endFun: function () {
                console.log('此处的函数会被覆盖,请在callback里执行回调');
            },
            defaultIndex: 0, // 默认的当前位置索引
            switchLoadClass: '.pre-load', // 预加载的class
            switchLoad: 'data-src', // 预加载的属性
        },
    },
    // 数据
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
        ],
    },
});

// 内部模块的创建(覆盖超类型)
Sub.prototype.moduleDomCreate = function () {
    this.moduleDom = applications.createElement({
        style: this.opts.config.moduleDomStyle,
        customAttribute: this.opts.config.moduleDomCustomAttribute,
        attribute: {
            className: 'g-slide',
            innerHTML: `
                ${this.renderHeader()}
                ${this.renderBody()}
            `,
        },
    });
};

Sub.prototype.renderHeader = function () {
    const self = this;
    let html = '';
    const data = self.opts.data;
    let className = '';
    data.items.forEach(function (v, i) {
        if (i === self.opts.config.touchSlide.defaultIndex) {
            className = 'on';
        }
        html += `<div class="g-slide-items ${className}"></div>`;
    });
    return `<div class="g-slide-header">${html}</div>`;
};

Sub.prototype.renderBody = function () {
    const self = this;
    let html = '';
    const data = self.opts.data;
    data.items.forEach(function (v) {
        if (self.opts.config.isShowHref) {
            html += `<a href="${v.href || 'javascript:;'}" class="g-slide-items pre-load" data-src="${v.img.src}"></a>`;
        } else {
            html += `<a class="g-slide-items pre-load" data-src="${v.img.src}"></a>`;
        }
    });
    return `<div class="g-slide-body">${html}</div>`;
};

// 功能(覆盖超类型)
Sub.prototype.power = function () {
    const self = this;
    const callback = self.opts.callback;
    const config = self.opts.config;
    const touchSlide = config.touchSlide;
    touchSlide.slideCell = self.opts.wrap;// 外部容器,必须是id
    touchSlide.startFun = function (i) {
        // 因为以下功能在插件本身进行了实现(本人对touch-slide插件进行了小修改),所以这里就注释了
        // var allImg = self.moduleDom.querySelectorAll('.g-slide-body .g-slide-items');
        // var nowIndex = ( i + 1);
        // if (touchSlide.effect == 'left') {
        //     nowIndex = i;
        // }
        // var nowImg = allImg[nowIndex];
        // var prevImg = allImg[nowIndex - 1];
        // var nextImg = allImg[nowIndex + 1];
        // nowImg.style.backgroundImage = `url(${nowImg.dataset.src})`;
        // prevImg && (prevImg.style.backgroundImage = `url(${prevImg.dataset.src})`);
        // nextImg && (nextImg.style.backgroundImage = `url(${nextImg.dataset.src})`);
        callback.startFun({self: self, index: i});
    };
    touchSlide.endFun = function (i) {
        callback.endFun({self: self, index: i});
    };
    TouchSlide(self.opts.config.touchSlide);
};

module.exports = Sub;
