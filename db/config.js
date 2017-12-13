module.exports = {
    mongodb: {
        development: {
            host: 'localhost',
            port: '27017',
            db: 'shopex-sign',
        },
        production: {
            host: 'localhost',
            port: '27017',
            db: 'shopex-sign',
        },
    },
    redis: {
        development: {
            host: 'localhost',
            port: '6379',
            db: 12,
        },
        production: {
            host: 'localhost',
            port: '6379',
            db: 12,
        },
    },
};
