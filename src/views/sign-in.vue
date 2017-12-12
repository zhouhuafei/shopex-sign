<template>
    <div class="g-view">
        <div class="page-input">
            <label class="g-input">
                <span class="g-input-text">账号:</span>
                <span class="g-input-text">S</span>
                <input class="g-input-input" type="text" name="username" id="username" value="" placeholder="格式: 6666">
                <span class="g-input-text iconfont icon-qingkong"></span>
                <span class="g-input-text g-input-hint iconfont icon-bitian"></span>
            </label>
        </div>
        <div class="page-input">
            <label class="g-input">
                <span class="g-input-text">密码:</span>
                <span class="g-input-text iconfont icon-mima"></span>
                <input class="g-input-input" type="password" name="password" id="password" value="" placeholder="默认 : Shopex123">
                <span class="g-input-text iconfont icon-qingkong"></span>
                <span class="g-input-text iconfont icon-zhengyan"></span>
            </label>
        </div>
        <div class="page-button">
            <div class="g-button">
                <div class="g-button-text">签到</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sign-in',
        data () {
            return {};
        },
        methods: {},
        components: {},
        created () {},
        mounted () {},
    };
</script>

<style scoped lang="scss">
    @import "../scss/config/config";

    .page-input {
        margin-top: px2rem(10);
    }

    .page-button {
        margin-top: px2rem(20);
    }
</style>
