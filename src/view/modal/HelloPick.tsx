import {
  Header,
  JSXSlack,
  Modal,
  RadioButton,
  RadioButtonGroup,
} from '@speee-js/jsx-slack'

import { ViewComponent } from './type'

export const HelloPick: ViewComponent = () =>
  JSXSlack(
    <Modal title="挨拶" externalId="hello">
      <Header>挨拶してくれるよ！</Header>
      <RadioButtonGroup
        label="abc"
        blockId="helloPick"
        actionId="helloPickAction"
      >
        <RadioButton value="エンジニア">エンジニア</RadioButton>
        <RadioButton value="陰キャ">陰キャ</RadioButton>
        <RadioButton value="こどおじ">こどおじ</RadioButton>
        <RadioButton value="javascript">javascripかきかき</RadioButton>
        <RadioButton value="ゲーマー">ゲーマー</RadioButton>
        <RadioButton value="help" checked>
          へるぷみー
        </RadioButton>
      </RadioButtonGroup>
    </Modal>
  )
