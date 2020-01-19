/* eslint-disable @typescript-eslint/no-explicit-any */

import * as express from "express"
import {
  Strategy,
  IStrategyOptionsWithRequest,
  VerifyFunctionWithRequest,
  IVerifyOptions
} from "passport-local"

const localStrategy = (): Strategy => {
  const option: IStrategyOptionsWithRequest = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
    session: false
  }

  const verify: VerifyFunctionWithRequest = (
    req: express.Request,
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void
  ): void => {
    process.nextTick((): void => {
      if (username === "test" && password === "test") {
        return done(null, username)
      }
      return done(null, false, { message: "何かが間違っています" })
    })
  }

  return new Strategy(option, verify)
}

export default localStrategy
