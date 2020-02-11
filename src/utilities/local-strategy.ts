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
    process.nextTick(
      async (): Promise<void> => {
        const userOrResult = await User.findOneByNameAndPassword(
          username,
          password
        )
        if (userOrResult instanceof User) {
          return done(null, userOrResult.name, { message: "認証しました" })
        }
        const message = `見つかりませんでした ${userOrResult}`
        return done(null, false, { message })
      }
    )
  }

  return new Strategy(option, verify)
}

export default localStrategy
