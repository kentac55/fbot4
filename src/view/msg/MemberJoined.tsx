import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type MemberJoinedProps = {
  userId: string
}

export const MemberJoined: MsgComponent<MemberJoinedProps> = ({ userId }) =>
  JSXSlack(
    <Blocks>
      <Header>Welcome :hugging_face:</Header>
      <Section>
        <Mrkdwn raw verbatim>{`<@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )
