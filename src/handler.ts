import { Block, WebClient } from '@slack/web-api'
import { SocketModeClient } from '@slack/socket-mode'

import { Message } from './event'
import { EventKind, EventAPIKind } from './kind'
import {
  CallStartView,
  ChannelArchivedNotification,
  ChannelCreatedNotification,
  ChannelDeletedNotification,
  ChannelRenamedNotification,
  ChannelUnarchivedNotification,
  DSMMessage,
  DSMView,
  EmojiAddedNotification,
  EmojiRemovedNotification,
  Hello,
  HelloPickView,
  HelloWorld,
  HomeTabBlock,
  Invite3,
  Invite4,
  MemberJoinedNotification,
  MemberLeftNotification,
  QuizView,
  QuizView2,
  QuizView3,
  SelfIntroduceView,
  SimpleTextBlock,
  StartMsg,
  UndeletableView,
} from './msg'
import { getUniqueElems, sleep } from './util'
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

const buildHello = (pattern: string, userId: string): Block[] => {
  switch (pattern) {
    case 'エンジニア': {
      return Hello({
        userId,
        target: 'エンジニア',
        dialogues: getUniqueElems(getEengineerDialogues(), 5),
        text: '',
      })
    }
    case '陰キャ': {
      return Hello({
        userId,
        target: '陰キャ',
        dialogues: getUniqueElems(get陰キャDialogues(), 5),
        text: '',
      })
    }
    case 'こどおじ': {
      return Hello({
        userId,
        target: 'こどおじ',
        dialogues: getUniqueElems(getこどおじDialogues(), 5),
        text: '',
      })
    }
    case 'javascript': {
      return Hello({
        userId,
        target: 'エンジニア(javascript)',
        dialogues: getUniqueElems(getJavascriptDialogues(), 5),
        text: '',
      })
    }
    case 'ゲーマー': {
      return Hello({
        userId,
        target: 'ゲーマー',
        dialogues: getUniqueElems(getGamerDialogues(), 5),
        text: '',
      })
    }
    default: {
      return Hello({
        userId,
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
        text: 'へるぷみー',
      })
    }
  }
}

const interactiveHandler: HandlerFactory<'interactive'> = ({
  webClient,
  channel,
  text,
}) => [
  'interactive',
  async ({ body, ack }: ListenerFnArg<'interactive'>) => {
    await ack()
    switch (body.type) {
      case 'shortcut': {
        switch (body.callback_id) {
          case 'hello': {
            console.log('hello')
            // webClient.views.open({
            //   trigger_id: body.trigger_id,
            //   view: HelloView(),
            // })
            await webClient.views.open({
              trigger_id: body.trigger_id,
              view: HelloPickView(),
            })
            break
          }
          case 'self_introduce': {
            console.log('self_introduce')
            await webClient.views.open({
              trigger_id: body.trigger_id,
              view: SelfIntroduceView(),
            })
            break
          }
          case 'dsm': {
            console.log('dsm executed')
            await webClient.views.open({
              trigger_id: body.trigger_id,
              view: DSMView(),
            })
            break
          }
          case 'start': {
            console.log('start executed')
            await webClient.views.open({
              trigger_id: body.trigger_id,
              view: CallStartView(),
            })
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
        switch (body.view.external_id) {
          case 'DSM': {
            console.log(
              body.view.state.values.dsmSelect.dsmSelectAction.selected_options
            )
            await webClient.chat.postMessage({
              channel,
              text,
              blocks: DSMMessage({
                users: body.view.state.values.dsmSelect.dsmSelectAction.selected_options.map(
                  (x) => x.text.text
                ),
              }),
            })
            break
          }
          case 'hello': {
            await webClient.chat.postMessage({
              channel,
              text,
              blocks: buildHello(
                body.view.state.values.helloPick.helloPickAction.selected_option
                  .value || 'help',
                body.user.id
              ),
            })
            break
          }
          case 'ad': {
            console.log(
              body.view.state.values.conv.select.selected_conversation
            )
            await webClient.chat.postMessage({
              channel: body.view.state.values.conv.select.selected_conversation,
              text,
              blocks: StartMsg(),
            })
            break
          }
          case 'quizResult1': {
            console.log('quiz-a')
            await sleep(1000)
            await webClient.views.open({
              trigger_id: body.trigger_id,
              view: QuizView2({
                meta: body.view.state.values.quizSelect.quizAction.selected_options
                  .map((o) => o.text.text)
                  .join(','),
              }),
            })
            break
          }
          case 'ans': {
            console.log('ans')
            await sleep(1000)
            await webClient.views.open({
              trigger_id: body.trigger_id,
              view: QuizView3({
                ans: body.view.private_metadata.split(','),
              }),
            })
            break
          }
          default: {
            console.log(body)
            const _: never = body.view
            return _
          }
        }
        break
      }
      case 'block_actions': {
        console.log('block_actions')
        body.actions.forEach(async (action) => {
          switch (action.action_id) {
            case 'ktkr': {
              console.log('ktkr')
              await webClient.views.open({
                trigger_id: body.trigger_id,
                view: QuizView(),
              })
              break
            }
            case 'getResultAction': {
              console.log('getResultAction')
              await webClient.views.update({
                external_id: body.view.external_id,
                view: QuizView3({
                  ans: body.view.private_metadata?.split(',') ?? [],
                }),
              })
              break
            }
            case 'yes': {
              // webClient.chat.postEphemeral({
              //   user: body.user.id,
              //   channel: body.container.channel_id,
              //   text,
              //   blocks: Invite(),
              // })
              await webClient.views.open({
                trigger_id: body.trigger_id,
                view: Invite3(),
              })
              break
            }
            case 'no': {
              await webClient.views.open({
                trigger_id: body.trigger_id,
                view: Invite4(),
              })
              // webClient.chat.postEphemeral({
              //   user: body.user.id,
              //   channel: body.container.channel_id,
              //   text,
              //   blocks: Invite2(),
              // })
              break
            }
            default: {
              console.log(`unregistered: ${action.action_id}`)
            }
          }
        })
        break
      }
      case 'message_action': {
        console.log('message action')
        switch (body.callback_id) {
          case 'bomb': {
            if (body.message.bot_profile?.name === 'fbot4') {
              await webClient.chat.delete({
                channel: body.channel.id,
                ts: body.message.ts,
              })
            } else {
              await webClient.views.open({
                trigger_id: body.trigger_id,
                view: UndeletableView(),
              })
            }
            break
          }
          default: {
            console.log(`unregistered message action: ${body.callback_id}`)
            console.log(body)
          }
        }
        break
      }
      default: {
        console.log(`interactive + unknown`)
        console.log(body)
      }
    }
  },
]

const slashCommandHandler: HandlerFactory<'slash_commands'> = ({
  webClient,
  text,
}) => [
  'slash_commands',
  async ({ body, ack }: ListenerFnArg<'slash_commands'>) => {
    try {
      if (body.command === '/挨拶') {
        await webClient.chat.postMessage({
          channel: body.channel_id,
          text,
          blocks: buildHello(body.text, body.user_id),
        })
        await ack()
      } else {
        await webClient.chat.postMessage({
          channel: body.channel_id,
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
