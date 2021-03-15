import { Controller } from '../type'
import { SlashCommandBody } from '../../event'
import { Hello } from '../../view/msg'
import { getUniqueElems } from '../../util'

export const HelloController: Controller<SlashCommandBody> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.chat.postMessage({
    channel: body.channel_id,
    text: defaults.text,
    blocks: Hello({
      userId: body.user_id,
      target: body.text,
      pick: (arr: string[]) => getUniqueElems(arr, 5),
    }),
  })
}
