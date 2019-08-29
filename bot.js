const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {
    polling: true
});
const gojec = require('./gojec.js')
const delay = require('delay')

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
const getmessage = async () => {
    await new Promise((resolve, reject) => {
        bot.once('message', (msg) => {
            console.log("Number: " + msg.text)
            const kirim = send_gojec(msg.text);
            const opts = {
                reply_to_message_id: msg.message_id
            };
            bot.sendMessage(msg.chat.id, 'Thanks, Your Request Received', opts);
            if (!kirim) {
                bot.sendMessage(msg.chat.id, `Send RP1 to ${msg.text}\nStatus: Failed`);
            } else {
                const suc = `Send RP1 to ${msg.text}\nStatus: ${kirim.sucess}\nTrxId: ${kirim.data.transaction_ref}`
                bot.sendMessage(msg.chat.id, suc);
            }

            resolve(true);
        });
    });
    return
}

const resmessage = async () => {
    await getmessage();
}

const send_gojec = async (nomer) => {
    const send = await gojec.doStuff(nomer);
    return send
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