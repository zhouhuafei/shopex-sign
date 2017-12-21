import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 这里定义初始值
const state = {
    count: 10,
};

const mutations = {
    add (context) {
        context.count++;
    },
    decrease (context) {
        context.count--;
    },
};

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {
    add (add) {
        add.commit('add');
    },
    decrease (decrease) {
        decrease.commit('decrease');
    },
    oddAdd ({commit, state}) {
        if (state.count % 2 === 0) {
            commit('add');
        }
    },
};

// 返回改变后的数值
const getters = {
    count (context) {
        return context.count;
    },
    getOdd (context) {
        return context.count % 2 === 0 ? '偶数' : '奇数';
    },
};

/*
* state: 单一状态树
* getters: 有时候我们需要从 store 中的 state 中派生出一些状态（可以认为是 store 的计算属性）
* mutations: 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
* Action: 类似于 mutation，不同在于：
*   ＊提交的是 mutation，而不是直接变更状态。
*   ＊可以包含任意异步操作。
* */
export default new Vuex.Store({
    state: {
        isShowCopyright: true,
        footerNav: {
            config: {
                isShow: true,
            },
            data: [
                {
                    href: '/',
                    text: '签到',
                },
                {
                    href: '/sign-out/',
                    text: '签退',
                },
                {
                    href: '/logs/',
                    text: '日志',
                },
            ],
        },
    },
    getters: {},
    mutations: {},
    actions: {},
});
