require('../../scss/pages/dev-globals.scss');
const Super = require('../pages-super/super');

class Sub extends Super {
    power() {
        const self = this;
        const applications = self.applications;

        // base函数测试
        (function () {
            // 测试全选
            const Select = applications.select();
            new Select({
                items: '.g-checkbox-checkbox',
                callback: {
                    click: function (obj) {
                        console.log(obj);
                    },
                },
            });
        }());

        // 验证
        (function () {
            const ValidateInput = require('../components-dom/g-validate-form-hint');
            const aInput = [].slice.call(document.querySelectorAll('.page-validate-form'));
            aInput.forEach(function (v) {
                new ValidateInput({element: v});
            });
        }());
    }
}

new Sub();
