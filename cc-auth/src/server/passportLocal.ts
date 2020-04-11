import Express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import { Auth } from '../types/api'
import { API_HOST, API_PORT } from '../config/constants'

export default (app: Express.Application) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      axios
        .get(`http://${API_HOST}:${API_PORT}/users?email=${email}`)
        .then(res => {
          const auth = res.data[0]
          if (!auth) {
            return done(null, false, { message: 'invalid credentials' })
          }
          if (!bcrypt.compareSync(password, auth.password)) {
            return done(null, false, { message: 'invalid credentials' })
          }
          return done(null, auth)
        })
        .catch(error => done(error))
    })
  )

  passport.serializeUser((auth: Auth, done) => {
    done(null, auth.id)
  })

  passport.deserializeUser((id, done) => {
    axios
      .get(`http://${API_HOST}:${API_PORT}/users?id=${id}`)
      .then(res => {
        const auth = res.data[0]
        if (!auth) {
          return done(null, false)
        }
        return done(null, auth)
      })
      .catch(error => done(error, false))
  })
  app.use(passport.initialize())
  app.use(passport.session())
}
