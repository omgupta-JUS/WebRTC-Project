// THIS FILE IS FOR MAKING CONNECTION WITH REDIS

import {Redis} from 'ioredis'

// actually redis as a broker needs to different connection for both pub and sub
export const redisPublish = new Redis({
    host: 'localhost',
    port: 6379,
});

export const redisSuscribe = new Redis({
    host: 'localhost',
    port: 6379,
});