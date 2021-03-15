import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type MemberLeftProps = {
  userId: string
}

export const MemberLeft: MsgComponent<MemberLeftProps> = ({ userId }) =>
  JSXSlack(
    <Blocks>
      <Header>さよなら〜 :sob:</Header>
      <Section>
        <Mrkdwn raw verbatim>{`<@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )
