import { Controller } from '../type'
import { ShortcutBody } from '../../event'
import { CallStart, DSM, SelfIntroduce, HelloPick } from '../../view/modal'

export const ShortcutController: Controller<ShortcutBody> = async ({
  body,
  logger,
  webClient,
}): Promise<void> => {
  logger.debug(body)
  switch (body.callback_id) {
    case 'hello': {
      await webClient.views.open({
        trigger_id: body.trigger_id,
        view: HelloPick(),
      })
      break
    }
    case 'self_introduce': {
      await webClient.views.open({
        trigger_id: body.trigger_id,
        view: SelfIntroduce(),
      })
      break
    }
    case 'dsm': {
      await webClient.views.open({
        trigger_id: body.trigger_id,
        view: DSM(),
      })
      break
    }
    case 'start': {
      await webClient.views.open({
        trigger_id: body.trigger_id,
        view: CallStart(),
      })
    }
    default: {
      logger.warn(`unregistered callback: ${body.callback_id}`)
    }
  }
}
