const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {
    polling: true
});
const gojec = require('./gojec.js')

const StartKeyboard = [
    ['/gojec'],
    ['/info']
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
    bot.sendMessage(msg.chat.id, `Hii`, opts);
});


bot.onText(/\/gojec/, (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id
    };
    bot.sendMessage(msg.chat.id, `Number? (62849#####):`, opts);
    resmessage();
});

// Functions
var getmessage = async () => {
    await new Promise((resolve, reject) => {
        bot.once('message', (msg) => {
            console.log("Number: " + msg.text)
            const opts = {
                reply_to_message_id: msg.message_id,
            };
            bot.sendMessage(msg.chat.id, 'Thanks, Your Request Received', opts);
            resolve(true);
            send_gojec(msg.text);
        });
    });
    return
}

var resmessage = async () => {
    await getmessage();
}


var send_gojec = async (nomer) => {
    var send = await gojec.doStuff(nomer);
    if(!send.success){
        bot.once('message', (msg) => {
            bot.sendMessage(msg.chat.id, send);
        });
    }
    //var nomer = text.split(' ').splice(1).join(' ');
}


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

});