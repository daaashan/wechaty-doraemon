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
            if (!keyword) {
                return msg.say('虚拟币价查询\n例如发送：币 btc\n批量查询：币 btc eth\n')
            }
            const {
                data
            } = await api.get('coin/feixiaohao', {
                params: {
                    keyword
                }
            })
            if (data.length) {
                let res = ''
                data.forEach(({ coin_info, markets }: any) => {
                    res += `${res ? '\n\n' : ''}${coin_info.symbol}(${coin_info.coincode})/USDT\n`
                    res += markets.map((m: any) => `${m.price} - ${m.name}`).join('\n')
                })
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
