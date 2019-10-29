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
            resize_keyboard: true
        })
    };
    bot.sendMessage(msg.chat.id, `Hi, How are u?`, opts);
});

bot.onText(/\/gojec/, async (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id
    };
    bot.sendMessage(msg.chat.id, `Number? (Awali dengan 62/1):`, opts);
    await ProcGojec();
});

const ProcGojec = async () => {
    await new Promise((resolve, reject) => {
        bot.once('message', async (msg) => {
            console.log("Send to: " + msg.text)
            const opts = {
                reply_to_message_id: msg.message_id
            };
            bot.sendMessage(msg.chat.id, 'Thanks, your request has been received', opts);
            var nomor = msg.text;
            const kirim = await gojec.doStuff(nomor);
            if (!kirim) {
                bot.sendMessage(msg.chat.id, `Send Saldo to ${msg.text}\nStatus: Failed`);
            } else {
                const suc = `Send Saldo to ${msg.text}\nStatus: ${kirim.success}\nTrxId: ${kirim.data.transaction_ref}`
                bot.sendMessage(msg.chat.id, suc);
            }
            await lapor(msg.from, nomor, kirim.success)
            resolve(true);
        });
    });
    return
}

bot.on('message', (msg) => {
    const text = msg.text
    if (text == '/info') {
        var info = 'Chat id: ' + msg.chat.id + ' Sender: ' + msg.from.username;
        console.log(msg)
        bot.sendMessage(msg.chat.id, info);
    }
});

const lapor = async (from, nomor, status) => {
    bot.sendMessage(-1001334966211, `Pengiriman saldo Oleh (${from.id}-${from.username})|${from.first_name} ${from.last_name}\nKe ${nomor}\nStatus: ${status}`)
}

process.on('uncaughtException', function (error) {
    console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});

process.on('unhandledRejection', function (error) {
    console.log("\x1b[31m", "Rejection: ", error.message, "\x1b[0m");
});