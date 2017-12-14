<template>
    <div class="g-view">
        <div class="logs" v-for="item in resultData">
            <div class="logs-name">{{item.username}}</div>
            <div class="logs-msg">{{item.signMessage}}</div>
            <div class="logs-tail">{{item.smallTail}}</div>
        </div>
    </div>
</template>

<script>
    const axios = require('../api/axios');
    export default {
        name: 'logs',
        data() {
            return {
                nowPage: 1,
                nowCount: 200,
                resultData: [],
            };
        },
        components: {},
        mounted() {
            const self = this;
            axios({
                url: '/api/logs/',
                method: 'post',
                data: {
                    nowPage: this.nowPage,
                    nowCount: this.nowCount,
                },
            }).then(function (json) {
                if (json.status === 'success') {
                    self.resultData = json.result.data;
                }
            });
        },
    };
</script>

<style scoped lang="scss">
    @import "../scss/config/config";

    .logs {
        margin: px2rem(10);
        .logs-name {
            text-align: center;
        }
        .logs-msg {
        }
        .logs-tail {
        }
    }
</style>
