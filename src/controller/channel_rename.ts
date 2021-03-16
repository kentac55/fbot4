import { Controller } from './type'
import { ChannelRenameEvent } from '../event'
import { ChannelRename } from '../view/msg'

export const ChannelRenameController: Controller<ChannelRenameEvent> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    attachments: [
      {
        blocks: ChannelRename({
          channelId: body.channel.id,
        }),
        color: '#00ff00',
        fallback: defaults.text,
      },
    ],
    channel: defaults.channel,
    text: '',
  })
}
