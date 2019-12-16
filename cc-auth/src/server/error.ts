import Express from 'express'
import createError, { HttpError } from 'http-errors'

export default (app: Express.Application) => {
  app.use((req, res, next) => {
    next(createError(404))
  })
  app.use(
    (
      err: HttpError,
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      console.log(err.statusCode)

      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}
      res.status(err.status || 500)
      res.send('error')
    }
  )
}
