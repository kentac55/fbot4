import { View } from '@slack/web-api'

import { Component } from '../type'

export type ViewComponent<P = undefined> = Component<P, View>
