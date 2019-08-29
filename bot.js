const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {
    polling: true
});
const gojec = require('./gojec.js')

const StartKeyboard = [
    ['a', 'b'],
    ['Contact Us']
  ]

// YOUR CODE STARTS HERE

bot.onText(/\/start/, (msg) => {
    const opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: StartKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true
      })
    };
    bot.sendMessage(msg.chat.id, `Hello`, opts);
  });



bot.on('message', (msg) => {
    const text = msg.text
    if (text == '/info') {
        var info = 'Chat id: ' + msg.chat.id + ' Sender: ' + msg.from.username;
        bot.sendMessage(msg.chat.id, info);
    }
    if (text == '/login-ig') {
        var info = 'Chat id: ' + msg.chat.id + ' Sender: ' + msg.from.username;
        bot.sendMessage(msg.chat.id, info);
    }

    if (text == '/gojec') {
        var nomer = text.split(' ').splice(1).join(' ');
        //try {
       //     var send = await gojec.doStuff(nomer)
        //} catch (e) {}
        //bot.sendMessage(msg.chat.id, send);
    }

});