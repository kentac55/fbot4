import { Blocks, JSXSlack, Section } from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type UnregisteredCommandProps = { command: string }

export const UnregisteredCommand: MsgComponent<UnregisteredCommandProps> = ({
  command,
}) =>
  JSXSlack(
    <Blocks>
      <Section>
        <b>{`unregistered slash command: ${command}`}</b>
      </Section>
    </Blocks>
  )
