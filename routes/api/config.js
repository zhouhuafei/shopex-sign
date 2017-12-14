const path = '/api/';
const preConfig = {
    sign: {},
    logs: {},
};
const config = [];
Object.keys(preConfig).forEach(function (key) {
    config.push({
        name: key,
        route: `${path}${key}/`,
    });
});
module.exports = config;
