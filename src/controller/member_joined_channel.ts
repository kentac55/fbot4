import { Controller } from './type'
import { MemberJoinedChannelEvent } from '../event'
import { HelloWorld, MemberJoined } from '../view/msg'

export const MemberJoinedChannelController: Controller<MemberJoinedChannelEvent> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  const self = (await webClient.auth.test()) as {
    ok: boolean
    url: string
    user: string
    team_id: string
    user_id: string
  }

  await webClient.chat.postMessage({
    channel: body.channel,
    text: '',
    attachments: [
      body.user === self.user_id
        ? {
            blocks: HelloWorld(),
            color: '#ff8000',
            fallback: defaults.text,
          }
        : {
            blocks: MemberJoined({ userId: body.user }),
            color: '#00ff00',
            fallback: defaults.text,
          },
    ],
  })
}
