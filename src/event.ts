import { Action, Block, MessageAttachment, Option, View } from '@slack/web-api'

import {
  CallbackKind,
  EmojiEventKind,
  EventAPIKind,
  EventKind,
  InteractiveKind,
} from './kind'

export type Message<T> = T extends EventAPIKind
  ? EventMessage<{ type: T } & EventPayload>
  : T extends 'interactive'
  ? { type: InteractiveKind } & InteractivePayload
  : T extends 'slash_commands'
  ? SlashCommandBody
  : T extends 'block_actions'
  ? BlockActionsBody
  : T extends 'view_closed'
  ? ModalCancelBody
  : never

type EventMessage<T> = {
  event: T
}

type EventPayload =
  | AppHomeOpenedEvent
  | ChannelArchiveEvent
  | ChannelCreatedEvent
  | ChannelDeletedEvent
  | ChannelHistoryChangedEvent
  | ChannelJoindEvent
  | ChannelLeftEvent
  | ChannelMarkedEvent
  | ChannelRenameEvent
  | ChannelUnarchiveEvent
  | EmojiEvent
  | MemberJoinedChannelEvent
  | MemberLeftChannelEvent
  | MessageEvent

type EventType = {
  type: EventKind
}

type EventWithSubType<T extends string> = EventType & {
  subtype: T
}

type Channel = {
  id: string
  name: string
  created: number
}

type ChannelWithCreator = Channel & {
  creator: string
}

export type ChannelArchiveEvent = EventType & {
  type: 'channel_archive'
  channel: string
  user: string
}

export type ChannelCreatedEvent = EventType & {
  type: 'channel_created'
  channel: ChannelWithCreator
}

export type ChannelDeletedEvent = EventType & {
  type: 'channel_deleted'
  channel: string
}

export type ChannelHistoryChangedEvent = EventType & {
  type: 'channel_history_changed'
  latest: string
  ts: string
  event_ts: string
}

export type ChannelJoindEvent = EventType & {
  type: 'channel_joined'
  channel: ChannelWithCreator
}

export type ChannelLeftEvent = EventType & {
  type: 'channel_left'
  channel: string
}

export type ChannelMarkedEvent = EventType & {
  type: 'channel_marked'
  channel: string
  ts: string
}

export type ChannelRenameEvent = EventType & {
  type: 'channel_rename'
  channel: Channel
}

export type ChannelUnarchiveEvent = EventType & {
  type: 'channel_unarchive'
  channel: string
  user: string
}

type Team = {
  domain: string
  id: string
  name: string
}

type EmojiEventCommon = EventWithSubType<EmojiEventKind> & {
  type: 'emoji_changed'
  event_ts: string
}

type EmojiAddEvent = EmojiEventCommon & {
  subtype: 'add'
  name: string
  value: string
}

type EmojiRemoveEvent = EmojiEventCommon & {
  subtype: 'remove'
  names: string[]
}

export type EmojiEvent = EmojiAddEvent | EmojiRemoveEvent

export type MemberJoinedChannelEvent = EventType & {
  type: 'member_joined_channel'
  user: string
  channel: string
  channel_type: string
  team: string
  inviter?: string
}

export type MemberLeftChannelEvent = EventType & {
  type: 'member_left_channel'
  user: string
  channel: string
  channel_type: string
  team: string
}

type MessageEvent = UserMessageEvent | MessageEventWithSubtype

type MessageEventCommon = EventType & {
  type: 'message'
  subtype?: string
  text: string
  ts: string
}

type UserMessageEvent = MessageEventCommon & {
  channel: string
  subtype: undefined
  user: string
  edited?: Edited
  icons?: { [k: string]: string }
  attachments?: MessageAttachment[]
  thread_ts?: string
}

type MessageEventWithSubtype = MessageEventCommon & {
  subtype: string
}

type Edited = {
  user: string
  ts: string
}

export type SlashCommandBody = {
  channel_id: string
  channel_name: string
  command: string
  response_url: string
  team_domain: string
  team_id: string
  text: string
  token: string
  trigger_id: string
  user_id: string
  user_name: string
}

export type AppHomeOpenedEvent = EventType & {
  type: 'app_home_opened'
  user: string
  channel: string
  event_ts: string
  tab: string
  view?: View & { type: 'home' }
}

type User = {
  id: string
  username: string
  team_id: string
}

type InteractivePayload =
  | BlockActionsBody
  | MessageActionBody
  | ShortcutBody
  | ViewSubmissionBody

type Container = {
  type: string
  message_ts: string
  channel_id: string
  is_ephemeral: boolean
}

export type BlockActionsBody = {
  type: 'block_actions'
  trigger_id: string
  response_url: string
  team: Team
  user: User
  actions: Action[]
  message: {
    bot_id: string
  }
  container: Container
  view: View
}

export type MessageActionBody = {
  type: 'message_action'
  token: string
  action_ts: string
  team: {
    id: string
    domain: string
  }
  user: {
    id: string
    username: string
    team_id: string
    name: string
  }
  channel: {
    id: string
    name: string
  }
  is_enterprise_install: boolean
  enterprise: string | null
  callback_id: string
  trigger_id: string
  response_url: string
  message_ts: string
  message: {
    bot_id?: string
    type: 'message'
    text: string
    user: string
    ts: string
    team: string
    bot_profile?: {
      id: string
      deleted: boolean
      name: string
      updated: number
      app_id: string
      // icons: [Object]
      team_id: string
    }
    blocks: Block[]
  }
}

export type ShortcutBody = {
  type: 'shortcut'
  token: string
  action_ts: string
  team: Team
  user: User
  is_enterprise_install: boolean
  enterprise: null // ???
  callback_id: CallbackKind // slackのと合わせて
  trigger_id: string
}

export type ViewSubmissionBody = {
  type: 'view_submission'
  team: {
    // eventにはnameがあるがこっちにはない
    domain: string
    id: string
  }
  user: {
    // eventにはnameが無いがこっちにはある
    id: string
    username: string
    name: string
    team_id: string
  }
  view: View
  trigger_id: string
} & State

type ModalCancelBody = {
  type: 'view_closed'
  team: {
    domain: string
    id: string
  }
  user: {
    id: string
    name: string
  }
  view: View
}

type State = DSMState | HelloState | AdState | QuizState

// https://api.slack.com/reference/block-kit/block-elements
// https://api.slack.com/reference/interaction-payloads/block-actions

type CheckBoxGroupState = {
  type: 'checkboxes'
  selected_options: Option[]
}

type RadioGroupState = {
  type: 'radio_buttons'
  selected_option: Option
}

type ConversationsSelect = {
  type: 'conversations_select'
  selected_conversation: string
}

type DSMState = {
  view: {
    external_id: 'DSM'
    state: {
      values: {
        dsmSelect: {
          dsmSelectAction: CheckBoxGroupState
        }
        dsmConvSelect: {
          dsmConvAction: ConversationsSelect
        }
      }
    }
  }
}

type HelloState = {
  view: {
    external_id: 'hello'
    state: {
      values: {
        helloPick: {
          helloPickAction: RadioGroupState
        }
      }
    }
  }
}

type AdState = {
  view: {
    external_id: 'ad'
    state: {
      values: {
        conv: {
          select: ConversationsSelect
        }
      }
    }
  }
}

type QuizState = {
  view: {
    external_id: 'thinking'
    state: {
      values: {
        quizSelect: {
          quizAction: CheckBoxGroupState
        }
      }
    }
  }
}
