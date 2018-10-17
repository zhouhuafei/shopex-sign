// process.env.NODE_ENV
const env = process.env.NODE_ENV;

// config
const config = require('./config');
const configRedis = config.redis[env];

// redis
const redis = require('redis');
const redisClient = redis.createClient({
    host: configRedis.host,
    port: configRedis.port,
    db: configRedis.db, // 不同的项目存到不同的库(db number)里，可以防止键的冲突。例如0库的key1键不会和1库的key1键冲突。
});

// 连接成功
redisClient.on('connect', function () {
    console.log('redis connection open to:\n', `http://${configRedis.host}:${configRedis.port}`);
});

redisClient.on('error', function (error) {
    console.log('redis connection error:\n', error);
});

module.exports = redisClient;
