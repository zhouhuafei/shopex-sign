const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合
const Super = require('../components-dom-super/g-super'); // 超类型(子类型继承的对象)

// 子类型
const Sub = tools.constructorInherit(Super, {
    // 回调
    callback: {
        click: function (obj) {
        },
    },
    // 配置
    config: {
        isHaveEvent: true, // 是否具备事件(默认具备)
        allStarNum: 5, // 所有的星星数
        nowStarNum: 4, // 当前被选择的星星数
    },
    // 数据
    data: {},
});

// 内部模块的创建(覆盖超类型)
Sub.prototype.moduleDomCreate = function () {
    let html = '';
    for (let i = 0; i < this.opts.config.allStarNum; i++) {
        let className = '';
        if (i < this.opts.config.nowStarNum) {
            className = 'g-star-items-active';
        }
        html += `<div data-index="${i}" class="iconfont icon-star g-star-items ${className}"></div>`;
    }
    this.moduleDom = applications.createElement({
        style: this.opts.config.moduleDomStyle,
        customAttribute: this.opts.config.moduleDomCustomAttribute,
        attribute: {
            className: 'g-star',
            innerHTML: html,
        },
    });
    this.opts.star = this.moduleDom.children;
};

// 功能(覆盖超类型)
Sub.prototype.power = function () {
    const self = this;
    if (this.opts.config.isHaveEvent) {
        this.moduleDom.addEventListener('click', function (ev) {
            const target = ev.target;
            if (target.classList.contains('g-star-items')) {
                const index = target.dataset.index;
                for (let j = 0; j < self.opts.config.allStarNum; j++) {
                    if (j <= index) {
                        self.opts.star[j].classList.add('g-star-items-active');
                    } else {
                        self.opts.star[j].classList.remove('g-star-items-active');
                    }
                }
                self.opts.callback.click({element: this, index: index});
            }
        });
    }
};

module.exports = Sub;
