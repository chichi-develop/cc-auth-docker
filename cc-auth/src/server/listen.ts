import Express from 'express'
import { APP_HOST, APP_PORT } from '../constants'

export default (app: Express.Application) => {
  if (process.env.NODE_ENV === 'development') {
    app.listen(APP_PORT, APP_HOST, () => {
      console.log(`Running on http://${APP_HOST}:${APP_PORT}`)
    })
  } else {
    app.listen(APP_PORT, () => {
      console.log(`Running on Port: ${APP_PORT}`)
    })
  }
}
