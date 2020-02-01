/* eslint-disable no-console */

import * as express from "express"
import * as http from "http"
import createApp from "../app"

const onError = (error: Error): void => {
  console.log(error)
  throw error
}

const port = process.env.PORT || 9700
const onListening = (): void => {
  console.log(`listening on port ${port}!`)
  console.log(process.env)
}

createApp()
  .then((app: express.Express): void => {
    const server = http.createServer(app)
    server.listen(process.env.PORT || 9700)
    server.on("error", onError)
    server.on("listening", onListening)
  })
  .catch(onError)
