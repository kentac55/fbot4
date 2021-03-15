import { Controller } from '../type'
import { ViewSubmissionBody } from '../../event'
import { Ad, DSM, Hello } from '../../view/msg'
import { QuizInterval } from '../../view/modal'
import { getUniqueElems, sleep, shuffle } from '../../util'

export const ViewSubmissionController: Controller<ViewSubmissionBody> = async ({
  body,
  defaults,
  logger,
  webClient,
}) => {
  const { text, channel } = defaults
  logger.debug(body)
  switch (body.view.external_id) {
    case 'DSM': {
      await webClient.chat.postMessage({
        channel:
          body.view.state.values.dsmConvSelect.dsmConvAction
            .selected_conversation,
        text,
        blocks: DSM({
          users: shuffle(
            body.view.state.values.dsmSelect.dsmSelectAction.selected_options.map(
              (x) => x.text.text
            )
          ),
        }),
      })
      break
    }
    case 'hello': {
      await webClient.chat.postMessage({
        channel,
        text,
        blocks: Hello({
          userId: body.user.id,
          target:
            body.view.state.values.helloPick.helloPickAction.selected_option
              .value || 'help',
          pick: (arr: string[]) => getUniqueElems(arr, 5),
        }),
      })
      break
    }
    case 'ad': {
      await webClient.chat.postMessage({
        channel: body.view.state.values.conv.select.selected_conversation,
        text,
        blocks: Ad(),
      })
      break
    }
    case 'thinking': {
      // どうしようもない
      await sleep(1000)
      await webClient.views.open({
        trigger_id: body.trigger_id,
        view: QuizInterval({
          meta: body.view.state.values.quizSelect.quizAction.selected_options
            .map((o) => o.text.text)
            .join(','),
        }),
      })
      break
    }
    default: {
      logger.warn(body)
      const _: never = body.view
      return _
    }
  }
}
