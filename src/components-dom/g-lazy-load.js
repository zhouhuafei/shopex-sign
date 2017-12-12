const tools = require('../utils/tools'); // 工具方法集合
const applications = require('../utils/applications'); // 应用方法集合

// 延迟加载
function LazyLoad(json) {
    this.opts = tools.extend({
        defaults: {
            element: '.g-lazy-load', // 哪些元素进行懒加载
            srcAttr: 'data-src', // 默认获取哪里的属性值当做src
            moreHeight: 0, // 多加载一部分高度的图片
            interval: 80, // 函数节流时间(延迟时间)
            isInitRender: true, // 是否初始化的时候就进行render
        },
        inherits: json,
    });
    this.clientHeight = document.documentElement.clientHeight;
    this.init();
}

LazyLoad.prototype.init = function () {
    if (this.opts.isInitRender) {
        this.render();
    }
    this.power();
};
LazyLoad.prototype.render = function () {
    const self = this;
    const moreHeight = this.opts.moreHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const minTop = scrollTop - moreHeight;
    const maxTop = this.clientHeight + minTop + moreHeight;
    const src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUCB1jYAACAAAFAAGNu5vzAAAAAElFTkSuQmCC';
    const aDom = applications.getDomArray(this.opts.element);
    aDom.forEach(function (v) {
        if (v.tagName.toLowerCase() === 'img') {
            if (!v.getAttribute('src')) {
                v.src = src;
            }
            v.setAttribute('height', '100%');
            v.setAttribute('width', '100%');
        }
    });
    aDom.forEach(function (v) {
        // 排除那些被none掉的元素(被none掉的元素,通过offsetWidth和offsetHeight获取到的值是0)
        if (v.offsetWidth) {
            const elementTop = applications.offset(v).top;
            const elementBottom = elementTop + v.offsetHeight;
            // 出现在可视区才进行处理
            if (elementBottom >= minTop && elementTop <= maxTop) {
                if (v.tagName.toLowerCase() === 'img') {
                    if (v.getAttribute(self.opts.srcAttr)) {
                        v.src = v.getAttribute(self.opts.srcAttr);
                    }
                    v.removeAttribute('height');
                    v.removeAttribute('width');
                } else if (v.getAttribute(self.opts.srcAttr)) {
                    v.style.backgroundImage = `url(${v.getAttribute(self.opts.srcAttr)})`;
                }
                v.classList.remove('g-lazy-load');
                v.classList.add('g-lazy-load-active');
            }
        }
    });
};
LazyLoad.prototype.power = function () {
    const self = this;
    let timer = null;
    window.addEventListener('scroll', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            self.render();
        }, self.opts.interval);
    });
};
module.exports = LazyLoad;
