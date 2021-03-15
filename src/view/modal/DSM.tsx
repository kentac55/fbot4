import {
  Checkbox,
  CheckboxGroup,
  ConversationsSelect,
  Header,
  JSXSlack,
  Modal,
} from '@speee-js/jsx-slack'

import { ViewComponent } from './type'

export const DSM: ViewComponent = () =>
  JSXSlack(
    <Modal title="DSM" externalId="DSM">
      <Header>DSM</Header>
      <ConversationsSelect
        blockId="dsmConvSelect"
        actionId="dsmConvAction"
        label="投げ先"
        initialConversation="current"
        required
      />
      <CheckboxGroup
        blockId="dsmSelect"
        actionId="dsmSelectAction"
        label="参加者"
        required
      >
        <Checkbox value="t" checked>
          T
        </Checkbox>
        <Checkbox value="m" checked>
          M
        </Checkbox>
        <Checkbox value="a" checked>
          A
        </Checkbox>
        <Checkbox value="f" checked>
          F
        </Checkbox>
      </CheckboxGroup>
    </Modal>
  )
