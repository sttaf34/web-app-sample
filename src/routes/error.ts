import { Router, Request, Response, NextFunction } from "express"
import * as asyncHandler from "express-async-handler"
import * as createHttpError from "http-errors"
import resolveOrReject from "../utilities/resolve-or-reject"

const router = Router()

router.get("/", (request: Request, response: Response, next: NextFunction) => {
  // next() の引数にエラーオブジェクトを渡すと、
  // express デフォルトのエラーハンドラーが処理してくれる
  // 環境変数で NODE_ENV=production しとくと、スタックトレースが非表示になる

  // 例
  // next(new Error("何かしらのエラーが発生しました"))

  // https://github.com/jshttp/http-errors
  // ↑こっちのが便利そうなので使う
  next(createHttpError(400, "This page always gives an error."))
})

router.get(
  "/promise",
  asyncHandler(async (request: Request, response: Response) => {
    // resolveOrReject() の結果で
    // resolve -> 正常にレスポンスが返る
    // reject  -> デフォルトエラーハンドラーに渡る
    const aNumber = await resolveOrReject()
    response.end(`resolve ${aNumber}`)
  })
)

export default router
