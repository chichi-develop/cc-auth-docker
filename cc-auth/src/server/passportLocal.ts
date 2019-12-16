import Express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import { User } from '../types/api'
import { API_HOST, API_PORT } from '../constants'

export default (app: Express.Application) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      axios
        .get(`http://${API_HOST}:${API_PORT}/users?email=${email}`)
        .then(res => {
          const user = res.data[0]
          if (!user) {
            return done(null, false, { message: 'Invalid credentials.\n' })
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Invalid credentials.\n' })
          }
          return done(null, user)
        })
        .catch(error => done(error))
    })
  )

  passport.serializeUser((user: User, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    axios
      .get(`http://${API_HOST}:${API_PORT}/users?id=${id}`)
      .then(res => {
        const user = res.data[0]
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      })
      .catch(error => done(error, false))
  })
  app.use(passport.initialize())
  app.use(passport.session())
}
