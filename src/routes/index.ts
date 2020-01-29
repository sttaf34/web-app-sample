import { Router, Request, Response } from "express"
import { authenticate } from "passport"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  const message = request.flash()

  // TODO: ログインの方式で request.user の型が異なるのをどう処理するか
  if (typeof request.user === "object") {
    response.render("index", { user: "github", message: message.success })
  } else {
    response.render("index", { user: request.user, message: message.success })
  }
})

router.get("/login", (request: Request, response: Response) => {
  if (request.user) {
    response.redirect("/")
  }

  const message = request.flash()
  response.render("login", { message: message.error })
})

router.post(
  "/login",
  authenticate("local", {
    successRedirect: "/",
    successFlash: true,
    failureRedirect: "/login",
    failureFlash: true,
    session: true
  })
)

router.get("/logout", (request: Request, response: Response) => {
  request.logout()
  response.redirect("/")
})

router.get("/favicon.ico", (request: Request, response: Response) => {
  response.send()
})

export default router
