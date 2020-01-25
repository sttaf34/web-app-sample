import * as express from "express"
import {
  Strategy,
  IStrategyOptionsWithRequest,
  VerifyFunctionWithRequest,
  IVerifyOptions
} from "passport-local"
import User from "../entities/user"

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
      User.findOneByNameAndPassword(username, password)
        .then((user: User | undefined) => {
          if (user === undefined) {
            return done(null, false, { message: "見つかりませんでした" })
          }
          return done(null, user.name, { message: "認証しました" })
        })
        .catch((error: Error) => {
          return done(error, false, { message: "何かが間違っています" })
        })
    })
  }

  return new Strategy(option, verify)
}

export default localStrategy
