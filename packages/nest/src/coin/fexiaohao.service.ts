import { Injectable, InternalServerErrorException } from '@nestjs/common'
import axios from 'axios'

import { FeixiaohaoCoinInfo, FeixiaohaoCoinMarketTicker } from './entities/feixiaohao.entity'

const exchangeCodes = ['huobipro', 'binance', 'okex', 'coinbasepro', 'mexc']

const codeCache: Map<string, FeixiaohaoCoinInfo> = new Map()

function setCodeCache(...args: [string, FeixiaohaoCoinInfo]) {
    codeCache.set(...args)
    if (codeCache.size < 31) return
    codeCache.delete(Array.from(codeCache.keys())[0])
}

@Injectable()
export class FeixiaohaoService {
    async getCoinMarketTicker(keyword: string): Promise<FeixiaohaoCoinMarketTicker[]> {
        try {
            const keys = keyword.trim().split(' ')
            keys.length = 5
            const coinInfos = await Promise.all(keys.map(key => this.getCoinCodeOne(key)))
            const res = await Promise.all(coinInfos.filter(f => f).map(info => this.getMarketTicker(info)))
            return res
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async getCoinCode(keyword: string): Promise<FeixiaohaoCoinInfo[]> {
        try {
            const {
                data: { coinlist, code, msg }
            } = await axios.get('https://dncapi.bqrank.net/api/search/websearch', {
                params: {
                    code: keyword,
                    page: 1,
                    exchange_page: 1,
                    wallet_page: 1,
                    pagesize: 3,
                    token: '',
                    webp: 1
                }
            })
            if (code !== 200) {
                throw new Error(msg)
            }
            return coinlist
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async getCoinCodeOne(keyword: string): Promise<FeixiaohaoCoinInfo> {
        try {
            // 先从缓存中获取
            let coinInfo = codeCache.get(keyword)
            if (coinInfo) return coinInfo

            const coinlist = await this.getCoinCode(keyword)
            if (coinlist.length) {
                coinInfo = coinlist[0]
                setCodeCache(keyword, coinInfo)
                return coinInfo
            }
            return null
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async getMarketTicker(coin_info: FeixiaohaoCoinInfo): Promise<FeixiaohaoCoinMarketTicker> {
        try {
            const {
                data: {
                    data: { markets },
                    code: status,
                    msg
                }
            } = await axios.get('https://dncapi.bqrank.net/api/v2/Coin/market_ticker', {
                params: {
                    code: coin_info.coincode,
                    page: 1,
                    pagesize: 10,
                    tickertype: 0,
                    pair2: 'usdt',
                    webp: 1
                }
            })
            if (status !== 200) {
                throw new Error(msg)
            }
            return {
                coin_info,
                markets: markets
                    .filter(f => exchangeCodes.includes(f.exchange_code))
                    .sort((m, n) => exchangeCodes.indexOf(m.exchange_code) - exchangeCodes.indexOf(n.exchange_code))
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
