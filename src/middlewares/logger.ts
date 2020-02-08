/* eslint-disable no-console */

import { Request, Response, NextFunction } from "express"
import * as Moment from "moment"

const logger = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  console.log(Moment().format("YYYY-MM-DD HH:mm:ss"))
  next()
}
export default logger

/*
 https://expressjs.com/ja/guide/writing-middleware.html

 この middleware は、時刻をログに出力するだけのもの
*/
