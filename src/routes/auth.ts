import { Router, Request, Response } from "express"
import { authenticate } from "passport"

const router = Router()

router.get("/github", authenticate("github", { scope: ["user:email"] }))

router.get(
  "/github/callback",
  authenticate("github", { failureRedirect: "../login" }),
  (request: Request, response: Response): void => {
    response.redirect("../../")
  }
)

export default router
