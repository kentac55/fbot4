import { WebClient } from '@slack/web-api'
import { SocketModeClient } from '@slack/socket-mode'
import { Logger } from 'pino'

import { Message } from './event'
import { EventKind, EventAPIKind } from './kind'

import {
  AppHomeOpendController,
  BlockActionsController,
  ChannelArchiveController,
  ChannelCreatedController,
  ChannelDeletedController,
  ChannelRenameController,
  ChannelUnarchiveController,
  DSMController,
  EmojiChangedController,
  HelloController,
  MemberJoinedChannelController,
  MemberLeftChannelController,
  MessageActionController,
  ShortcutController,
  UnregisteredController,
  ViewSubmissionController,
} from './controller'

type Options = {
  webClient: WebClient
  logger: Logger
  defaults: {
    text: string
    channel: string
  }
}

type ListenerFnArg<T extends EventKind> = {
  body: Message<T>
  ack: () => Promise<void>
  event?: T extends EventAPIKind ? T : undefined
}

type ListnerFn<T extends EventKind> = (arg: ListenerFnArg<T>) => Promise<void>

type Handler<T extends EventKind> = [T, ListnerFn<T>]

type RouterFactory<T extends EventKind> = (options: Options) => Handler<T>

const messageHandler: RouterFactory<'message'> = () => [
  'message',
  async ({ ack }: ListenerFnArg<'message'>): Promise<void> => {
    await ack()
  },
]

const interactiveRouter: RouterFactory<'interactive'> = (options) => [
  'interactive',
  async ({ body, ack }: ListenerFnArg<'interactive'>) => {
    try {
      await ack()
      switch (body.type) {
        case 'shortcut': {
          await ShortcutController({ ...options, body })
          break
        }
        case 'view_submission': {
          await ViewSubmissionController({
            ...options,
            body,
          })
          break
        }
        case 'block_actions': {
          await BlockActionsController({
            ...options,
            body,
          })
          break
        }
        case 'message_action': {
          await MessageActionController({
            ...options,
            body,
          })
        }
        default: {
          options.logger.warn(`interactive + unknown`)
          options.logger.debug(body)
        }
      }
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const slashCommandHandler: RouterFactory<'slash_commands'> = (options) => [
  'slash_commands',
  async ({ body, ack }: ListenerFnArg<'slash_commands'>) => {
    try {
      await ack()
      const args = {
        ...options,
        body,
      }
      switch (body.command) {
        case '/挨拶': {
          await HelloController(args)
          break
        }
        case '/dsm': {
          await DSMController(args)
          break
        }
        default: {
          await UnregisteredController(args)
        }
      }
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const emojiChangedHandler: RouterFactory<'emoji_changed'> = (options) => [
  'emoji_changed',
  async ({ body, ack }: ListenerFnArg<'emoji_changed'>) => {
    try {
      await ack()
      await EmojiChangedController({
        ...options,
        body: body.event,
      })
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const channelArchiveHandler: RouterFactory<'channel_archive'> = (options) => [
  'channel_archive',
  async ({ body, ack }: ListenerFnArg<'channel_archive'>) => {
    try {
      await ack()
      await ChannelArchiveController({
        ...options,
        body: body.event,
      })
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const channelCreatedHandler: RouterFactory<'channel_created'> = (options) => [
  'channel_created',
  async ({ body, ack }: ListenerFnArg<'channel_created'>) => {
    try {
      await ChannelCreatedController({
        ...options,
        body: body.event,
      })
      await ack()
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const channelDeletedHandler: RouterFactory<'channel_deleted'> = (options) => [
  'channel_deleted',
  async ({ body, ack }: ListenerFnArg<'channel_deleted'>) => {
    try {
      await ack()
      await ChannelDeletedController({
        ...options,
        body: body.event,
      })
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const channelRenameEventHandler: RouterFactory<'channel_rename'> = (
  options
) => [
  'channel_rename',
  async ({ body, ack }: ListenerFnArg<'channel_rename'>) => {
    try {
      await ack()
      await ChannelRenameController({
        ...options,
        body: body.event,
      })
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const channelUnarchiveEventHandler: RouterFactory<'channel_unarchive'> = (
  options
) => [
  'channel_unarchive',
  async ({ body, ack }: ListenerFnArg<'channel_unarchive'>) => {
    try {
      await ack()
      await ChannelUnarchiveController({
        ...options,
        body: body.event,
      })
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const memberJoinedChannelEventHandler: RouterFactory<'member_joined_channel'> = (
  options
) => [
  'member_joined_channel',
  async ({ body, ack }: ListenerFnArg<'member_joined_channel'>) => {
    try {
      await ack()
      await MemberJoinedChannelController({
        ...options,
        body: body.event,
      })
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const memberLeftChannelEventHandler: RouterFactory<'member_left_channel'> = (
  options
) => [
  'member_left_channel',
  async ({ body, ack }: ListenerFnArg<'member_left_channel'>) => {
    try {
      await ack()
      await MemberLeftChannelController({
        ...options,
        body: body.event,
      })
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const appHomeOpenedEventHandler: RouterFactory<'app_home_opened'> = (
  options
) => [
  'app_home_opened',
  async ({ body, ack }: ListenerFnArg<'app_home_opened'>) => {
    try {
      await ack()
      await AppHomeOpendController({
        ...options,
        body: body.event,
      })
    } catch (e) {
      options.logger.error(e)
    }
  },
]

const handlers = [
  appHomeOpenedEventHandler,
  channelArchiveHandler,
  channelArchiveHandler,
  channelCreatedHandler,
  channelDeletedHandler,
  channelRenameEventHandler,
  channelUnarchiveEventHandler,
  emojiChangedHandler,
  interactiveRouter,
  memberJoinedChannelEventHandler,
  memberLeftChannelEventHandler,
  messageHandler,
  slashCommandHandler,
]

export const register = ({
  socketClient,
  webClient,
  logger,
  channel,
  text,
}: {
  socketClient: SocketModeClient
  webClient: WebClient
  logger: Logger
  channel: string
  text: string
}): void => {
  handlers
    .map((x) => x({ webClient, logger, defaults: { channel, text } }))
    // なんか知らんけどspread演算子使うとtype error
    // .forEach((x) => socketClient.on(...x)
    .forEach((x) => socketClient.on(x[0], x[1]))
}
