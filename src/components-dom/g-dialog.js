const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合
const Super = require('../components-dom-super/g-super'); // 超类型(子类型继承的对象)
const Mask = require('./g-mask'); // 遮罩

// 子类型
const Sub = tools.constructorInherit(Super, {
    // 回调
    callback: {
        moduleDomRenderBefore: function (self) {
            if (self.opts.config.type === 'confirm') {
                if (self.opts.config.confirm.isShowMask && !self.mask) {
                    self.mask = new Mask(self.opts.config.mask);
                }
                if (self.wrapDom && getComputedStyle(self.wrapDom).position === 'static') {
                    self.wrapDom.style.position = 'relative';
                }
            }
        },
        moduleDomHideAfter: function (self) {
            if (self.mask) {
                self.mask.moduleDomHide();
            }
        },
        // 确认
        confirm: function () {
        },
        // 取消
        cancel: function () {
        },
        // 关闭
        close: function () {
        },
    },
    // 配置
    config: {
        /*
         * 弹窗类型
         * `alert`  提示信息类型
         * `confirm`    确认框类型
         * */
        type: 'alert', // 默认是提示框
        /*
         * 弹窗位置
         * `center` 居中
         * `bottom` 居下
         * `top` 居上
         * */
        positionLocation: 'center', // 弹窗的定位位置    positionMethod定位方式强制fixed
        // 提示框
        alert: {
            timer: null, // 定时器装载
            time: 3000, // 展示的时间
            isShowIcon: false, // 是否显示icon
            isShowClose: true, // 是否显示关闭按钮
            icon: 'icon-chenggong', // icon的class
            content: '成功', // 内容信息
        },
        // 确认框
        confirm: {
            // 点击确认是否关闭弹窗
            isShowHeader: true, // 是否显示头部
            headerContent: '提示:', // 头部内容
            isShowBody: true, // 是否显示主体
            content: '<div>确定要执行这个操作?</div>', // 主体内容
            isShowFooter: true, // 是否显示尾部
            footerContent: '', // 尾部内容
            isShowClose: true, // 是否显示关闭按钮
            closeContent: '<div class="iconfont icon-guanbi"></div>', // 关闭按钮的内容
            isShowConfirm: true, // 是否显示确认按钮
            confirmContent: '确认', // 确认按钮的内容
            isShowCancel: true, // 是否显示取消按钮
            cancelContent: '取消', // 取消按钮的内容
            isCustom: false, // 是否自定义
            isShowIcon: false, // 是否显示icon
            icon: 'icon-jinggao', // icon的类型
            isShowMask: true, // 是否显示遮罩
            isHandHide: false, // 是否手动隐藏(一般只用于点击确认时)
        },
        // 遮罩
        mask: {
            config: {},
        },
    },
    // 数据
    data: {},
});

// 内部模块的创建(覆盖超类型)
Sub.prototype.moduleDomCreate = function () {
    const config = this.opts.config;
    const type = `g-dialog-${config.type}`;// 弹窗类型
    const positionLocation = `g-dialog-${config.positionLocation}`;// 弹窗的定位位置
    // 弹窗结构
    const html = `
        ${this.renderAlert()}
        ${this.renderConfirm()}
    `;
    this.moduleDom = applications.createElement({
        style: this.opts.config.moduleDomStyle,
        customAttribute: this.opts.config.moduleDomCustomAttribute,
        attribute: {
            className: `g-dialog ${type} ${positionLocation}`,
            innerHTML: html,
        },
    });
};

// 提示框
Sub.prototype.renderAlert = function () {
    const config = this.opts.config;
    if (config.type !== 'alert') {
        return '';
    }
    const alert = config.alert;
    let htmlIcon = '';
    if (alert.isShowIcon) {
        htmlIcon = `<div class="g-dialog-alert-icon iconfont ${alert.icon}"></div>`;
    }
    let closeHtml = '';
    if (alert.isShowClose) {
        closeHtml = '<div class="g-dialog-alert-close iconfont icon-guanbi" ></div>';
    }
    return `
        ${closeHtml}
        ${htmlIcon}
        <div class="g-dialog-alert-text">${alert.content}</div>
    `;
};

// 确认框
Sub.prototype.renderConfirm = function () {
    const config = this.opts.config;
    if (config.type !== 'confirm') {
        return '';
    }
    const confirm = config.confirm;
    let htmlHeader = '';
    if (confirm.isShowHeader) {
        htmlHeader = `<div class="g-dialog-confirm-header">${confirm.headerContent}</div>`;
    }
    let htmlBody = '';
    if (confirm.isShowBody) {
        let htmlIcon = '';
        if (confirm.isShowIcon) {
            htmlIcon = `<div class="g-dialog-confirm-body-system-icon iconfont ${confirm.icon}"></div>`;
        }
        let bodyClass = 'g-dialog-confirm-body-system';
        let bodyContent = `
            ${htmlIcon}
            <div class="g-dialog-confirm-body-system-text">${confirm.content}</div>
        `;
        if (confirm.isCustom) {
            bodyClass = 'g-dialog-confirm-body-custom';
            bodyContent = confirm.content;
        }
        htmlBody = `
            <div class="g-dialog-confirm-body">
                <div class="${bodyClass}">
                    ${bodyContent}
                </div>
            </div>
        `;
    }
    let htmlFooter = '';
    if (confirm.isShowFooter) {
        let htmlCancel = '';
        if (confirm.isShowCancel) {
            htmlCancel = `<div class="g-button g-button-cancel g-dialog-confirm-footer-cancel">${confirm.cancelContent}</div>`;
        }
        let htmlConfirm = '';
        if (confirm.isShowConfirm) {
            htmlConfirm = `<div class="g-button g-dialog-confirm-footer-confirm">${confirm.confirmContent}</div>`;
        }
        htmlFooter = `<div class="g-dialog-confirm-footer">${htmlCancel}${htmlConfirm}</div>`;
    }
    let htmlClose = '';
    if (confirm.isShowClose) {
        htmlClose = `<div class="g-dialog-confirm-close">${confirm.closeContent}</div>`;
    }
    return `
        ${htmlHeader}
        ${htmlBody}
        ${htmlFooter}
        ${htmlClose} 
    `;
};

// 功能(覆盖超类型)
Sub.prototype.power = function () {
    const self = this;
    const config = this.opts.config;
    // 提示框
    if (config.type === 'alert') {
        const close = this.moduleDom.querySelector('.g-dialog-alert-close');
        config.alert.timer = setTimeout(function () {
            self.moduleDomHide();
        }, config.alert.time);
        close.addEventListener('click', function () {
            clearTimeout(config.alert.timer);
            self.moduleDomHide();
        });
    }
    // 确认框
    if (config.type === 'confirm') {
        const close = this.moduleDom.querySelector('.g-dialog-confirm-close');
        if (close) {
            close.addEventListener('click', function () {
                self.moduleDomHide();
                self.opts.callback.close();
            });
        }
        const cancel = this.moduleDom.querySelector('.g-dialog-confirm-footer-cancel');
        if (cancel) {
            cancel.addEventListener('click', function () {
                self.moduleDomHide();
                self.opts.callback.cancel();
            });
        }
        const confirm = this.moduleDom.querySelector('.g-dialog-confirm-footer-confirm');
        if (confirm) {
            confirm.addEventListener('click', function () {
                if (!self.opts.config.confirm.isHandHide) {
                    self.moduleDomHide();
                }
                self.opts.callback.confirm();
            });
        }
    }
};

module.exports = Sub;
