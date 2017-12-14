const config = require('./config');

module.exports = function (app) {
    config.forEach(function (v) {
        app.post(v.route, function (req, res) {
            const Api = require(`../../controllers/api/${v.name}`);
            new Api({
                app: app,
                res: res,
                req: req,
            });
        });
    });
};
