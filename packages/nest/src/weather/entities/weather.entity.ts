export class Location {
    /**
     * 区域 id
     * @example 110100
     */
    id: string

    /**
     * 名称
     * @example 北京
     */
    name: string

    /**
     * 国家
     * @example 中国
     */
    country: string

    /**
     * 省份
     * @example 北京市
     */
    province: string

    /**
     * 城市
     * @example 北京市
     */
    city: string
}

export class Now {
    /**
     * 天气
     * @example 小雨
     */
    text: string

    /**
     * 当前温度
     * @example 29
     */
    temp: number

    /**
     * 体感温度
     * @example 37
     */
    feels_like: number

    /**
     * 相对湿度
     * @example 75
     */
    rh: number

    /**
     * 风力等级
     * @example 0级
     */
    wind_class: string

    /**
     * 风向
     * @example 东北风
     */
    wind_dir: string

    /**
     * 更新时间戳
     * @example 20210713172500
     */
    uptime: string
}

export class Forecast {
    /**
     * 天气
     * @example 雷阵雨
     */
    text_day: string

    /**
     * 夜间天气
     * @example 多云
     */
    text_night: string

    /**
     * 最高温度
     * @example 30
     */
    high: number

    /**
     * 最低温度
     * @example 24
     */
    low: number

    /**
     * 风力等级
     * @example <3级
     */
    wc_day: string

    /**
     * 风向
     * @example 西风
     */
    wd_day: string

    /**
     * 夜间风力等级
     * @example <3级
     */
    wc_night: string

    /**
     * 夜间风向
     * @example 东南风
     */
    wd_night: string

    /**
     * 日期
     * @example 13
     */
    date: string

    /**
     * 星期
     * @example 星期二
     */
    week: string
}

export class Weather {
    /**
     * 地理信息
     */
    location: Location

    /**
     * 今日天气信息
     */
    now: Now

    /**
     * 未来7天天气信息
     */
    forecasts: Forecast[]
}
