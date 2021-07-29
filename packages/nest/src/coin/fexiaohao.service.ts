import { Injectable, InternalServerErrorException } from '@nestjs/common'
import axios from 'axios'

import { FeixiaohaoCoinCode, FeixiaohaoCoinMarketTicker, FeixiaohaoMarketTicker } from './entities/feixiaohao.entity'

@Injectable()
export class FeixiaohaoService {
    async getCoinMarketTicker(keyword: string): Promise<FeixiaohaoCoinMarketTicker> {
        try {
            const { coinlist } = await this.getCoinCode(keyword)
            if (!coinlist.length) {
                throw new Error('未搜索到相关虚拟币信息')
            }
            const coin_info = coinlist[0]
            const res = await this.getMarketTicker(coin_info.coincode)
            return {
                coin_info,
                ...res
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async getCoinCode(keyword: string): Promise<FeixiaohaoCoinCode> {
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
            return { coinlist }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async getMarketTicker(code: string): Promise<FeixiaohaoMarketTicker> {
        try {
            const {
                data: {
                    data: { markets },
                    code: status,
                    msg
                }
            } = await axios.get('https://dncapi.bqrank.net/api/v2/Coin/market_ticker', {
                params: {
                    code,
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
            return { markets }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
