import { Prop } from '../doraemon'

const help = new Prop({
    name: '帮助中心',
    keyword: 'help',
    async trigger(msg) {
        await msg.say(`帮助中心`)
    }
})

export { help }
