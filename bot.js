const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN; 
const bot = new TelegramBot(token, {polling: true});

// YOUR CODE STARTS HERE
bot.on('message', (msg) => {
    if (msg.text == '/info'){
        var info = 'Chat id: '+msg.chat.id +' Sender: ' + msg.from.username;
        bot.sendMessage(msg.chat.id, info);
    }
  });