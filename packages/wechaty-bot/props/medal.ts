import { api } from '../api'
import { Prop } from '../doraemon'
const indexs = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']

interface MEDALS_LIST {
    countryname: string
    gold: number
    silver: number
    bronze: number
    count: number
}

const keywords =  ['奖牌榜', '金牌榜', '奥运奖牌榜', '奥运金牌榜']

const medal = new Prop({
    name: '东京奥运奖牌榜',
    keyword(text) {
        return keywords.includes(text)
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
            str += (medalsList as Array<MEDALS_LIST>)
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
