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

export class FeixiaohaoMarketTicker {
    /**
     * 市场信息
     */
    markets: Market[]
}

export class FeixiaohaoCoinInfo {
    coincode: string

    coinname: string

    symbol: string
}

export class FeixiaohaoCoinCode {
    coinlist: FeixiaohaoCoinInfo[]
}

export class FeixiaohaoCoinMarketTicker extends FeixiaohaoMarketTicker {
    coin_info: FeixiaohaoCoinInfo
}
