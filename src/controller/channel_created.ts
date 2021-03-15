import { Controller } from './type'
import { ChannelCreatedEvent } from '../event'
import { ChannelCreated } from '../view/msg'

export const ChannelCreatedController: Controller<ChannelCreatedEvent> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    attachments: [
      {
        blocks: ChannelCreated({
          channelId: body.channel.id,
          userId: body.channel.creator,
        }),
        color: '#00ff00',
        fallback: defaults.text,
      },
    ],
    channel: defaults.channel,
  })
}
