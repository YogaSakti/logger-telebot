const TelegramBot = require('node-telegram-bot-api');
const token = '648797348:AAFw_qt1pSTqHv6mQeG5sdTBaG0ith6CWE0';
const bot = new TelegramBot(token, { polling: true });
const gojec = require('./helper/gojec.js')
const message = require('./helper/gojec.js')

const StartKeyboard = [
    ['/SendSaldo'],
    ['/CekAkun'],
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

bot.on('message', async (msg) => {
    const text = msg.text
    if (text == '/info') {
        var info = 'Chat info: ' + msg;
        console.log(msg)
        bot.sendMessage(msg.chat.id, JSON.parse(info));
    } else if (text == '/CekAkun') {
        var Saldo = await gojec.cekAkun()
        console.log(Saldo)
        bot.sendMessage(msg.chat.id, `Owner: ${Saldo.data.name}\nNumber: ${Saldo.data.mobile}\nSisa Saldo: ${Saldo.data.currency} ${Saldo.data.balance}\nAkun Locked?: ${Saldo.data.locked}`);
    } else if (text == '/SendSaldo') {
        const opts = {
            reply_to_message_id: msg.message_id
        };
        bot.sendMessage(msg.chat.id, `Nomer? (Awali dengan 62/1):`, opts);
        bot.once('message', async (msg) => {
            var raw = msg.text;
            var res = raw.split(" ");
            console.log("Send to: " + res[0])
            bot.sendMessage(msg.chat.id, 'Thanks, your request has been received', {reply_to_message_id: msg.message_id});
            var nomer = res[0]
            var nominal = res[1]
            console.log("1" + raw)
            console.log("2" + res)
            console.log("3" + nomer)
            console.log("4" + nominal)
            if (res.length == 2) {
                const kirim = await gojec.tfCustom(nomer, nominal);
                if (!kirim) {
                    bot.sendMessage(msg.chat.id, `Kirim Saldo ke ${nomer}\nJumlah: ${nominal}\nStatus: Failed`);
                } else {
                    const suc = `Kirim Saldo ke ${nomer}\nJumlah: ${nominal}\nStatus: ${kirim.success}\nTrxId: ${kirim.data.transaction_ref}`
                    bot.sendMessage(msg.chat.id, suc);
                }
                await lapor(msg.from, nomer, kirim.success, nominal)
            } else {
                const kirim = await gojec.doStuff(nomer);
                if (!kirim) {
                    bot.sendMessage(msg.chat.id, `Kirim Saldo ke ${nomer}\nStatus: Failed`);
                } else {
                    const suc = `Kirim Saldo ke ${nomer}\nStatus: ${kirim.success}\nTrxId: ${kirim.data.transaction_ref}`
                    bot.sendMessage(msg.chat.id, suc);
                }
                await lapor(msg.from, nomer, kirim.success)
            }
        });
    }
});

const lapor = async (from, nomor, status, nominal) => {
    if (nominal == undefined) {
        bot.sendMessage(-1001334966211, `Request Saldo Oleh (${from.id}-${from.username})|${from.first_name} ${from.last_name}\nKe ${nomor}\nStatus: ${status}`)
    }else{
        bot.sendMessage(-1001334966211, `Request Saldo Oleh (${from.id}-${from.username})|${from.first_name} ${from.last_name}\nKe ${nomor}\nJumlah: ${nominal}\nStatus: ${status}`)
    }
}

process.on('uncaughtException', function (error) {
    console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});

process.on('unhandledRejection', function (error) {
    console.log("\x1b[31m", "Rejection: ", error.message, "\x1b[0m");
});