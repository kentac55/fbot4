import { Block } from '@slack/web-api'

import { Component } from '../type'

export type MsgComponent<P = undefined> = Component<P, Block[]>
