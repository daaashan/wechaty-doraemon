import { api } from '../api'
import { Prop } from '../doraemon'

const coin = new Prop({
    name: '虚拟币价查询',
    keyword(text): string | boolean {
        if (!text.startsWith('币')) return false
        return text.replace('币', '').trim()
    },
    async trigger(msg, text) {
        try {
            const baseSymbol = this.keyword(text).toLocaleUpperCase()
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
            str += data.map(m => `${Number(m.priceQuote)} - ${m.exchangeId}`).join('\n')
            await msg.say(str)
        } catch (error) {
            await msg.say('服务不可用')
        }
    }
})

export { coin }
