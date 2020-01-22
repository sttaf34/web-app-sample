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
    done: (
      error: Error | null,
      user: string | boolean,
      options?: IVerifyOptions
    ) => void
  ): void => {
    process.nextTick((): void => {
      if (username === "test" && password === "test") {
        // 認証OKであればdoneにユーザ情報を渡すような形
        // passport.serializeUserの中のdoneに渡る
        return done(null, username, { message: "認証しました" })
      }
      return done(null, false, { message: "何かが間違っています" })
    })
  }

  return new Strategy(option, verify)
}

export default localStrategy
