import { Controller } from './type'
import { ChannelDeletedEvent } from '../event'
import { ChannelDeleted } from '../view/msg'

export const ChannelDeletedController: Controller<ChannelDeletedEvent> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    attachments: [
      {
        blocks: ChannelDeleted({
          channelName: body.channel,
        }),
        color: '#ff0000',
        fallback: defaults.text,
      },
    ],
    channel: defaults.text,
  })
}
