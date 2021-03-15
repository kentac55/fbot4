import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type ChannelUnarchiveProps = {
  channelId: string
  userId: string
}

export const ChannelUnarchive: MsgComponent<ChannelUnarchiveProps> = ({
  channelId,
  userId,
}) =>
  JSXSlack(
    <Blocks>
      <Header>Channel Unarchived :zombie:</Header>
      <Section>
        <Mrkdwn
          raw
          verbatim
        >{`channel: <#${channelId}>, by: <@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )
