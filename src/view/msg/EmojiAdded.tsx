import {
  Blocks,
  Header,
  Image,
  JSXSlack,
  Mrkdwn,
  Section,
} from '@speee-js/jsx-slack'

import { MsgComponent } from './type'

type EmojiAddedProps = {
  name: string
  url: string
}

export const EmojiAdded: MsgComponent<EmojiAddedProps> = ({
  name,
  url,
}) =>
  JSXSlack(
    <Blocks>
      <Header>絵文字が追加されました :hugging_face:</Header>
      <Image alt={name} title={name} src={url} />
      <Section>
        <Mrkdwn raw verbatim>
          {`:heavy_plus_sign: \`:${name}:\``}
        </Mrkdwn>
      </Section>
    </Blocks>
  )
