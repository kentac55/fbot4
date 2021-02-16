import { WebClient } from '@slack/web-api'
import { SocketModeClient } from '@slack/socket-mode'

import { Message } from './event'
import { EventKind, EventAPIKind } from './kind'
import {
  ChannelArchivedNotification,
  ChannelCreatedNotification,
  ChannelDeletedNotification,
  ChannelRenamedNotification,
  ChannelUnarchivedNotification,
  EmojiAddedNotification,
  EmojiRemovedNotification,
  Hello,
  HelloView,
  HomeTabBlock,
  MemberJoinedNotification,
  MemberLeftNotification,
  SelfIntroduceView,
  SimpleTextBlock,
  HelloWorld,
} from './msg'
import { getUniqueElems } from './util'
import {
  getEengineerDialogues,
  getGamerDialogues,
  getJavascriptDialogues,
  getこどおじDialogues,
  get陰キャDialogues,
} from './dialogue'

type ListenerFnArg<T extends EventKind> = {
  body: Message<T>
  ack: () => Promise<void>
  event?: T extends EventAPIKind ? T : undefined
}

type ListnerFn<T extends EventKind> = (arg: ListenerFnArg<T>) => Promise<void>

type Handler<T extends EventKind> = [T, ListnerFn<T>]

type HandlerFactory<T extends EventKind> = (options: {
  webClient: WebClient
  channel: string
  text: string
}) => Handler<T>

const messageHandler: HandlerFactory<'message'> = () => [
  'message',
  async ({ body, ack }: ListenerFnArg<'message'>): Promise<void> => {
    console.log(body.event.text)
    // l.info(body)
    try {
      await ack()
      // await webClient.chat.postMessage({
      //   channel: 'C0BQ8GW78',
      //   blocks: exampleBlock({ name: 'aaaa' }),
      // })
    } catch (e) {
      console.error(e)
    }
  },
]

const interactiveHandler: HandlerFactory<'interactive'> = ({ webClient }) => [
  'interactive',

  async ({ body, ack }: ListenerFnArg<'interactive'>) => {
    switch (body.type) {
      case 'shortcut': {
        switch (body.callback_id) {
          case 'hello': {
            console.log('hello')
            webClient.views.open({
              trigger_id: body.trigger_id,
              view: HelloView(),
            })
            break
          }
          case 'self_introduce': {
            console.log('self_introduce')
            webClient.views.open({
              trigger_id: body.trigger_id,
              view: SelfIntroduceView(),
            })
            break
          }
          default: {
            console.log(`unregistered callback: ${body.callback_id}`)
            console.log(body)
          }
        }
        break
      }
      case 'view_submission': {
        console.log('view_submission')
        console.log(body)
        break
      }
      default: {
        console.log(`interactive + unknown`)
        console.log(body)
      }
    }
    await ack()
  },
]

const slashCommandHandler: HandlerFactory<'slash_commands'> = ({
  webClient,
  channel,
  text,
}) => [
  'slash_commands',
  async ({ body, ack }: ListenerFnArg<'slash_commands'>) => {
    try {
      if (body.command === '/挨拶') {
        if (body.text === 'エンジニア') {
          await webClient.chat.postMessage({
            channel,
            text,
            blocks: Hello({
              userId: body.user_id,
              target: 'エンジニア',
              dialogues: getUniqueElems(getEengineerDialogues(), 5),
              text: '',
            }),
          })
        } else if (body.text === '陰キャ') {
          await webClient.chat.postMessage({
            channel,
            text,
            blocks: Hello({
              userId: body.user_id,
              target: '陰キャ',
              dialogues: getUniqueElems(get陰キャDialogues(), 5),
              text: '',
            }),
          })
        } else if (body.text === 'こどおじ') {
          await webClient.chat.postMessage({
            channel,
            text,
            blocks: Hello({
              userId: body.user_id,
              target: 'こどおじ',
              dialogues: getUniqueElems(getこどおじDialogues(), 5),
              text: '',
            }),
          })
        } else if (body.text.toLowerCase() === 'javascript') {
          await webClient.chat.postMessage({
            channel,
            text,
            blocks: Hello({
              userId: body.user_id,
              target: 'エンジニア(javascript)',
              dialogues: getUniqueElems(getJavascriptDialogues(), 5),
              text: '',
            }),
          })
        } else if (body.text === 'ゲーマー') {
          await webClient.chat.postMessage({
            channel,
            text,
            blocks: Hello({
              userId: body.user_id,
              target: 'ゲーマー',
              dialogues: getUniqueElems(getGamerDialogues(), 5),
              text: '',
            }),
          })
        } else if (body.text === 'list') {
          await webClient.chat.postMessage({
            channel,
            text,
            blocks: Hello({
              userId: body.user_id,
              target: 'ユーザー',
              dialogues: getUniqueElems(getGamerDialogues(), 5),
              text: '',
            }),
          })
        } else {
          await webClient.chat.postMessage({
            channel,
            text,
            blocks: Hello({
              userId: body.user_id,
              target: 'ユーザー',
              dialogues: [
                'エンジニア',
                '陰キャ',
                'こどおじ',
                'javascript',
                'ゲーマー',
              ].map((x) => ({
                s: `\`/挨拶 ${x}\``,
              })),
              text: body.text,
            }),
          })
        }
        await ack()
      } else {
        await webClient.chat.postMessage({
          channel,
          text,
          blocks: SimpleTextBlock({
            s: `unregistered slash command: ${body.command}`,
          }),
        })
        await ack()
      }
    } catch (e) {
      console.error(e)
    }
  },
]

