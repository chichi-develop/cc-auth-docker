import Express from 'express'
import passport from 'passport'
import createError from 'http-errors'
import { User } from '../types/api'
// import { Health } from '../types/api'

export default (app: Express.Application) => {
  // ______________________________________________________
  //
  // session.count 初期化 middleWare
  //
  // app.use((req, res, next) => {
  //   if (req.session !== undefined) {
  //     if (req.session.count === undefined || req.session.count === null) {
  //       req.session.count = 0
  //     }
  //   }
  //   next()
  // })
  // ______________________________________________________
  //
  // 画面表示用 ルート・ハンドラー
  //
  app.get('/', (req, res, next) => {
    if (req.session) {
      // if (req.session.count === undefined) return
      // const data: { count: number } = { count: req.session.count }
      // res.render('index.ejs', data)
      res.status(200).json({
        message: `OK GET /. sessionID: ${
          req.sessionID
        }, isAuthenticated: ${req.isAuthenticated()} }`
      })
      return
    }
    next(createError(401))
  })

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (info) {
        return res.send(info.message)
      }
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.send('POST / ERROR.')
      }
      req.login(user as User, err => {
        if (err) {
          return next(err)
        }
        res.send({
          sessionID: req.sessionID,
          // username: req.user.id,
          // error: null,
          isAuthenticated: req.isAuthenticated()
          // email: req.isAuthenticated() ? req.user.email : null
        })
      })
    })(req, res, next)
  })

  app.get('/logout', function(req, res, next) {
    req.logout()
    if (req.session) {
      req.session.destroy(function() {
        res.send('destroyed session')
      })
    }
  })
  // ______________________________________________________
  //
  // 「ping」ボタン押下時の リクエストハンドラー
  //
  // app.get('/ping', (req, res, next) => {
  //   if (req.session) {
  //     if (req.session.count !== undefined) {
  //       req.session.count++
  //       const data: Health = { message: 'pong', count: req.session.count }
  //       res.send(data)
  //       return
  //     }
  //   }
  //   next(createError(401))
  // })
}
