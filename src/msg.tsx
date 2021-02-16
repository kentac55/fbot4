import {
  Blocks,
  Divider,
  Header,
  Home,
  Image,
  Input,
  JSXSlack,
  Modal,
  Mrkdwn,
  Section,
} from '@speee-js/jsx-slack'
import { Block, View } from '@slack/web-api'

export const HelloWorld = (): Block[] =>
  JSXSlack(
    <Blocks>
      <Section>
        <Mrkdwn raw verbatim>
          ざぁこ :heart: ざこエンジニア :heart
        </Mrkdwn>
      </Section>
    </Blocks>
  )

export const SimpleTextBlock = ({ s }: { s: string }): Block[] =>
  JSXSlack(
    <Blocks>
      <Section>
        <b>{s}</b>
      </Section>
    </Blocks>
  )

export const HomeTabBlock = (): View =>
  JSXSlack(
    <Home>
      <Section>ざぁこ :heart: ざこエンジニア :heart:</Section>
    </Home>
  )

type DialogueEngineer = {
  object: string
  complement: string
}

export const HelloEngineer = ({
  userId,
  dialogues,
  text,
}: {
  userId: string
  dialogues: DialogueEngineer[]
  text: string
}): Block[] => {
  const prefix = [`ざぁこ :heart: ざこエンジニア`]
  const suffix = text !== '' ? [`\n\`${text}\` って何？ｗ ウケる`] : []
  const separator = ' :heart: \n'
  const msg = prefix
    .concat(dialogues.map((x) => x.object + x.complement))
    .concat(suffix)
    .concat([''])
    .join(separator)
  return JSXSlack(
    <Blocks>
      <Section>
        <Mrkdwn raw verbatim>
          {`<@${userId}> ` + msg}
        </Mrkdwn>
      </Section>
    </Blocks>
  )
}

type DialogueDarkSider = {
  s: string
}

export const Hello = ({
  userId,
  target,
  dialogues,
  text,
}: {
  userId: string
  target: string
  dialogues: DialogueDarkSider[]
  text: string
}): Block[] => {
  const prefix = `ざぁこ :heart: ざこ${target} :heart:`
  /* const itsumono = ['前髪すかすか'] */
  const suffix = text !== '' ? [`\n\`${text}\` って何？ｗ ウケる`] : []
  const separator = ' :heart: \n'
  const msg = dialogues
    .map((x) => x.s)
    /* .concat(itsumono) */
    .concat(suffix)
    .concat([''])
    .join(separator)
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

export const EmojiAddedNotification = ({
  name,
  url,
}: {
  name: string
  url: string
}): Block[] =>
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

export const EmojiRemovedNotification = ({ name }: { name: string }): Block[] =>
  JSXSlack(
    <Blocks>
      <Header>絵文字が削除されました :innocent:</Header>
      <Section>
        <Mrkdwn raw verbatim>{`:heavy_minus_sign: \`:${name}:\``}</Mrkdwn>
      </Section>
    </Blocks>
  )

export const ChannelArchivedNotification = ({
  channelId,
  userId,
}: {
  channelId: string
  userId: string
}): Block[] =>
  JSXSlack(
    <Blocks>
      <Header>Channel Archived :skull:</Header>
      <Section>
        <Mrkdwn
          raw
          verbatim
        >{`channel: <#${channelId}>, by: <@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )

export const ChannelCreatedNotification = ({
  channelId,
  userId,
}: {
  channelId: string
  userId: string
}): Block[] =>
  JSXSlack(
    <Blocks>
      <Header>Channel Created :baby:</Header>
      <Section>
        <Mrkdwn
          raw
          verbatim
        >{`channel: <#${channelId}>, by: <@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )

export const ChannelDeletedNotification = ({
  channelName,
}: {
  channelName: string
}): Block[] =>
  JSXSlack(
    <Blocks>
      <Header>Channel Deleted :cop:</Header>
      <Section>
        <Mrkdwn
          raw
          verbatim
        >{`channel: <#${channelName}>, by: *admin*`}</Mrkdwn>
      </Section>
    </Blocks>
  )

export const ChannelRenamedNotification = ({
  channelId,
}: {
  channelId: string
}): Block[] =>
  JSXSlack(
    <Blocks>
      <Header>Channel Renamed :writing_hand:</Header>
      <Section>
        <Mrkdwn raw verbatim>{`channel: <#${channelId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )

export const ChannelUnarchivedNotification = ({
  channelId,
  userId,
}: {
  channelId: string
  userId: string
}): Block[] =>
  JSXSlack(
    <Blocks>
      <Header>Channel Unarchived :zombie:</Header>
      <Section>
        <Mrkdwn
          raw
          verbatim
        >{`channel: <#${channelId}>, by: <@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )

export const MemberJoinedNotification = ({
  userId,
}: {
  userId: string
}): Block[] =>
  JSXSlack(
    <Blocks>
      <Header>Welcome :hugging_face:</Header>
      <Section>
        <Mrkdwn raw verbatim>{`<@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )

export const MemberLeftNotification = ({
  userId,
}: {
  userId: string
}): Block[] =>
  JSXSlack(
    <Blocks>
      <Header>さよなら〜 :sob:</Header>
      <Section>
        <Mrkdwn raw verbatim>{`<@${userId}>`}</Mrkdwn>
      </Section>
    </Blocks>
  )

export const HelloView = (): View =>
  JSXSlack(
    <Modal title="hello">
      <Header>aaa</Header>
      <Section>bbb</Section>
    </Modal>
  )

export const SelfIntroduceView = (): View =>
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