const emojiChangedHandler: HandlerFactory<'emoji_changed'> = ({
  channel,
  text,
  webClient,
}) => [
  'emoji_changed',
  async ({ body, ack }: ListenerFnArg<'emoji_changed'>): Promise<void> => {
    await ack()
    const msgBase = Object.freeze({
      channel,
      as_user: true,
      link_names: true,
    })
    if (body.event.subtype === 'add') {
      const msg = {
        text,
        blocks: EmojiAddedNotification({
          name: body.event.name,
          url: body.event.value,
        }),
        ...msgBase,
      }
      await webClient.chat.postMessage(msg)
    } else if (body.event.subtype === 'remove') {
      body.event.names.forEach(
        async (name: string): Promise<void> => {
          const msg = {
            text,
            blocks: EmojiRemovedNotification({ name }),
            ...msgBase,
          }
          await webClient.chat.postMessage(msg)
        }
      )
    } else {
      const _: never = body.event
      new Error(_)
    }
  },
]

const channelArchiveHandler: HandlerFactory<'channel_archive'> = ({
  channel,
  text,
  webClient,
}) => [
  'channel_archive',
  async ({ body, ack }: ListenerFnArg<'channel_archive'>) => {
    await webClient.chat.postMessage({
      channel,
      text,
      blocks: ChannelArchivedNotification({
        channelId: body.event.channel,
        userId: body.event.user,
      }),
    })
    await ack()
  },
]

const channelCreatedHandler: HandlerFactory<'channel_created'> = ({
  channel,
  text,
  webClient,
}) => [
  'channel_created',
  async ({ body, ack }: ListenerFnArg<'channel_created'>) => {
    await webClient.chat.postMessage({
      channel,
      text,
      blocks: ChannelCreatedNotification({
        channelId: body.event.channel.id,
        userId: body.event.channel.creator,
      }),
    })
    await ack()
  },
]

const channelDeletedHandler: HandlerFactory<'channel_deleted'> = ({
  channel,
  text,
  webClient,
}) => [
  'channel_deleted',
  async ({ body, ack }: ListenerFnArg<'channel_deleted'>) => {
    await webClient.chat.postMessage({
      channel,
      text,
      blocks: ChannelDeletedNotification({
        channelName: body.event.channel,
      }),
    })
    await ack()
  },
]

const channelRenameEventHandler: HandlerFactory<'channel_rename'> = ({
  channel,
  text,
  webClient,
}) => [
  'channel_rename',
  async ({ body, ack }: ListenerFnArg<'channel_rename'>) => {
    await webClient.chat.postMessage({
      channel,
      text,
      blocks: ChannelRenamedNotification({
        channelId: body.event.channel.id,
      }),
    })
    await ack()
  },
]

const channelUnarchiveEventHandler: HandlerFactory<'channel_unarchive'> = ({
  channel,
  text,
  webClient,
}) => [
  'channel_unarchive',
  async ({ body, ack }: ListenerFnArg<'channel_unarchive'>) => {
    await webClient.chat.postMessage({
      channel,
      text,
      blocks: ChannelUnarchivedNotification({
        channelId: body.event.channel,
        userId: body.event.user,
      }),
    })
    await ack()
  },
]

const memberJoinedChannelEventHandler: HandlerFactory<'member_joined_channel'> = ({
  text,
  webClient,
}) => [
  'member_joined_channel',
  async ({ body, ack }: ListenerFnArg<'member_joined_channel'>) => {
    const self = (await webClient.auth.test()) as {
      ok: boolean
      url: string
      user: string
      team_id: string
      user_id: string
    }

    await webClient.chat.postMessage(
      body.event.user === self.user_id
        ? {
            channel: body.event.channel,
            text,
            blocks: HelloWorld(),
          }
        : {
            channel: body.event.channel,
            text,
            blocks: MemberJoinedNotification({ userId: body.event.user }),
          }
    )
    await ack()
  },
]

const memberLeftChannelEventHandler: HandlerFactory<'member_left_channel'> = ({
  channel,
  text,
  webClient,
}) => [
  'member_left_channel',
  async ({ body, ack }: ListenerFnArg<'member_left_channel'>) => {
    console.log('valid')
    await webClient.chat.postMessage({
      channel,
      text,
      blocks: MemberLeftNotification({
        userId: body.event.user,
      }),
    })
    await ack()
  },
]

const appHomeOpenedEventHandler: HandlerFactory<'app_home_opened'> = ({
  webClient,
}) => [
  'app_home_opened',
  async ({ body, ack }: ListenerFnArg<'app_home_opened'>) => {
    // console.log(body)
    await webClient.views.publish({
      user_id: body.event.user,
      view: HomeTabBlock(),
    })
    await ack()
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
  interactiveHandler,
  memberJoinedChannelEventHandler,
  memberLeftChannelEventHandler,
  messageHandler,
  slashCommandHandler,
]

export const register = (
  socketClient: SocketModeClient,
  webClient: WebClient,
  channel: string,
  text: string
): void => {
  handlers
    .map((x) => x({ webClient, channel, text }))
    // なんか知らんけどspread演算子使うとtype error
    // .forEach((x) => socketClient.on(...x)
    .forEach((x) => socketClient.on(x[0], x[1]))
}
