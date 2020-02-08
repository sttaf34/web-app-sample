/* eslint-disable no-console */

import { Request, Response, NextFunction } from "express"

const customErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  // 例えば Loggly とかに送っといて
  console.log("customErrorHandler()", error)

  // あとは express のデフォルトエラーハンドラーにおまかせ
  next(error)
}

export default customErrorHandler
