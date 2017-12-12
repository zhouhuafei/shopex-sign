const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合
const Super = require('../components-dom-super/g-super'); // 超类型(子类型继承的对象)

// 子类型
const Sub = tools.constructorInherit(Super, {
    // 回调
    callback: {
        click: function () {
        },
        moduleDomRenderBefore: function (self) {
            if (self.wrapDom && getComputedStyle(self.wrapDom).position === 'static') {
                self.wrapDom.style.position = 'relative';
            }
        },
    },
    // 配置
    config: {
        isTransparent: false, // 是不是透明的(默认不透明)
        positionMethod: 'fixed', // 模块的定位方式 'fixed'(相对于整个文档) 'absolute'(相对于外部容器)
    },
    // 数据
    data: {},
});

// 内部模块的创建(覆盖超类型)
Sub.prototype.moduleDomCreate = function () {
    const config = this.opts.config;
    let className = '';
    if (config.isTransparent) {
        className = 'g-mask-transparent';
    }
    if (config.positionMethod === 'fixed') {
        className = 'g-mask-fixed';
    }
    this.moduleDom = applications.createElement({
        style: this.opts.config.moduleDomStyle,
        customAttribute: this.opts.config.moduleDomCustomAttribute,
        attribute: {
            className: `g-mask ${className}`,
            innerHTML: '',
        },
    });
};

// 功能(覆盖超类型)
Sub.prototype.power = function () {
    const self = this;
    this.moduleDom.addEventListener('click', function (ev) {
        self.opts.callback.click();
        ev.stopPropagation();
    });
};

module.exports = Sub;
