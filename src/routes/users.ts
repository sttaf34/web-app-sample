import { Router, Request, Response } from "express"
import * as asyncHandler from "express-async-handler"
import User from "../entities/user"

const router = Router()

router.get(
  "/",
  asyncHandler(async (request: Request, response: Response) => {
    const users = await User.find()
    response.send(users)
  })
)

export default router
