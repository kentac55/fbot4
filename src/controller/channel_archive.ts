import { Controller } from './type'
import { ChannelArchiveEvent } from '../event'
import { ChannelArchive } from '../view/msg'

export const ChannelArchiveController: Controller<ChannelArchiveEvent> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    attachments: [
      {
        blocks: ChannelArchive({
          channelId: body.channel,
          userId: body.user,
        }),
        color: '#ffff00',
        fallback: defaults.text,
      },
    ],
    channel: defaults.channel,
  })
}
