import Express from 'express'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import uuid from 'uuid/v4'
import { REDIS_HOST, REDIS_PORT, REDIS_TTL } from '../constants'

const redisClient = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT })

redisClient.on('error', err => {
  console.log('Redis error: ', err)
})

export default (app: Express.Application) => {
  const RedisStore = connectRedis(session)
  const option = {
    genid: () => {
      return uuid()
    },
    store: new RedisStore({
      client: redisClient,
      ttl: REDIS_TTL
    }),
    // name: '_redisDemo',
    secret: process.env.SESSION_SECRET || 'some_secret_value_here',
    resave: false
    // saveUninitialized: true
  }

  app.use(session(option))
}
