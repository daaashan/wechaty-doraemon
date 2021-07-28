import { api } from '../api'
import { Prop } from '../doraemon'

const weather = new Prop({
    name: '天气查询',
    keyword(text) {
        return text.endsWith('天气')
    },
    async trigger(msg, text) {
        try {
            const {
                data: { location, now }
            } = await api.get('weather', {
                params: {
                    city: text.replace('天气', '')
                }
            })
            await msg.say(`${location.city}：${now.text} ${now.feels_like}°C`)
        } catch (error) {
            await msg.say('服务不可用')
        }
    }
})

export { weather }
