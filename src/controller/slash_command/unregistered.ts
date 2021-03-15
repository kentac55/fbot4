import { Controller } from '../type'
import { SlashCommandBody } from '../../event'
import { UnregisteredCommand } from '../../view/msg'

export const UnregisteredController: Controller<SlashCommandBody> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    channel: body.channel_id,
    text: defaults.text,
    blocks: UnregisteredCommand({
      command: body.command,
    }),
  })
}
