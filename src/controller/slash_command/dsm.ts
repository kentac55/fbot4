import { Controller } from '../type'
import { SlashCommandBody } from '../../event'
import { DSM } from '../../view/msg'
import { shuffle } from '../../util'

export const DSMController: Controller<SlashCommandBody> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    channel: body.channel_id,
    text: defaults.text,
    blocks: DSM({
      users: shuffle(body.text.split(',').map((x) => x.trim())),
    }),
  })
}
