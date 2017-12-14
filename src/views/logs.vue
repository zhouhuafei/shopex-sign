<template>
    <div class="g-view">
        <div class="text">待续...</div>
    </div>
</template>

<script>
    const axios = require('../api/axios');
    export default {
        name: 'logs',
        data() {
            return {
                nowPage: 1,
                nowCount: 20,
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
                    console.log(json);
                    // self.resultData = json.resultData.data;
                }
            });
        },
    };
</script>

<style scoped lang="scss">
    @import "../scss/config/config";

    .text {
        text-align: center;
        padding-top: px2rem(10);
    }
</style>
