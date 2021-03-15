import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type ChannelRenameProps = {
  channelId: string
}

export const ChannelRename: MsgComponent<ChannelRenameProps> = ({
  channelId,
}) =>
  JSXSlack(
    <Blocks>
      <Header>Channel Renamed :writing_hand:</Header>
      <Section>
        <Mrkdwn raw verbatim>{`channel: <#${channelId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )
