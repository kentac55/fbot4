import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type EmojiRemovedProps = { name: string }

export const EmojiRemoved: MsgComponent<EmojiRemovedProps> = ({ name }) =>
  JSXSlack(
    <Blocks>
      <Header>絵文字が削除されました :innocent:</Header>
      <Section>
        <Mrkdwn raw verbatim>{`:heavy_minus_sign: \`:${name}:\``}</Mrkdwn>
      </Section>
    </Blocks>
  )
