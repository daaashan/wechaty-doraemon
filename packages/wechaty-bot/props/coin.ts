import { api } from '../api'
import { Prop } from '../doraemon'

const coin = new Prop({
    name: '虚拟币价查询',
    keyword(text) {
        return text.startsWith('币')
    },
    async trigger(msg, text) {
        try {
            const baseSymbol = text.replace('币', '').trim().toLocaleUpperCase()
            const {
                data: { data }
            } = await api.get('https://api.coincap.io/v2/markets', {
                params: {
                    baseSymbol,
                    quoteSymbol: 'USDT',
                    exchangeId: ['huobi', 'binance']
                }
            })
            let str = `${baseSymbol}/USDT\n`
            str += data.map((m: any) => `${Number(m.priceQuote)} - ${m.exchangeId}`).join('\n')
            await msg.say(str)
        } catch (error) {
            await msg.say('服务不可用')
        }
    }
})

export { coin }
