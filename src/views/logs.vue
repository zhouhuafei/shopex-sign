<template>
    <div class="g-view">
        <div class="logs" v-for="item in resultData">
            <div class="logs-name">{{item.username}}</div>
            <div class="logs-msg">{{item.signMessage}}</div>
            <div class="logs-tail">---- {{item.smallTail}}</div>
        </div>
        <div class="logs-no-data"></div>
        <div class="logs-loading"></div>
    </div>
</template>

<script>
    const axios = require('../api/axios');
    const Loading = require('../components-dom/g-loading');
    const NoData = require('../components-dom/g-no-data');
    const applications = require('../utils/applications');

    export default {
        name: 'logs',
        data() {
            return {
                nowPage: 1,
                nowCount: 20,
                resultData: [],
                whenScrollBottom: null,
                fnScroll: null,
            };
        },
        components: {},
        mounted() {
            const self = this;
            const loading = new Loading({wrap: '.logs-loading'});
            const getData = function (whenScrollBottom) {
                axios({
                    url: '/api/logs/',
                    method: 'post',
                    data: {
                        nowPage: self.nowPage,
                        nowCount: self.nowCount,
                    },
                }).then(function (json) {
                    if (json.status === 'success') {
                        const result = json.result;
                        const resultData = result.data;
                        if (!resultData.length) {
                            loading.moduleDomHide();
                            new NoData({wrap: '.logs-no-data'});
                        } else {
                            self.resultData = [...self.resultData, ...resultData];
                            self.nowPage++;
                            if (self.nowPage > result.allPage) {
                                loading.moduleDomHide();
                                new Loading({wrap: '.logs-loading', config: {status: 'over'}});
                            } else {
                                whenScrollBottom.dataLoadContinue();
                            }
                        }
                    }
                });
            };
            const WhenScrollBottom = applications.whenScrollBottom();
            self.whenScrollBottom = new WhenScrollBottom({
                isBindScrollEvent: false,
                callback: {success: getData},
            });
            self.fnScroll = function () {
                self.whenScrollBottom.scroll();
            };
            window.addEventListener('scroll', self.fnScroll);
        },
        destroyed() {
            const self = this;
            window.removeEventListener('scroll', self.fnScroll);
        },
    };
</script>

<style scoped lang="scss">
    @import "../scss/config/config";

    .g-view {
        overflow: hidden;
        .logs {
            margin-top: px2rem(10);
            padding: px2rem(10);
            background: #ffffff;
            &:first-of-type {
                margin-top: 0;
            }
            .logs-name {
                color: $g-danger-color;
            }
            .logs-msg {
                color: $g-highlight-color;
            }
            .logs-tail {
                color: $g-warning-color;
            }
        }
    }
</style>
