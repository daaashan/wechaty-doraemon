export class Market {
    /**
     * 虚拟币 code
     * @example bitcoin
     */
    coin_code: string
    /**
     * 平台
     * @example binance
     */
    exchange_code: string
    /**
     * 价格/usdt
     * @example 39673.78
     */
    price: number
}

export class FeixiaohaoCoinInfo {
    /**
     * 虚拟币 code
     * @example bitcoin
     */
    coincode: string

    /**
     * 虚拟币 name
     * @example Bitcoin
     */
    coinname: string

    /**
     * 虚拟币代号
     * @example BTC
     */
    symbol: string
}

export class FeixiaohaoCoinMarketTicker {
    /**
     * 虚拟币基本信息
     */
    coin_info: FeixiaohaoCoinInfo

    /**
     * 虚拟币市场信息
     */
    markets: Market[]
}
