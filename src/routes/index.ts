import { Router, Request, Response } from "express"
import { authenticate } from "passport"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  response.render("index")
})

router.get("/login", (request: Request, response: Response) => {
  response.render("login")
})

router.post(
  "/login",
  authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    session: false
  })
)

router.get("/favicon.ico", (request: Request, response: Response) => {
  response.send()
})

export default router
