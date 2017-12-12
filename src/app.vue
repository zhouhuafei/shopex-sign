<template>
    <div style="width: inherit;">
        <div class="g-header">
            <div class="g-qr-code">
                <div class="g-qr-code-text">有码可依 有码必依</div>
                <div class="g-qr-code-svg"></div>
                <div class="g-qr-code-text">执码必严 违码必究</div>
            </div>
        </div>
        <div class="g-body">
            <router-view></router-view>
        </div>
        <div class="g-footer">
            <!-- 底部导航 -->
            <div
                v-if="$store.state.footerNav"
                class="g-footer-nav">
                <div class="g-footer-nav-body">
                    <template v-for="value in $store.state.footerNav.data">
                        <router-link
                            :to="value.href"
                            :class="{'g-footer-nav-item-active': value.href === $route.path}"
                            class="g-footer-nav-item">
                            <div
                                v-text="value.text"
                                class="g-footer-nav-item-text"></div>
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                config: {
                    isShowCopyright: true,
                    isShowFooterNav: true,
                },
                data: {},
            };
        },
        mounted () {
            const wrap = document.querySelector('.g-wrap');
            [].slice.call(wrap.querySelectorAll('script')).forEach(function (v) {
                wrap.removeChild(v);
            });
        },
    };
</script>

<style scoped lang="scss"></style>
