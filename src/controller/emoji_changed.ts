import { Controller } from './type'
import { EmojiEvent } from '../event'
import { EmojiAdded, EmojiRemoved } from '../view/msg'

export const EmojiChangedController: Controller<EmojiEvent> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  logger.debug(body)
  const msgBase = Object.freeze({
    as_user: true,
    link_names: true,
    channel: defaults.channel,
    text: '',
  })
  if (body.subtype === 'add') {
    await webClient.chat.postMessage({
      attachments: [
        {
          blocks: EmojiAdded({
            name: body.name,
            url: body.value,
          }),
          color: '#00ff00',
          fallback: defaults.text,
        },
      ],
      ...msgBase,
    })
  } else if (body.subtype === 'remove') {
    body.names.forEach(
      async (name: string): Promise<void> => {
        await webClient.chat.postMessage({
          attachments: [
            {
              blocks: EmojiRemoved({ name }),
              color: '#ff0000',
              fallback: defaults.text,
            },
          ],
          ...msgBase,
        })
      }
    )
  } else {
    const _: never = body
    new Error(_)
  }
}
