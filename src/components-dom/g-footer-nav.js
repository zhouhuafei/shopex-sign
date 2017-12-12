const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合
const Super = require('../components-dom-super/g-super'); // 超类型(子类型继承的对象)

// 子类型
const Sub = tools.constructorInherit(Super, {
    // 容器
    wrap: '.g-footer',
    // 回调
    callback: {},
    // 配置
    config: {},
    // 数据
    data: [
        // {
        //     routeName: 'home',
        //     href: '/',
        //     text: '首页',
        //     icon: 'icon-shouye',
        //     isHighlight: false,
        //     isShowMark: false
        // }
    ],
});

Sub.prototype.moduleDomCreate = function () {
    this.moduleDomClass = 'g-footer-nav';
    let moduleDomHtml = '';
    const data = this.opts.data;
    Object.keys(data).forEach(function (key) {
        const v = data[key];
        let highlightClass = '';
        if (v.isHighlight) {
            highlightClass = 'g-footer-nav-item-active';
        }
        let markHtml = '';
        if (v.isShowMark) {
            markHtml = '<div class="g-footer-nav-item-mark"></div>';
        }
        moduleDomHtml += `
            <a class="g-footer-nav-item ${highlightClass}" href="${v.href}">
                <div class="g-footer-nav-item-icon iconfont ${v.icon}"></div>
                <div class="g-footer-nav-item-text">${v.text}</div>
                ${markHtml}
            </a>
        `;
    });
    this.moduleDom = applications.createElement({
        style: this.opts.config.moduleDomStyle,
        customAttribute: this.opts.config.moduleDomCustomAttribute,
        attribute: {
            className: this.moduleDomClass,
            innerHTML: `<div class="g-footer-nav-body">${moduleDomHtml}</div>`,
        },
    });
};

// 功能(覆盖超类型)
Sub.prototype.power = function () {
    // 功能重写待续...
};

module.exports = Sub;
