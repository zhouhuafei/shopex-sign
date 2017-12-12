<template>
    <div class="g-view">
        <div class="page-input">
            <label class="g-input">
                <span class="g-input-text">账号:</span>
                <span class="g-input-text">S</span>
                <input autocomplete="off" list="userList" class="g-input-input" type="text" name="username" id="username" v-model="username" placeholder="格式: 6666">
                <datalist id="userList">
                    <option value="2113"></option>
                    <option value="2559"></option>
                    <option value="2896"></option>
                    <option value="2995"></option>
                </datalist>
                <span class="g-input-text iconfont icon-qingkong" @click="fnClear('username')"></span>
                <span class="g-input-text g-input-hint iconfont icon-bitian"></span>
            </label>
        </div>
        <div class="page-input">
            <label class="g-input">
                <span class="g-input-text">密码:</span>
                <span class="g-input-text iconfont icon-mima"></span>
                <input class="g-input-input" :type="isShowPassword?'text':'password'" name="password" id="password" v-model="password" placeholder="默认 : Shopex123">
                <span class="g-input-text iconfont icon-qingkong" @click="fnClear('password')"></span>
                <span class="g-input-text iconfont" :class="{'icon-zhengyan':isShowPassword,'icon-biyan':!isShowPassword}" @click="fnIsShowPassword"></span>
            </label>
        </div>
        <div class="page-button">
            <div class="g-button" :class="{'g-button-cancel':isSign}" @click="fnSignIn">
                <div class="g-button-text">签到</div>
            </div>
        </div>
        <div class="page-hint">{{hint}}</div>
    </div>
</template>

<script>
    export default {
        name: 'sign-in',
        data () {
            return {
                username: '',
                password: 'Shopex123',
                isShowPassword: true,
                hint: '',
                isSign: false,
            };
        },
        methods: {
            fnIsShowPassword () {
                this.isShowPassword = !this.isShowPassword;
            },
            fnClear (opt) {
                this[opt] = '';
            },
            fnSignIn () {
                if (!this.isSign) {
                    this.isSign = true;
                    this.hint = '签到中';
                }
            },
        },
        components: {},
        created () {},
        mounted () {},
    };
</script>

<style scoped lang="scss">
    @import "../scss/config/config";

    .page-input {
        margin-top: px2rem(20);
    }

    .page-button {
        margin-top: px2rem(40);
    }

    .page-hint {
        margin-top: px2rem(20);
        text-align: center;
    }
</style>
