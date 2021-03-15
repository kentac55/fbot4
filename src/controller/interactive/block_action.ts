import { Controller } from '../type'
import { BlockActionsBody } from '../../event'
import { QuizMain, QuizAnswer } from '../../view/modal'

export const BlockActionsController: Controller<BlockActionsBody> = async ({
  body,
  logger,
  webClient,
}) => {
  logger.debug(body)
  body.actions.forEach(async (action) => {
    switch (action.action_id) {
      case 'ktkr': {
        await webClient.views.open({
          trigger_id: body.trigger_id,
          view: QuizMain(),
        })
        break
      }
      case 'getResultAction': {
        await webClient.views.update({
          external_id: body.view.external_id,
          view: QuizAnswer({
            ans: body.view.private_metadata?.split(',') ?? [],
          }),
        })
        break
      }
      default: {
        logger.warn(`unregistered: ${action.action_id}`)
        // TODO: exhaustive type checking
        // const _: never = action.action_id
        // return _
      }
    }
  })
}
