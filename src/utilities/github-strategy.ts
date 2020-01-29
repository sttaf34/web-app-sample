import * as express from "express"
import { Strategy, StrategyOptionsWithRequest } from "passport-github2"
import { VerifyFunctionWithRequest, VerifyCallback } from "passport-oauth2"

const githubStrategy = (): Strategy => {
  const option: StrategyOptionsWithRequest = {
    clientID: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    callbackURL: "/auth/github/callback",
    passReqToCallback: true
  }

  const verify: VerifyFunctionWithRequest = (
    request: express.Request,
    accessToken: string,
    refreshToken: string,
    profile: object,
    verified: VerifyCallback
  ): void => {
    process.nextTick((): void => {
      return verified(null, profile)
    })
  }
  return new Strategy(option, verify)
}

export default githubStrategy
