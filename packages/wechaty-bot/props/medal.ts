import { api } from '../api'
import { Prop } from '../doraemon'
const indexs = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']

const medal = new Prop({
    name: '东京奥运奖牌榜',
    keyword(text): string | boolean {
        return text === '奖牌榜'
    },
    async trigger(msg) {
        try {
            const {
                data: {
                    data: { medalsList }
                }
            } = await api.get(
                'https://api.cntv.cn/olympic/getOlyMedals?serviceId=pcocean&itemcode=GEN-------------------------------'
            )
            let str = '东京奥运奖牌榜(TOP10)\n中国加油！🇨🇳\n'
            str += medalsList
                .map(
                    (m, index) =>
                        `${indexs[index]} ${m.countryname.replace('奥运队', '')} 🥇${m.gold} 🥈${m.silver} 🥉${
                            m.bronze
                        } 🎉${m.count}`
                )
                .splice(0, 10)
                .join('\n')
            await msg.say(str)
        } catch (error) {
            await msg.say('服务不可用')
        }
    }
})

export { medal }
