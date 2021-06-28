const { Wechaty } = require('wechaty')
const QrcodeTerminal = require('qrcode-terminal')

const wechatyBot = async () => {
    const bot = new Wechaty()

    bot.on('scan', (url, code) => {
        console.log(`Scan QR Code to login: ${code}\n${url}`)
        if (!/201|200/.test(String(code))) {
            const loginUrl = url.replace(/\/qrcode\//, '/l/')
            QrcodeTerminal.generate(loginUrl, { small: true })
        }
    })

    bot.on('login', user => console.log(`User ${user} logined`))

    bot.on('message', m => {
        console.log('------------')
        console.log(m)
        console.log('------------')
    })

    await bot.start()
}

wechatyBot().catch(console.error)
