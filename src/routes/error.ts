import { Router, Request, Response, NextFunction } from "express"
import * as createHttpError from "http-errors"

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

export default router
