import { LogLevel, SocketModeClient } from '@slack/socket-mode'
import { WebClient } from '@slack/web-api'
import pino from 'pino'

import { register } from './handler'
import { getAgent } from './util'

const appToken = process.env.SLACK_APP_TOKEN
const botToken = process.env.SLACK_BOT_TOKEN

if (appToken === undefined || botToken === undefined) {
  throw new Error('token無い')
}

const channel = process.env.SLACK_DEFAULT_CHANNEL
if (channel === undefined) {
  throw new Error('デフォルトchannelが指定されてない')
}
const text = 'あ〜テスト！'

// class PinoLogger implements Logger {
//   private pino
//   constructor() {
//     this.pino = pino()
//     this.pino.level = 'trace'
//   }
//   debug(...msgs: unknown[]): void {
//     this.pino.debug('debug: ' + JSON.stringify(msgs))
//   }
//   info(...msgs: unknown[]): void {
//     this.pino.info('info: ' + JSON.stringify(msgs))
//   }
//   warn(...msgs: unknown[]): void {
//     this.pino.warn('warn: ' + JSON.stringify(msgs))
//   }
//   error(...msgs: unknown[]): void {
//     this.pino.debug('error: ' + JSON.stringify(msgs))
//   }
//   setLevel(level: LogLevel): void {
//     console.debug(level)
//   }
//   getLevel(): LogLevel {
//     if (
//       this.pino.level === LogLevel.DEBUG ||
//       this.pino.level === LogLevel.INFO ||
//       this.pino.level === LogLevel.WARN ||
//       this.pino.level === LogLevel.ERROR
//     ) {
//       return this.pino.level
//     } else {
//       return LogLevel.DEBUG
//     }
//   }
//   setName(name: string): void {
//     console.debug(name)
//   }
// }

const logger = pino()
const agent = getAgent()
const socketClient = new SocketModeClient({
  appToken,
  logLevel: LogLevel.DEBUG,
  clientOptions: {
    agent,
  },
  // logger: new PinoLogger(),
})
const webClient = new WebClient(botToken, { agent })

register({ socketClient, webClient, logger, channel, text })
;(async () => {
  const res = await socketClient.start()
  logger.info(res)
})()
