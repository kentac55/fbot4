import { Blocks, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

export const HelloWorld: MsgComponent = () =>
  JSXSlack(
    <Blocks>
      <Section>
        <Mrkdwn raw verbatim>
          ざぁこ :heart: ざこエンジニア :heart:
        </Mrkdwn>
      </Section>
    </Blocks>
  )
