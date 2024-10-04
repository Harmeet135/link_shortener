const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (error) => {
    console.error(`Redis Error: ${error}`);
});

(async () => {
    await redisClient.connect({
        //add hosted server
    });
})();

redisClient.on('connect', () => console.log('Redis Client Connected'));

module.exports = redisClient;
