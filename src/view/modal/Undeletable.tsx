import { Header, JSXSlack, Modal } from '@speee-js/jsx-slack'

import { ViewComponent } from './type'

export const Undeletable: ViewComponent = () =>
  JSXSlack(
    <Modal title="ダメです">
      <Header>fbot4の投稿じゃないと消せねﾝだわ</Header>
    </Modal>
  )
