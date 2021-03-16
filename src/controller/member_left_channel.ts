import { Controller } from './type'
import { MemberLeftChannelEvent } from '../event'
import { MemberLeft } from '../view/msg'

export const MemberLeftChannelController: Controller<MemberLeftChannelEvent> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    attachments: [
      {
        blocks: MemberLeft({
          userId: body.user,
        }),
        color: '#ffff00',
        fallback: defaults.text,
      },
    ],
    channel: defaults.channel,
    text: '',
  })
}
