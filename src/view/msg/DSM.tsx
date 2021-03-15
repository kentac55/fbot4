import { Blocks, Header, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type DSMProps = { users: string[] }

export const DSM: MsgComponent<DSMProps> = ({ users }) => {
  const f = users[Math.floor(Math.random() * users.length)]
  return JSXSlack(
    <Blocks>
      <Header>DSMはーじまーるよー</Header>
      <Section>
        <Mrkdwn raw verbatim>
          {`進行役よろ: \`${f}\``}
        </Mrkdwn>
      </Section>
      <Section>
        <Mrkdwn raw verbatim>
          {`順番: \`${users.join(', ')}\``}
        </Mrkdwn>
      </Section>
    </Blocks>
  )
}
