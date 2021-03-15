import {
  Header,
  Image,
  JSXSlack,
  Modal,
  Mrkdwn,
  Section,
} from '@speee-js/jsx-slack'

import { ViewComponent } from './type'

type QuizAnswerProps = { ans: string[] }

export const QuizAnswer: ViewComponent<QuizAnswerProps> = ({ ans }) =>
  JSXSlack(
    <Modal title="こういう集客嫌い">
      <Header>ハンガーフライトで答え合わせ！</Header>
      <Section>
        <Mrkdwn raw verbatim>
          みんな来てね :hugging_face:
        </Mrkdwn>
        <Image
          alt="welcome"
          title="yay"
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/3/face-throwing-a-kiss_1f618.png"
        />
      </Section>
      <Section>
        <Mrkdwn raw verbatim>{`あなたの答え: \n${
          ans.length === 0 ? '該当なし' : ans.join('\n')
        }`}</Mrkdwn>
      </Section>
    </Modal>
  )
