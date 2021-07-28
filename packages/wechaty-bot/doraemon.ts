import { Message, log } from 'wechaty'

interface DoraemonConfig {
    /**
     * 机器人名字
     * @todo 当前无法通过 mentionSelf 方法判断是否@机器人
     * */
    botName: string
}

class Doraemon {
    props: Prop[] = []
    config: DoraemonConfig
    mentionBotName: string

    constructor(conf: DoraemonConfig) {
        this.config = conf
        this.mentionBotName = `@${conf.botName}`
    }

    async onMessage(msg: Message) {
        // 不是 @机器人 的消息不处理
        if (!this.mentionSelf(msg)) return

        // 获取具体的消息文本
        const text = this.mentionText(msg)

        // 根据消息文本获取匹配的 prop
        const prop = this.findProp(text)
        if (!prop) return

        await prop.trigger(msg, text)
    }

    /**
     * 添加工具
     * */
    addProp(prop: Prop) {
        this.props.push(prop)
    }

    findProp(text: string): undefined | Prop {
        const prop = this.props.find(({ keyword }) => keyword(text))
        if (prop) log.info('doraemon', 'findProp: %s(%s)', prop.name, text)
        return prop
    }

    mentionSelf(msg: Message): boolean {
        return msg.text().startsWith(this.mentionBotName)
    }

    mentionText(msg: Message): string {
        return msg.text().replace(this.mentionBotName, '').trim()
    }
}

interface PropConfig {
    /**
     * 功能名称
     * */
    name: string
    /**
     * 匹配关键字
     * */
    keyword: (text: string) => boolean
    /**
     * 触发方法
     * */
    trigger: (msg: Message, text: string) => {}
}

/**
 * 工具
 * */
class Prop {
    name: string
    keyword: PropConfig['keyword']
    trigger: PropConfig['trigger']

    /**
     * 添加功能
     * */
    constructor(conf: PropConfig) {
        this.name = conf.name
        this.keyword = conf.keyword
        this.trigger = conf.trigger
    }
}

export { Doraemon, Prop }
