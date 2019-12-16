import path from 'path'
import Express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

export default (app: Express.Application) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())
}
