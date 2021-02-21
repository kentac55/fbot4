import {
  Blocks,
  Button,
  Checkbox,
  CheckboxGroup,
  ConversationsSelect,
  DatePicker,
  Divider,
  Header,
  Home,
  Image,
  Input,
  JSXSlack,
  Modal,
  Mrkdwn,
  RadioButton,
  RadioButtonGroup,
  Section,
  TimePicker,
  UsersSelect,
} from '@speee-js/jsx-slack'
import { Block, View } from '@slack/web-api'

export const HelloWorld = (): Block[] =>
  JSXSlack(
    <Blocks>
      <Section>
        <Mrkdwn raw verbatim>
          ざぁこ :heart: ざこエンジニア :heart:
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
      <Header>実験用</Header>
      <Image
        alt="好評発売中"
        title="THE IDOLM@STER MASTER ARTIST 4 07 星井美希(好評発売中)"
        src="https://images-na.ssl-images-amazon.com/images/I/81R3wBOFOyL._AC_SL1500_.jpg"
      />
      <Section>
        section1: `マジで...！？`
        <Image
          alt="好評発売中"
          title="THE IDOLM@STER MASTER ARTIST 4 07 星井美希(好評発売中)"
          src="https://images-na.ssl-images-amazon.com/images/I/81R3wBOFOyL._AC_SL1500_.jpg"
        />
      </Section>
      <Section>
        section2
        <Button actionId="bomb" value="modalA" style="primary">
          押すと寿命が30分短くなるけど3000円降ってくるボタン
        </Button>
      </Section>
      <Section>
        section3: DMを(適量)送りつけます
        <UsersSelect />
      </Section>
      <Section>
        section4: 中にいるユーザーを全員kickします
        <ConversationsSelect />
      </Section>
      <Section>
        section5: 昨日の天気
        <TimePicker />
      </Section>
      <Section>
        section6: 明日の天気
        <DatePicker />
      </Section>
    </Modal>
  )

export const DSMView = (): View =>
  JSXSlack(
    <Modal title="DSM" externalId="DSM">
      <Header>DSM</Header>
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

export const HelloPickView = (): View =>
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
