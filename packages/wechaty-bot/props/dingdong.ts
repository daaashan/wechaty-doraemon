import { Prop } from '../doraemon'

const dingdong = new Prop({
    name: '叮咚一下',
    keyword: 'ding',
    async trigger(msg) {
        await msg.say('dong')
    }
})

export { dingdong }
