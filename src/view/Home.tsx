import { View } from '@slack/web-api'
import { Home, JSXSlack, Section } from '@speee-js/jsx-slack'

import { Component } from './type'

type HomeComponent<P = undefined> = Component<P, View>

type HomeTabProps = {
  userId: string
}

export const AppHome: HomeComponent<HomeTabProps> = ({ userId }) =>
  JSXSlack(
    <Home>
      <Section>ざぁこ :heart: ざこエンジニア :heart:</Section>
      <Section>{`あなたのID: ${userId}`}</Section>
    </Home>
  )
