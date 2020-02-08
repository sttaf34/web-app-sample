/* eslint-disable no-console */

import { Router, Request, Response, NextFunction } from "express"
import User, { UserCreateResult } from "../entities/user"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  response.render("signup")
})

router.post("/", (request: Request, response: Response, next: NextFunction) => {
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
      next(error)
    })
})

export default router
