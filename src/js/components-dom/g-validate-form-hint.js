const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合

function ValidateForm(json) {
    this.opts = json || {};
    this.element = applications.getDomArray(this.opts.element)[0];
    this.hintClass = this.opts.hintClass || 'g-validate-form-hint';
    this.eventsType = this.opts.eventsType || 'blur';
    this.validateType = this.element.dataset.validate || 'undefined';
    this.validateHintTxt = this.element.dataset.hint || 'undefined';
    this.init();
}

ValidateForm.prototype.init = function () {
    this.render();
    this.validateEvents();
};
ValidateForm.prototype.render = function () {
    this.renderWrap();
    this.renderHint();
};
ValidateForm.prototype.renderWrap = function () {
    this.wrapDom = this.element.parentNode;
    if (this.wrapDom && getComputedStyle(this.wrapDom).position === 'static') {
        this.wrapDom.style.position = 'relative';
    }
};
ValidateForm.prototype.renderHint = function () {
    this.hintDom = document.createElement('span');
    this.hintDom.classList.add(this.hintClass);
};
ValidateForm.prototype.renderHintAdd = function (json) {
    // 只有没被隐藏的才进行验证
    if (this.element.offsetWidth) {
        const opts = json || {};
        this.hintDom.innerHTML = opts.txt || '本项必填';
        this.wrapDom.appendChild(this.hintDom);
    }
};
ValidateForm.prototype.renderHintRemove = function () {
    const isHaveHintDom = this.wrapDom.querySelector(`.${this.hintClass}`);
    if (isHaveHintDom) {
        this.wrapDom.removeChild(this.hintDom);
    }
};
ValidateForm.prototype.validateSave = function () {
    const self = this;
    const type = self.validateType.split(' ');
    const hintTxt = self.validateHintTxt.split(' ');
    const value = this.element.value;
    this.isValidateSuccess = true;// 是否验证成功了
    type.forEach(function (v, i) {
        if (v === 'no-space' && self.isValidateSuccess) { // 设置了非空验证
            if (tools.isEmpty(value)) {
                self.renderHintAdd({txt: hintTxt[i]});
                self.isValidateSuccess = false;
            } else {
                self.renderHintRemove();
                self.isValidateSuccess = true;
            }
        }
        if (v === 'no-zero' && self.isValidateSuccess) { // 设置了非零验证
            if (tools.isZero(value)) {
                self.renderHintAdd({txt: hintTxt[i]});
                self.isValidateSuccess = false;
            } else {
                self.renderHintRemove();
                self.isValidateSuccess = true;
            }
        }
        if (v === 'yes-positive-integer' && self.isValidateSuccess) { // 设置了正整数验证
            if (tools.isPositiveInteger(value)) {
                self.renderHintRemove();
                self.isValidateSuccess = true;
            } else {
                self.renderHintAdd({txt: hintTxt[i]});
                self.isValidateSuccess = false;
            }
        }
    });
};
ValidateForm.prototype.validateEvents = function () {
    const self = this;
    if (self.element) {
        self.element.addEventListener(self.eventsType, function () {
            self.validateSave();
        });
    }
};

module.exports = ValidateForm;
