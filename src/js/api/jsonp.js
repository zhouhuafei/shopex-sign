const tools = require('../utils/tools');
const Dialog = require('../components-dom/g-dialog');
module.exports = function (json) {
    const opts = tools.extend({
        defaults: {
            url: '',
            data: {},
            isHandleError: true, // 是否处理错误
            isHandleFailure: true, // 是否处理失败
            callback: function () {
            },
        },
        inherits: json,
    });
    const url = opts.url;
    const data = opts.data;
    const callback = opts.callback;

    function fnError() {
        const dataInfo = {
            status: 'error',
            message: '接口出错',
            error: 'Request failed with status code 404',
        };
        callback(dataInfo);
        if (opts.isHandleError) {
            new Dialog({
                config: {
                    alert: {
                        content: `Error: ${dataInfo.error}`,
                    },
                },
            });
        }
    }

    if (url) {
        const fnName = `jsonpCallback${new Date().getTime()}`;
        window[fnName] = function (dataInfo) {
            callback(dataInfo);
            if (dataInfo.status === 'failure' && opts.isHandleFailure) {
                new Dialog({
                    config: {
                        alert: {
                            content: `失败: ${dataInfo.message}`,
                        },
                    },
                });
            }
        };
        const script = document.createElement('script');
        script.addEventListener('error', function () {
            document.body.removeChild(script);
            fnError();
        });
        script.addEventListener('load', function () {
            document.body.removeChild(script);
        });
        const parameter = tools.queryStringify(data);
        // jsonp - jsonp只支持get请求,其他一概不支持
        if (parameter) {
            script.src = `${url}?${parameter}&callback=${fnName}`;
        } else {
            script.src = `${url}?callback=${fnName}`;
        }
        document.body.appendChild(script);
    } else {
        fnError();
    }
};
