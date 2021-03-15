import { WebClient } from '@slack/web-api'
import { Logger } from 'pino'

type ControllerArgs<T> = {
  webClient: WebClient
  logger: Logger
  defaults: {
    text: string
    channel: string
  }
  body: T
}

export type Controller<T> = (args: ControllerArgs<T>) => Promise<void>
