import {
  ConversationsSelect,
  Header,
  Input,
  JSXSlack,
  Modal,
  Section,
} from '@speee-js/jsx-slack'

import { ViewComponent } from './type'

export const CallStart: ViewComponent = () =>
  JSXSlack(
    <Modal title="広告するよ" externalId="ad">
      <Header>広告先選んでね</Header>
      <Section blockId="conv">
        送付先
        <ConversationsSelect initialConversation="current" actionId="select" />
      </Section>
      <Input type="submit" value="Send" />
    </Modal>
  )
