# zaruba-bot
 Telegram bot for project Zaruba

## Install
``npm install``

## Config
1. Open config.json
2. Set bot api key instead of API_KEY, specify the Seed phrase and admin id instead of 123456789.

## Run with
node bot.js
or other runing, example:
pm2 start bot.js -o logs/out.log -e logs/errors.log
after npm install pm2 --g