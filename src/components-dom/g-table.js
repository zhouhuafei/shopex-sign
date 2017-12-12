const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合
const Super = require('../components-dom-super/g-super'); // 超类型(子类型继承的对象)

// 子类型
const Sub = tools.constructorInherit(Super, {
    // 回调
    callback: {},
    // 配置
    config: {},
    // 数据
    data: {
        header: [{content: 'undefined-header0'}, {content: 'undefined-header1'}, {content: 'undefined-header2'}],
        body: [[{content: 'undefined-body0-0'}, {content: 'undefined-body0-1'}, {content: 'undefined-body0-2'}]],
        footer: '',
    },
});

// 内部模块的创建(覆盖超类型)
Sub.prototype.moduleDomCreate = function () {
    this.moduleDom = applications.createElement({
        style: this.opts.config.moduleDomStyle,
        customAttribute: this.opts.config.moduleDomCustomAttribute,
        attribute: {
            className: 'g-table',
            innerHTML: `
                <div class="g-table-header">
                    <div class="g-table-row">
                        ${this.moduleDomCreateHeader()}
                    </div>
                </div>
                <div class="g-table-body">
                    ${this.moduleDomCreateBody()}
                </div>
                <div class="g-table-footer">
                    ${this.moduleDomCreateFooter()}
                </div>
            `,
        },
    });
};

Sub.prototype.moduleDomCreateHeader = function () {
    let html = '';
    this.opts.data.header.forEach(function (v) {
        html += `
            <div class="g-table-col">
                <div class="g-table-col-wrap">
                    ${v.content}
                </div>
            </div>
        `;
    });
    return html;
};

Sub.prototype.moduleDomCreateBody = function () {
    let html = '';
    this.opts.data.body.forEach(function (v0) {
        let row = '';
        v0.forEach(function (v1) {
            row += `
                <div class="g-table-col">
                    <div class="g-table-col-wrap">
                        ${v1.content}
                    </div>
                </div>
            `;
        });
        html += `<div class="g-table-row">${row}</div>`;
    });
    return html;
};

Sub.prototype.moduleDomCreateFooter = function () {
    return this.opts.data.footer;
};

// 功能(覆盖超类型)
Sub.prototype.power = function () {
    // 功能重写待续...
};

module.exports = Sub;
