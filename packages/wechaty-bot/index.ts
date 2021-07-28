import { Contact, Message, ScanStatus, Wechaty, log } from 'wechaty'

import { generate } from 'qrcode-terminal'

import { Doraemon } from './doraemon'
import { dingdong, weather, coin, medal, help } from './props'

const doraemon = new Doraemon({
    botName: 'bot'
})

doraemon.addProp(dingdong)
doraemon.addProp(weather)
doraemon.addProp(coin)
doraemon.addProp(medal)
doraemon.addProp(help)

function onScan(qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        generate(qrcode, { small: true }) // show qrcode on console

        const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join('')

        log.info('doraemon', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
    } else {
        log.info('doraemon', 'onScan: %s(%s)', ScanStatus[status], status)
    }
}

function onLogin(user: Contact) {
    log.info('doraemon', '%s login', user)
}

function onLogout(user: Contact) {
    log.info('doraemon', '%s logout', user)
}

const bot = new Wechaty({
    name: 'doraemon',
    puppet: 'wechaty-puppet-wechat'
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', async (msg: Message) => {
    await doraemon.onMessage(msg)
})

bot.start()
    .then(() => log.info('doraemon', 'Starter Bot Started.'))
    .catch(e => log.error('doraemon', e))
