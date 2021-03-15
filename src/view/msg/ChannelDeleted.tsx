import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type ChannelDeletedProps = {
  channelName: string
}

export const ChannelDeleted: MsgComponent<ChannelDeletedProps> = ({
  channelName,
}) =>
  JSXSlack(
    <Blocks>
      <Header>Channel Deleted :cop:</Header>
      <Section>
        <Mrkdwn
          raw
          verbatim
        >{`channel: <#${channelName}>, by: *admin*`}</Mrkdwn>
      </Section>
    </Blocks>
  )
