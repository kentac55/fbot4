import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type ChannelArchiveProps = {
  channelId: string
  userId: string
}

export const ChannelArchive: MsgComponent<ChannelArchiveProps> = ({
  channelId,
  userId,
}) =>
  JSXSlack(
    <Blocks>
      <Header>Channel Archived :skull:</Header>
      <Section>
        <Mrkdwn
          raw
          verbatim
        >{`channel: <#${channelId}>, by: <@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )
