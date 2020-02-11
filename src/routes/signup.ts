/* eslint-disable no-console */

import { Router, Request, Response, NextFunction } from "express"
import * as asyncHandler from "express-async-handler"
import User, { UserCreateResult } from "../entities/user"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  response.render("signup")
})

router.post(
  "/",
  asyncHandler(async (request: Request, response: Response) => {
    // TODO: ここを型で守る必要がある
    const { name, password, age } = request.body

    const result = await User.createNewUser(name, password, age)
    switch (result) {
      case UserCreateResult.Success:
        console.log("OK!")
        response.redirect("../login")
        break
      case UserCreateResult.ErrorShortPassword:
        response.redirect("/")
        break
      case UserCreateResult.ErrorWrongAge:
        response.redirect("/")
        break
      default:
        break
    }
  })
)

export default router
