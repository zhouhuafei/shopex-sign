<template>
    <div class="g-view">
        <div class="page-input">
            <label class="g-input">
                <span class="g-input-text">账号:</span>
                <span class="g-input-icon">S</span>
                <input autocomplete="off" list="userList" class="g-input-input validate" data-validate="no-empty" data-hint="本项必填" type="text" name="username" id="username" v-model="username" placeholder="格式: 6666">
                <datalist id="userList">
                    <option value="2113"></option>
                    <option value="2559"></option>
                    <option value="2896"></option>
                    <option value="2995"></option>
                </datalist>
                <span class="g-input-icon iconfont icon-qingkong" @click="fnClear('username')"></span>
                <span class="g-input-icon g-input-hint iconfont icon-bitian"></span>
            </label>
        </div>
        <div class="page-input">
            <label class="g-input">
                <span class="g-input-text">密码:</span>
                <span class="g-input-icon iconfont icon-mima"></span>
                <input class="g-input-input" :type="isShowPassword?'text':'password'" name="password" id="password" v-model="password" placeholder="默认 : Shopex123">
                <span class="g-input-icon iconfont icon-qingkong" @click="fnClear('password')"></span>
                <span class="g-input-icon iconfont" :class="{'icon-zhengyan':isShowPassword,'icon-biyan':!isShowPassword}" @click="fnIsShowPassword"></span>
            </label>
        </div>
        <div class="page-button" v-if="this.$route.name === 'signIn'">
            <div class="g-button" :class="{'g-button-cancel':isSign}" @click="fnSign('signIn')">
                <div class="g-button-text">签到</div>
            </div>
        </div>
        <div class="page-button" v-else>
            <div class="g-button" :class="{'g-button-cancel':isSign}" @click="fnSign('signOut')">
                <div class="g-button-text">签退</div>
            </div>
        </div>
    </div>
</template>

<script>
    const Dialog = require('../components-dom/g-dialog');
    const axios = require('../api/axios');
    const ValidateFormHint = require('../components-dom/g-validate-form-hint');
    let validateFormHint = null;
    export default {
        name: 'sign-in',
        data () {
            return {
                username: '',
                password: 'Shopex123',
                isShowPassword: true,
                isSign: false,
            };
        },
        methods: {
            fnIsShowPassword () {
                this.isShowPassword = !this.isShowPassword;
            },
            fnClear (str) {
                this[str] = '';
            },
            fnSign (str) {
                const self = this;
                validateFormHint.validateSave();
                if (validateFormHint.isValidateSuccess && !this.isSign) {
                    this.isSign = true;
                    axios({
                        url: '/api/',
                        type: 'post',
                        data: {
                            method: str,
                            username: self.username,
                            password: self.password || 'Shopex123',
                        },
                    }).then(function (json) {
                        console.log('json', json);
                        if (json.status === 'success') {
                            new Dialog({
                                config: {
                                    alert: {
                                        content: `成功: ${json.message}`,
                                    },
                                },
                            });
                        }
                        self.isSign = false;
                    });
                }
            },
        },
        mounted () {
            validateFormHint = new ValidateFormHint({
                element: '.validate',
            });
        },
    };
</script>

<style scoped lang="scss">
    @import "../scss/config/config";

    .g-view {
        padding-top: px2rem(20);
    }

    .page-input {
        margin-top: px2rem(20);
    }

    .page-button {
        margin-top: px2rem(20);
    }

    .page-hint {
        margin-top: px2rem(20);
        text-align: center;
    }
</style>
