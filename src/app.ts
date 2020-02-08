/* eslint-disable no-console */
/* eslint-disable import/no-duplicates */

import * as express from "express"
import { Request, Response, NextFunction } from "express"
import * as session from "express-session"
import * as helmet from "helmet"
import * as createHttpError from "http-errors"
import * as listEndpoints from "express-list-endpoints"
import * as path from "path"

import { getConnectionOptions, createConnection, BaseEntity } from "typeorm"

import * as passport from "passport"
import localStrategy from "./utilities/local-strategy"
import githubStrategy from "./utilities/github-strategy"

import index from "./routes/index"
import signup from "./routes/signup"
import users from "./routes/users"
import auth from "./routes/auth"

import connectFlash = require("connect-flash")

export const createApp = async (): Promise<express.Express> => {
  const app = express()

  // request.body でデータを受け取る設定
  app.use(express.urlencoded({ extended: true }))

  app.use(connectFlash())
  app.use(helmet())

  // View設定
  app.set("views", path.join(__dirname, "views"))
  app.set("view engine", "pug")

  // DB接続
  const option = await getConnectionOptions()
  const connection = await createConnection(option)
  BaseEntity.useConnection(connection)

  // セッション設定
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || ""
    })
  )

  // 認証設定
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(localStrategy())
  passport.use(githubStrategy())

  passport.serializeUser(
    (user: string, done: (error: Error | null, id: string) => void): void => {
      // セッションにユーザ情報を保存したときに呼ばれる
      console.log("passport.serializeUser")
      done(null, user)
    }
  )
  passport.deserializeUser(
    (user: string, done: (error: Error | null, id: string) => void): void => {
      // セッションからユーザ情報を取り出すとき都度呼ばれる
      console.log("passport.deserializeUser")
      done(null, user)
    }
  )

  // ルーティング設定
  app.use("/", index)
  app.use("/signup", signup)
  app.use("/users", users)
  app.use("/auth", auth)
  console.log(listEndpoints(app))

  // エラー処理
  app.use((request: Request, response: Response, next: NextFunction): void => {
    next(createHttpError(404))
  })

  return app
}

export default createApp
