const tools = require('./tools');
const qr = require('qr-image');

// 应用方法集合
function Applications() {
}

// 生成二维码
Applications.prototype.qrCode = function (text) {
    return qr.imageSync(text, {type: 'svg'});
};

// 设置cookie
Applications.prototype.setCookie = function (name, value, expires, domain, path, secure) {
    const myDate = new Date();
    const myTime = myDate.getTime();
    myDate.setTime(myTime + expires * 24 * 60 * 60 * 1000); // 单位是天 1天 1/24天(1小时)
    let cookie = `${name}=${value}`;
    if (expires) {
        cookie += `; expires=${myDate}`;
    }
    if (domain) {
        cookie += `; domain=${domain}`;
    }
    if (path) {
        cookie += `; path=${path}`;
    }
    if (secure) {
        cookie += `; secure=${secure}`;
    }
    document.cookie = cookie;
};
// 获取cookie
Applications.prototype.getCookie = function (name) {
    const cookie = document.cookie;
    const arr = cookie.split('; ');
    let value = '';
    arr.forEach(function (v) {
        const arr2 = v.split('=');
        if (arr2[0] === name) {
            value = arr2[1];
        }
    });
    return value;
};
// 清除cookie
Applications.prototype.removeCookie = function (name, domain, path, secure) {
    this.setCookie(name, '', -1, domain, path, secure);
};
// 创建元素节点
Applications.prototype.createElement = function (json) {
    const opts = json || {};
    opts.elementName = opts.elementName || 'div';// 标签名称
    opts.style = opts.style || {};// style样式
    opts.customAttribute = opts.customAttribute || {};// 自定义属性
    opts.attribute = opts.attribute || {};// 普通属性,checked,selected,innerHTML
    const elementNode = document.createElement(opts.elementName);// 元素节点
    Object.keys(opts.style).forEach(function (attr0) {
        elementNode.style[attr0] = opts.style[attr0];
    });
    Object.keys(opts.customAttribute).forEach(function (attr1) {
        elementNode.setAttribute(`data-${attr1}`, opts.customAttribute[attr1]);
    });
    Object.keys(opts.attribute).forEach(function (attr2) {
        elementNode[attr2] = opts.attribute[attr2];
    });
    return elementNode;
};
// 加减操作
Applications.prototype.addMinusInput = function (json) { // 购物加减商品系列
    if (!json) {
        console.log('no find parameter');
        return;
    }
    const noActiveClass = json.noActiveClass || 'on';// 不能点的时候的class
    const minNum = json.minNum === undefined ? 1 : json.minNum;// 最小数量
    const add = json.add;// 加的按钮
    const addCallback = json.addCallback;// 加的回调
    const minus = json.minus;// 减少的按钮
    const minusCallback = json.minusCallback;// 减少的回调
    const overMinCallback = json.overMinCallback || function () {
    };// 减少到最小值之后继续减少
    const input = json.input;// 输入框的按钮
    const blurCallback = json.blurCallback;// 失去焦点的回调
    const inventoryNum = parseInt(json.inventoryNum);// 商品库存
    const space = function () {
        if (input.value.trim() === '') {
            input.value = minNum;
        }
    };
    // 增加
    add.onclick = function () {
        space();
        let num = parseInt(input.value);
        num++;
        input.value = num;
        if (num >= inventoryNum) {
            if (inventoryNum === 0) {
                input.value = minNum;
            } else {
                input.value = inventoryNum;
            }
            add.classList.add(noActiveClass);
        }
        minus.classList.remove(noActiveClass);
        if (addCallback) {
            addCallback();
        }
    };
    // 减少
    minus.onclick = function () {
        space();
        let num = parseInt(input.value);
        num--;
        input.value = num;
        if (num < minNum) {
            input.value = minNum;
            minus.classList.add(noActiveClass);
            overMinCallback();
        }
        add.classList.remove(noActiveClass);
        if (minusCallback) {
            minusCallback();
        }
    };
    // 获取焦点
    input.onfocus = function () {
        input.select();
    };
    // 失去焦点
    input.onblur = function () {
        space();
        let num = parseInt(input.value);
        if (isNaN(num)) {
            num = minNum;
        }
        minus.classList.remove(noActiveClass);
        add.classList.remove(noActiveClass);
        if (num >= inventoryNum) {
            input.value = inventoryNum;
            add.classList.add(noActiveClass);
        }
        if (num <= minNum) {
            input.value = minNum;
            minus.classList.add(noActiveClass);
        }
        if (blurCallback) {
            blurCallback();
        }
    };
};
// 获取原生的dom节点并转换成数组,传入的参数支持:1.原生的dom节点,2.原生的dom集合,3.css选择器
Applications.prototype.getDomArray = function (element) {
    let dom = [];
    if (element) {
        // 如果是字符串
        if (Object.prototype.toString.call(element).slice(8, -1).toLowerCase() === 'string') {
            dom = [].slice.call(document.querySelectorAll(element));
        }
        // 如果是dom节点(一个元素)    原生的
        if (element.nodeType === 1) {
            dom = [element];
        }
        /*
         * 如果是dom集合(一组元素)    HtmlCollection(通过getElementsBy系列获取到的)
         * 如果是dom集合(一组元素)    NodeList(通过querySelectorAll获取到的)
         * */
        if (Object.prototype.toString.call(element).slice(8, -1).toLowerCase() === 'htmlcollection' || Object.prototype.toString.call(element).slice(8, -1).toLowerCase() === 'nodelist') {
            dom = [].slice.call(element);
        }
    }
    return dom;
};
// 获取指定父级
Applications.prototype.getParent = function (element, parentSelector) {
    const self = this;
    element = self.getDomArray(element)[0];
    // 第一参数不符合规范
    if (!element) {
        console.log('第一个参数有误');
        return null;
    }
    // 没有第二参数默认选取直接父级
    if (!parentSelector) {
        return element.parentNode;
    }
    if (typeof parentSelector === 'string') {
        element = element.parentNode;
        switch (parentSelector.charAt(0)) {
            case '.':// 通过class获取父级
                while (element) {
                    if (!element.classList) { // element === document
                        console.log('no find class');
                        return null;
                    }
                    if (element.classList.contains(parentSelector.substring(1))) {
                        return element;
                    }
                    element = element.parentNode;
                }
                break;
            case '#':// 通过id获取父级
                while (element) {
                    if (element === document) {
                        console.log('no find id');
                        return null;
                    }
                    if (element.id === parentSelector.substring(1)) {
                        return element;
                    }
                    element = element.parentNode;
                }
                break;
            default:// 通过标签名获取父级
                while (element) {
                    if (element === document) {
                        console.log('no find tagName');
                        return null;
                    }
                    if (element.tagName.toLowerCase() === parentSelector) {
                        return element;
                    }
                    element = element.parentNode;
                }
                break;
        }
    }
    return null;
};
// html转成DOM节点
Applications.prototype.htmlToDom = function (html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
};
// 图片上传
Applications.prototype.imgUploadBase64 = function () {
    function Fn(json) {
        this.opts = json || {};
        // 如果没有选择文件的input,则不继续往下执行
        if (!this.opts.input) {
            console.log('no find input');
            return;
        }
        // 一次上传限制几张图片
        this.opts.limitNum = this.opts.limitNum || '5';
        // 选择图片的回调
        this.opts.changeCallback = this.opts.changeCallback || function () {
            console.log('no find changeCallback');
        };
        // 把图片读取成base64编码的回调
        this.opts.base64Callback = this.opts.base64Callback || function () {
            console.log('no find base64Callback');
        };
        // 初始化
        this.init();
    }

    Fn.prototype.init = function () {
        // 渲染结构
        this.render();
        // 渲染功能
        this.power();
    };
    Fn.prototype.render = function () {

    };
    Fn.prototype.power = function () {
        // 事件相关
        this.events();
    };
    Fn.prototype.events = function () {
        this.eventsInputChange();
    };
    Fn.prototype.eventsInputChange = function () {
        const self = this;
        const limitNum = this.opts.limitNum;
        this.opts.input.addEventListener('change', function () {
            let imagesNum = 0;
            // 图片的相关信息
            self.imgData = [];
            const files = this.files;
            const len = files.length;
            for (let i = 0; i < len; i++) {
                const f = files[i];
                const isImages = /image/ig.test(f.type);
                // 是图片
                if (isImages) {
                    if (imagesNum < limitNum) { // 小于限制几张图片的数量
                        self.imgData.push(f);
                        imagesNum++;
                    } else { // 大于限制几张图片的数量

                    }
                }
            }
            self.opts.changeCallback({imgData: self.imgData});
            // 把图片读成base64编码
            self.fileReadAsDataURL();
        });
    };
    Fn.prototype.fileReadAsDataURL = function () {
        const self = this;
        this.imgData.forEach(function (v, i) {
            const fileRender = new FileReader();
            fileRender.readAsDataURL(v);
            fileRender.addEventListener('load', function () {
                self.opts.base64Callback({base64: this.result, index: i});
            });
        });
    };
    return Fn;
};
// 是不是PC
Applications.prototype.isPc = function () {
    const userAgentInfo = navigator.userAgent;
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
// 是不是微信
Applications.prototype.isWeiXin = function () {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/ig);
};
// 是不是android
Applications.prototype.isAndroid = function () {
    return window.navigator.appVersion.match(/android/ig);
};
// 是不是iphone
Applications.prototype.isIphone = function () {
    return window.navigator.appVersion.match(/iphone/ig);
};
// 获取元素距离文档的left和top
Applications.prototype.offset = function (element) {
    const self = this;
    let top = 0;
    let left = 0;
    element = self.getDomArray(element)[0];
    while (element) {
        top += element.offsetTop;
        left += element.offsetLeft;
        element = element.offsetParent;
    }
    return {
        top: top,
        left: left,
    };
};
// 滚动到指定位置
Applications.prototype.scrollToY = function (to = '0') {
    const scale = 6;
    let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    let speed = 0;
    let timer = null;
    const fn = function () {
        speed = Math.ceil((scrollT - to) / scale);
        scrollT -= speed;
        window.scrollTo(0, scrollT);
        timer = requestAnimationFrame(fn);
        if (scrollT <= to * 1) {
            cancelAnimationFrame(timer);
        }
    };
    requestAnimationFrame(fn);
};
// 全选,不选,反选
Applications.prototype.select = function () {
    const self = this;

    function Select(json) {
        this.opts = tools.extend({
            defaults: {
                items: null, // 所有的被选项
                callback: {
                    click: function () {
                    },
                },
            },
            inherits: json,
        });
        this.itemsDom = self.getDomArray(this.opts.items);// 获取原生的dom节点并转换成数组
        this.init();
    }

    // 初始化
    Select.prototype.init = function () {
        this.power();
    };

    // 不选
    Select.prototype.selectNothing = function () {
        this.itemsDom.forEach(function (v) {
            v.checked = false;
        });
    };

    // 全选
    Select.prototype.selectAll = function () {
        this.itemsDom.forEach(function (v) {
            v.checked = true;
        });
    };

    // 反选
    Select.prototype.selectReverse = function () {
        this.itemsDom.forEach(function (v) {
            v.checked = !v.checked;
        });
    };

    // 当某一项被选中时,是否全部选项都被选中了
    Select.prototype.power = function () {
        const self = this;
        this.itemsDom.forEach(function (v1) {
            v1.addEventListener('click', function () {
                let isCheckedAll = true;// 是否全部的选项都被选中了(假设全部选中)
                self.itemsDom.forEach(function (v2) {
                    if (v2.checked === false) {
                        isCheckedAll = false;
                    }
                });
                self.opts.callback.click({element: this, isCheckedAll: isCheckedAll});
            });
        });
    };

    return Select;
};
// 当滚动到了浏览器的底部
Applications.prototype.whenScrollBottom = function () {
    function WhenScrollBottom(json) {
        this.opts = tools.extend({
            defaults: {
                callback: {
                    success: function () {
                    },
                    failure: function () {
                    },
                },
                isBindScrollEvent: true, // 是否绑定滚动事件
                isInitRender: true, // 是否初始化的时候就进行渲染
                interval: 80, // 函数节流时间(延迟时间)
                errorHeight: 0, // 滚动到底部上面一定高度就算是滚动到底部了(误差高度)
            },
            inherits: json,
        });
        this.timer = null; // 定时器
        this.isLoadOver = false; // 数据是否加载完毕
        this.init();
    }

    WhenScrollBottom.prototype.init = function () {
        if (this.opts.isInitRender) {
            this.render();
        }
        this.power();
    };

    WhenScrollBottom.prototype.render = function () {
        const callback = this.opts.callback;
        const allH = document.body.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= allH - this.opts.errorHeight && !this.isLoadOver) {
            callback.success(this);
        } else {
            callback.failure();
        }
    };

    // 数据加载完毕
    WhenScrollBottom.prototype.dataLoadOver = function () {
        this.isLoadOver = true;
        // 数据加载完毕,手动调用这个方法,或者手动把isLoadOver属性变成true,建议掉方法
    };

    WhenScrollBottom.prototype.scroll = function () {
        const self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self.render();
        }, self.opts.interval);
    };

    WhenScrollBottom.prototype.power = function () {
        const self = this;
        if (self.opts.isBindScrollEvent) {
            window.addEventListener('scroll', function () {
                self.scroll();
            });
        }
    };
    return WhenScrollBottom;
};
// 是否禁止浏览器滚动
Applications.prototype.whetherDisableScroll = function () {
    return {
        // 阻止冒泡
        stopPropagation: function (ev) {
            ev.stopPropagation();
        },
        // 阻止默认事件
        preventDefault: function (ev) {
            ev.preventDefault();
        },
        // 阻止冒泡,阻止默认事件
        returnFalse: function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        },
        // 禁止滚动
        noScroll: function () {
            document.addEventListener('touchmove', this.preventDefault, false);
            document.documentElement.style.overflow = 'hidden';
        },
        // 解除禁止浏览器滚动
        yesScroll: function () {
            document.removeEventListener('touchmove', this.preventDefault, false);
            document.documentElement.style.overflow = 'auto';
        },
    };
};

module.exports = new Applications();
