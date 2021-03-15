import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type ChannelCreatedProps = {
  channelId: string
  userId: string
}

export const ChannelCreated: MsgComponent<ChannelCreatedProps> = ({
  channelId,
  userId,
}) =>
  JSXSlack(
    <Blocks>
      <Header>Channel Created :baby:</Header>
      <Section>
        <Mrkdwn
          raw
          verbatim
        >{`channel: <#${channelId}>, by: <@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )
