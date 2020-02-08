/* eslint-disable no-console */

import * as express from "express"
import User, { UserCreateResult } from "../entities/user"

const router = express.Router()

router.get("/", (request: express.Request, response: express.Response) => {
  response.render("signup")
})

router.post("/", (request: express.Request, response: express.Response) => {
  const { name, password, age } = request.body

  User.createNewUser(name, password, age)
    .then((result: UserCreateResult): void => {
      switch (result) {
        case UserCreateResult.Success:
          response.redirect("../login")
          break
        case UserCreateResult.ErrorPasswordShort:
          console.log("パスワードが短い！")
          response.redirect("/") // TODO: 現状不親切
          break
        case UserCreateResult.ErrorOther:
          console.log("何かしらエラー")
          response.redirect("/") // TODO: 現状不親切
          break
        default:
          break
      }
    })
    .catch((error: Error): void => {
      console.log("Error!", error)
      response.redirect("/") // TODO: 現状不親切
    })
})

export default router
