// process.env.NODE_ENV
const env = process.env.NODE_ENV;

// config
const config = require('./config');
const configRedis = config.redis[env];

// redis
const redis = require('redis');
const redisClient = redis.createClient(configRedis.port, configRedis.host);

// 连接成功
redisClient.on('connect', function () {
    console.log('redis connection open to:\n', `http://${configRedis.host}:${configRedis.port}`);
});

redisClient.on('error', function (error) {
    console.log('redis connection error:\n', error);
});

module.exports = redisClient;
