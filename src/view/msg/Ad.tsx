import {
  Actions,
  Blocks,
  Button,
  Divider,
  Header,
  JSXSlack,
  Mrkdwn,
  Section,
} from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

export const Ad: MsgComponent = () =>
  JSXSlack(
    <Blocks>
      <Header>
        :small_airplane: ハンガーフライトのお知らせ :small_airplane:
      </Header>
      <Divider />
      <Section>
        <Mrkdwn>
          今日は :sparkles: 令和最新版 :sparkles: に対応したslack
          appの作り方について共有します :hugging_face:
        </Mrkdwn>
      </Section>
      <Section>
        <Mrkdwn>
          例えばですがﾎﾞﾀﾝﾎﾟﾁしてﾄﾞｶｰﾝ :exploding_head:
          みたいなやつ、令和最新版ではweb
          socketで完結できるようになっているのですが皆さんご存知でしたか？
          :thinking_face:
        </Mrkdwn>
      </Section>
      <Section>
        <Mrkdwn>
          ということで今回はSlack
          Appの基礎的な話から令和最新版対応Appを作るに際して必要な知識までを共有していく予定です。
          :muscle:
        </Mrkdwn>
      </Section>
      <Section>
        <Mrkdwn>最後にslack常識クイズを置いておきます :sleeping:</Mrkdwn>
      </Section>
      <Actions>
        <Button actionId="ktkr" value="クイズに付き合う" style="danger">
          クイズに付き合う
        </Button>
      </Actions>
    </Blocks>
  )
