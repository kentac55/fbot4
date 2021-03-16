import { Controller } from './type'
import { ChannelUnarchiveEvent } from '../event'
import { ChannelUnarchive } from '../view/msg'

export const ChannelUnarchiveController: Controller<ChannelUnarchiveEvent> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    attachments: [
      {
        blocks: ChannelUnarchive({
          channelId: body.channel,
          userId: body.user,
        }),
        color: '#00ff00',
        fallback: defaults.text,
      },
    ],
    channel: defaults.channel,
    text: '',
  })
}
