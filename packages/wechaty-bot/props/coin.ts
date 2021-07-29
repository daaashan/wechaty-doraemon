import { log } from 'wechaty'
import { api } from '../api'
import { Prop } from '../doraemon'

const coin = new Prop({
    name: '虚拟币价查询',
    keyword(text) {
        return text.startsWith('币')
    },
    async trigger(msg, text) {
        try {
            const keyword = text.replace('币', '').trim().toLocaleUpperCase()
            const {
                data: { coin_info, markets }
            } = await api.get('coin/feixiaohao', {
                params: {
                    keyword
                }
            })
            if (markets.length) {
                let res = `${coin_info.symbol}(${coin_info.coincode})/USDT\n`
                res += markets.map((m: any) => `${m.price} - ${m.name}`).join('\n')
                await msg.say(res)
            } else {
                await msg.say('没有查到相关信息呢～')
            }
        } catch (error) {
            const errmsg = error.response.data.message
            log.error(errmsg)
            await msg.say(errmsg)
        }
    }
})

export { coin }
