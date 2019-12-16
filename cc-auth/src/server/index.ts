import Express from 'express'
import config from './config'
import passportLocal from './passportLocal'
import session from './session'
import routes from './routes'
import error from './error'
import listen from './listen'

const app = Express()

config(app)
session(app)
passportLocal(app)
routes(app)
error(app)
listen(app)
