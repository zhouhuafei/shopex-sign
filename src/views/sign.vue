<template>
    <div class="g-view">
        <div class="page-input">
            <label class="g-input">
                <input class="g-input-input validate" data-validate="no-empty" data-hint="本项必填" type="tel" name="username" id="username" v-model="username" placeholder="请输入账号,只输入数字亦可">
                <span class="g-input-icon iconfont icon-clear" @click="fnClear('username')"></span>
                <span class="g-input-icon g-input-hint iconfont icon-required"></span>
            </label>
        </div>
        <div class="page-input">
            <label class="g-input">
                <input class="g-input-input validate" data-validate="no-empty" data-hint="本项必填" :type="isShowPassword?'text':'password'" name="password" id="password" v-model="password" placeholder="请输入密码,考虑安全未默认">
                <span class="g-input-icon iconfont icon-clear" @click="fnClear('password')"></span>
                <span class="g-input-icon iconfont" :class="{'icon-eye-on':isShowPassword,'icon-eye':!isShowPassword}" @click="fnIsShowPassword"></span>
            </label>
        </div>
        <div class="page-button" v-if="this.$route.name === 'sign-in'">
            <div class="g-button" :class="{'g-button-cancel':isSign}" @click="fnSign('sign-in')">
                <div class="g-button-text">签到</div>
            </div>
        </div>
        <div class="page-button" v-else>
            <div class="g-button button-sign-out" :class="{'g-button-cancel':isSign}" @click="fnSign('sign-out')">
                <div class="g-button-text">签退</div>
            </div>
        </div>
        <div v-if="isShowNotice" class="page-notice">
            <div class="page-notice-title">公告</div>
            <a class="page-notice-danger" href="http://sign.suibianxiexie.top">
                <div>新网址 - 请保存</div>
                <div>http://sign.suibianxiexie.top</div>
            </a>
            <div>旧网址 - 会失效</div>
            <div>http://47.100.125.178:5552</div>
            <div>{{time}} 失效</div>
        </div>
        <div class="page-sign-loading g-font-color-highlight"></div>
    </div>
</template>

<script>
    const Dialog = require('../components-dom/g-dialog');
    const axios = require('../api/axios');
    const ValidateFormHint = require('../components-dom/g-validate-form-hint');
    const Loading = require('../components-dom/g-loading');
    const validateFormHint = [];
    let loading = null;
    export default {
        name: 'sign',
        data() {
            return {
                username: '',
                password: '',
                isShowPassword: false,
                isSign: false,
                time: '2018/03/06',
                isShowNotice: true,
            };
        },
        methods: {
            fnIsShowPassword() {
                this.isShowPassword = !this.isShowPassword;
            },
            fnClear(str) {
                this[str] = '';
            },
            fnSign(str) {
                const self = this;
                validateFormHint.forEach(function (v) {
                    v.validateSave();
                });
                let isPass = true;
                validateFormHint.forEach(function (v) {
                    if (!v.isValidateSuccess) {
                        isPass = false;
                    }
                });
                if (isPass && !this.isSign) {
                    self.isSign = true;
                    loading.moduleDomShow();
                    axios({
                        url: '/api/sign/',
                        type: 'post',
                        data: {
                            power: str,
                            username: self.username,
                            password: self.password || 'Shopex123',
                        },
                    }).then(function (json) {
                        if (json.status === 'success') {
                            new Dialog({
                                config: {
                                    alert: {
                                        content: json.message,
                                    },
                                },
                            });
                        }
                        self.isSign = false;
                        loading.moduleDomHide();
                    });
                }
            },
        },
        mounted() {
            document.querySelectorAll('.validate').forEach(function (v) {
                const validate = new ValidateFormHint({
                    element: v,
                });
                validateFormHint.push(validate);
            });
            if (new Date() >= new Date(this.time) && window.location.host !== 'sign.suibianxiexie.top') {
                this.isShowNotice = false;
            }
            loading = new Loading({
                wrap: '.page-sign-loading',
                config: {
                    moduleDomIsRender: false,
                },
            });
        },
    };
</script>

<style scoped lang="scss">
    @import "../scss/config/config";

    .page-notice {
        text-align: center;
        margin-top: px2px(10);
        color: $g-warning-color;
        font-weight: bold;
        .page-notice-title {
            color: $g-danger-color;
        }
        .page-notice-danger {
            color: $g-danger-color;
        }
    }

    .g-view {
        padding-top: px2rem(20);
    }

    .page-input {
        margin-top: px2rem(20);
    }

    .page-button {
        margin-top: px2rem(20);
    }

    .page-sign-loading {
        margin-top: px2rem(20);
    }

    .button-sign-out {
        background: #fc4a1a; /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #f7b733, #fc4a1a); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #f7b733, #fc4a1a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>
