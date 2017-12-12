module.exports = function (app) {
    // 首页
    app.get('/', function (req, res) {
        const dataInfo = {
            title: '首页',
        };
        res.render('pages/home', {
            dataInfo: dataInfo,
            dataInfoStr: JSON.stringify(dataInfo),
        });
    });
};
