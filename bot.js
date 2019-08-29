const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {
    polling: true
});
const gojec = require('./gojec.js')


// YOUR CODE STARTS HERE
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
        ;(async () => {
            try {
                return await gojec.doStuff(nomer)
            } catch (e) { 
            }
        })();
        bot.sendMessage(msg.chat.id, send);
    }

});
