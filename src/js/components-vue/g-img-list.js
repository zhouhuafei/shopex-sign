module.exports = function (Vue) {
    Vue.component('g-img-list', {
        template: `<div class="g-img-list">
            <div style="min-height: 120px;">
                <img class="g-lazy-load" data-src="${require('../../images/home/p-waiting.jpg')}" alt="">
            </div>
            <div style="min-height: 120px;">
                <img class="g-lazy-load" data-src="${require('../../images/home/p-waiting.png')}" alt="">
            </div>
        </div>`,
        mounted() {
            this.$lazyload.render();
        },
    });
};
