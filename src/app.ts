/* eslint-disable no-console */
/* eslint-disable import/no-duplicates */

import * as express from "express"
import { Request, Response, NextFunction } from "express"
import * as helmet from "helmet"
import * as createHttpError from "http-errors"
import * as listEndpoints from "express-list-endpoints"
import * as path from "path"

import { getConnectionOptions, createConnection, BaseEntity } from "typeorm"

import * as passport from "passport"
import localStrategy from "./utilities/local-strategy"

import index from "./routes/index"
import users from "./routes/users"

const main = async (): Promise<void> => {
  const app = express()

  // request.body でデータを受け取る設定
  app.use(express.urlencoded({ extended: true }))

  app.use(helmet())
  app.set("views", path.join(__dirname, "views"))
  app.set("view engine", "pug")

  // DB接続
  const option = await getConnectionOptions()
  const connection = await createConnection(option)
  BaseEntity.useConnection(connection)

  // 認証設定
  app.use(passport.initialize())
  passport.use(localStrategy())

  // ルーティング設定
  app.use("/", index)
  app.use("/users", users)

  // エラー処理
  app.use((request: Request, response: Response, next: NextFunction): void => {
    next(createHttpError(404))
  })

  // サーバ起動
  const port = process.env.PORT || 9700
  app.listen(port, (): void => {
    console.log(`listening on port ${port}!`)
    console.log(listEndpoints(app))
  })
}

main()
