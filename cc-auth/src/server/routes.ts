import Express from 'express'
import passport from 'passport'
import createError from 'http-errors'
import { Auth } from '../types/api'

export default (app: Express.Application) => {
  app.get('/auth/check', (req, res, next) => {
    if (req.session) {
      res.status(200).json({
        message: `OK GET /. sessionID: ${
          req.sessionID
          }, isAuthenticated: ${req.isAuthenticated()} }`
      })
      return
    }
    next(createError(401))
  })

  app.post('/auth/login', function (req, res, next) {
    passport.authenticate('local', (err, auth: Auth, info) => {
      if (info) {
        let err
        if (info.message === "invalid credentials") {
          err = { message: info.message, code: 'invalidCredentials' };
        } else if (info.message === "Missing credentials") {
          err = { message: info.message, code: 'missingCredentials' };
        } else {
          err = { message: info.message };
        }
        return res.send({ error: err })
      }
      if (err) {
        return next(err)
      }
      if (!auth) {
        return res.send('POST / ERROR.')
      }
      req.login(auth, err => {
        if (err) {
          return next(err)
        }
        console.log(`authenticated(${req.sessionID})`)
        res.send({
          sessionID: req.sessionID,
          isAuthenticated: req.isAuthenticated(),
          id: req.isAuthenticated() ? auth.id : null,
          email: req.isAuthenticated() ? auth.email : null,
          privilege: req.isAuthenticated() ? auth.privilege : null
        })
      })
    })(req, res, next)
  })

  app.get('/auth/logout', function (req, res, next) {
    req.logout()
    if (req.session) {
      req.session.destroy(function () {
        console.log(`destroyed session(${req.sessionID})`)
        res.send('destroyed session')
      })
    }
  })
}
