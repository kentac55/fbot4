import {
  Button,
  Header,
  Image,
  JSXSlack,
  Modal,
  Mrkdwn,
  Section,
} from '@speee-js/jsx-slack'

import { ViewComponent } from './type'

type QuizIntervalProps = { meta: string }

export const QuizInterval: ViewComponent<QuizIntervalProps> = ({ meta }) =>
  JSXSlack(
    <Modal
      title="クイズの答えは・・・"
      externalId="thought"
      privateMetadata={meta}
    >
      <Header>
        だらららららららららら:drum_with_drumsticks::drum_with_drumsticks::drum_with_drumsticks::drum_with_drumsticks:
      </Header>
      <Image
        alt="drum"
        title="どう見てもドラムです"
        src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/274/drum_1f941.png"
      />
      <Section blockId="getResultBlock">
        <Mrkdwn>答えを見る？</Mrkdwn>
        <Button style="primary" actionId="getResultAction">
          答えを見る
        </Button>
      </Section>
    </Modal>
  )
