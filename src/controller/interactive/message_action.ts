import { Controller } from '../type'
import { MessageActionBody } from '../../event'
import { Undeletable } from '../../view/modal'

export const MessageActionController: Controller<MessageActionBody> = async ({
  body,
  logger,
  webClient,
}) => {
  switch (body.callback_id) {
    case 'bomb': {
      if (body.message.bot_profile?.name === 'fbot4') {
        await webClient.chat.delete({
          channel: body.channel.id,
          ts: body.message.ts,
        })
      } else {
        await webClient.views.open({
          trigger_id: body.trigger_id,
          view: Undeletable(),
        })
      }
      break
    }
    default: {
      logger.warn(`unregistered message action: ${body.callback_id}`)
      logger.debug(body)
    }
  }
}
