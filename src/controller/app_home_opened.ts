import { Controller } from './type'
import { AppHomeOpenedEvent } from '../event'
import { AppHome } from '../view/Home'

export const AppHomeOpendController: Controller<AppHomeOpenedEvent> = async ({
  body,
  logger,
  webClient,
}) => {
  logger.debug(body)
  await webClient.views.publish({
    user_id: body.user,
    view: AppHome({ userId: body.user }),
  })
}
