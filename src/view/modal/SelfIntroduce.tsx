import { Header, Input, JSXSlack, Modal } from '@speee-js/jsx-slack'

import { ViewComponent } from './type'

export const SelfIntroduce: ViewComponent = () =>
  JSXSlack(
    <Modal title="自己紹介">
      <Header>だぁれ？</Header>
      <Input
        name="name"
        blockId="name"
        actionId="nameAction"
        label="Name"
        required
      />
      <Input type="submit" value="Send" />
    </Modal>
  )
