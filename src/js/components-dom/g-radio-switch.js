const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合
const Super = require('../components-dom-super/g-super'); // 超类型(子类型继承的对象)

// 子类型
const Sub = tools.constructorInherit(Super, {
    // 回调
    callback: {
        click: function () {
        },
    },
    // 配置
    config: {
        isHand: false, // 是否手动控制
        status: 'on', // 状态
        txt: {
            on: '已开启',
            off: '已关闭',
        },
    },
    // 数据
    data: {},
});

// 内部模块的创建(覆盖超类型)
Sub.prototype.moduleDomCreate = function () {
    const config = this.opts.config;
    this.moduleDomActiveClass = 'g-radio-switch-active';
    let isOn = '';
    if (config.status === 'on') {
        isOn = this.moduleDomActiveClass;
    }
    this.moduleDom = applications.createElement({
        style: config.moduleDomStyle,
        customAttribute: config.moduleDomCustomAttribute,
        attribute: {
            className: `g-radio-switch ${isOn}`,
            innerHTML: `
                <div class="g-radio-switch-wrap">
                    <div class="g-radio-switch-round"></div>
                </div>
                <div class="g-radio-switch-text">${config.txt[config.status]}</div>
            `,
        },
    });
};

// 功能(覆盖超类型)
Sub.prototype.power = function () {
    const self = this;
    const config = this.opts.config;
    this.moduleDom.addEventListener('click', function () {
        if (!config.isHand) {
            if (!self.isOn()) {
                self.on();
            } else {
                self.off();
            }
        }
        self.opts.callback.click({status: config.status});
    });
};

// 是否处于开启状态
Sub.prototype.isOn = function () {
    return this.moduleDom.classList.contains(this.moduleDomActiveClass);
};

// 开启
Sub.prototype.on = function () {
    const config = this.opts.config;
    if (!this.isOn()) {
        this.moduleDom.classList.add(this.moduleDomActiveClass);
        config.status = 'on';
        this.moduleDom.querySelector('.g-radio-switch-text').innerHTML = `${config.txt[config.status]}`;
    }
};

// 关闭
Sub.prototype.off = function () {
    const config = this.opts.config;
    if (this.isOn()) {
        this.moduleDom.classList.remove(this.moduleDomActiveClass);
        config.status = 'off';
        this.moduleDom.querySelector('.g-radio-switch-text').innerHTML = `${config.txt[config.status]}`;
    }
};

module.exports = Sub;
