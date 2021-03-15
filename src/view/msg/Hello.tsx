import { Blocks, Divider, JSXSlack, Mrkdwn, Section } from '@speee-js/jsx-slack'

import {
  getEengineerDialogues,
  get陰キャDialogues,
  getこどおじDialogues,
  getJavascriptDialogues,
  getGamerDialogues,
} from './dialogue'
import { MsgComponent } from './type'

const getDialogues = (target: string, pick: (array: string[]) => string[]) => {
  switch (target) {
    case 'エンジニア': {
      return pick(getEengineerDialogues())
    }
    case '陰キャ': {
      return pick(get陰キャDialogues())
    }
    case 'こどおじ': {
      return pick(getこどおじDialogues())
    }
    case 'javascript': {
      return pick(getJavascriptDialogues())
    }
    case 'ゲーマー': {
      return pick(getGamerDialogues())
    }
    default: {
      return null
    }
  }
}

type HelloProps = {
  userId: string
  target: string
  pick: (array: string[]) => string[]
}

export const Hello: MsgComponent<HelloProps> = ({ userId, target, pick }) => {
  const dialogues = getDialogues(target, pick)
  const prefix = `ざぁこ :heart: ざこ${
    dialogues === null ? 'ユーザー' : target
  } :heart:`
  /* const itsumono = ['前髪すかすか'] */
  const fallback = [
    'エンジニア',
    '陰キャ',
    'こどおじ',
    'javascript',
    'ゲーマー',
  ]
    .map((x) => `\`/挨拶 ${x}\`\n`)
    .concat([`\n\`${target}\` って何？ｗ ウケる :heart:`])
  const separator = ' :heart: \n'

  const msg =
    dialogues
      /* ?.concat(itsumono) */
      ?.concat([''])
      .join(separator) ?? fallback

  return JSXSlack(
    <Blocks>
      <Section>
        <Mrkdwn raw verbatim>
          {`<@${userId}> ` + prefix}
        </Mrkdwn>
      </Section>
      <Divider />
      <Section>
        <Mrkdwn raw verbatim>
          {msg}
        </Mrkdwn>
      </Section>
    </Blocks>
  )
}
