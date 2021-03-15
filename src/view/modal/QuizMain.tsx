import {
  Checkbox,
  CheckboxGroup,
  Header,
  JSXSlack,
  Modal,
} from '@speee-js/jsx-slack'

import { ViewComponent } from './type'

export const QuizMain: ViewComponent = () =>
  JSXSlack(
    <Modal title="クイズです" externalId="thinking" submit="これでおｋ">
      <Header>
        Slackの機能には色々ありますが、中にはdeprecatedな機能もあります。下記からdeprecatedなものを全て選んでください
      </Header>
      <CheckboxGroup
        blockId="quizSelect"
        actionId="quizAction"
        label="deprecatedはどれ？"
      >
        <Checkbox value="im">incoming message</Checkbox>
        <Checkbox value="bot">bot user</Checkbox>
        <Checkbox value="slash">slash commands</Checkbox>
        <Checkbox value="om">outgoing message</Checkbox>
        <Checkbox value="emoji">emojiを取得するAPI(`emoji.list`)</Checkbox>
        <Checkbox value="kick">ユーザーをkickするAPI(`channels.kick`)</Checkbox>
      </CheckboxGroup>
    </Modal>
  )
