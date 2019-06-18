const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN; 
const bot = new TelegramBot(token, {polling: true});

// YOUR CODE STARTS HERE
bot.on('message', (msg) => {
    const name = msg.from.first_name;
    bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(() => {
    console.log(msg);
    });
  });