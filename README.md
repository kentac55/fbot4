# fbot4

```sh
docker build . -t fbot4
docker run --rm -d --name fbot4 -e SLACK_APP_TOKEN=$SLACK_APP_TOKEN -e SLACK_BOT_TOKEN=$SLACK_BOT_TOKEN -e SLACK_DEFAULT_CHANNEL=$SLACK_DEFAULT_CHANNEL fbot4
```