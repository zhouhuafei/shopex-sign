const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合
const Super = require('../components-dom-super/g-super'); // 超类型(子类型继承的对象)

// 子类型
const Sub = tools.constructorInherit(Super, {
    // 回调
    callback: {},
    // 配置
    config: {
        status: 'loading', // 加载状态 loading(加载中) over(加载完毕)
        positionMethod: '', // 模块的定位方式 'fixed'(相对于整个文档) 'absolute'(相对于外部容器)
        positionLocation: 'center', // 模块的定位位置
    },
    // 数据
    data: {},
});

// 内部模块的创建(覆盖超类型)
Sub.prototype.moduleDomCreate = function () {
    const config = this.opts.config;
    let moduleDomHtml = '';
    let moduleDomClass = '';
    const status = config.status;
    const positionMethod = config.positionMethod;
    const positionLocation = config.positionLocation;
    // 加载中
    if (status === 'loading') {
        moduleDomClass = 'g-loading-run ';
        // 相对文档居中
        if (positionMethod === 'fixed') {
            moduleDomClass += `g-loading-fixed g-loading-${positionLocation}`;
        }
        // 相对容器居中
        if (positionMethod === 'absolute') {
            moduleDomClass += `g-loading-absolute g-loading-${positionLocation}`;
        }
        moduleDomHtml = `
            <div class="g-loading-body">
                <div class="g-loading-run-icon iconfont icon-jiazaizhong"></div>
            </div>
        `;
    }
    // 加载完毕
    if (status === 'over') {
        moduleDomClass = 'g-loading-over ';
        // 相对文档居中
        if (positionMethod === 'fixed') {
            moduleDomClass += `g-loading-fixed g-loading-${positionLocation}`;
        }
        // 相对容器居中
        if (positionMethod === 'absolute') {
            moduleDomClass += `g-loading-absolute g-loading-${positionLocation}`;
        }
        moduleDomHtml = `
            <div class="g-loading-body">
                <div class="g-loading-over-icon iconfont icon-meiyoushuju"></div>
                <div class="g-loading-over-text">没有数据了</div>
            </div>
        `;
    }
    // 模块创建
    this.moduleDom = applications.createElement({
        style: this.opts.config.moduleDomStyle,
        customAttribute: this.opts.config.moduleDomCustomAttribute,
        attribute: {
            className: `g-loading ${moduleDomClass}`,
            innerHTML: moduleDomHtml,
        },
    });
};

// 功能(覆盖超类型)
Sub.prototype.power = function () {
    // 功能重写待续...
};

module.exports = Sub;
