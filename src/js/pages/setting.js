require('../../scss/pages/setting.scss');
const Super = require('../pages-super/super');

class Sub extends Super {
    power() {
        const self = this;
        const dataInfo = self.dataInfo;
        const axios = self.axios;
        const Dialog = require('../components-dom/g-dialog');

        // 退出账号
        document.querySelector('.page-logout').addEventListener('click', function () {
            new Dialog({
                callback: {
                    confirm: function () {
                        axios({
                            url: dataInfo.api.logout.route,
                            method: 'get',
                        }).then(function (json) {
                            if (json.status === 'success') {
                                window.location.href = dataInfo.routes.login.route;
                            }
                        });
                    },
                },
                config: {
                    type: 'confirm',
                },
            });
        });
    }
}

new Sub();
