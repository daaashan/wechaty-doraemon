import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery, ApiOkResponse } from '@nestjs/swagger'
import { FeixiaohaoService } from './fexiaohao.service'

import { GetCoinCodeDto } from './dto/get-coin-code.dto'
import { GetMarketTickerDto } from './dto/get-market-ticker.dto'

import { FeixiaohaoCoinCode, FeixiaohaoCoinMarketTicker, FeixiaohaoMarketTicker } from './entities/feixiaohao.entity'

@ApiTags('coin/feixiaohao')
@Controller('coin/feixiaohao')
export class FeixiaohaoController {
    constructor(private feixiaohaoService: FeixiaohaoService) {}

    @Get()
    @ApiOperation({
        summary: '获取非小号虚拟币信息'
    })
    @ApiQuery({ name: 'keyword', description: '虚拟币名称', example: 'btc' })
    @ApiOkResponse({ type: FeixiaohaoMarketTicker })
    async get(@Query() query: GetCoinCodeDto): Promise<FeixiaohaoCoinMarketTicker> {
        return await this.feixiaohaoService.getCoinMarketTicker(query.keyword)
    }

    @Get('search_code')
    @ApiOperation({
        summary: '搜索虚拟币 code'
    })
    @ApiQuery({ name: 'keyword', description: '虚拟币名称', example: 'btc' })
    @ApiOkResponse({ type: FeixiaohaoCoinCode })
    async search(@Query() query: GetCoinCodeDto): Promise<FeixiaohaoCoinCode> {
        return await this.feixiaohaoService.getCoinCode(query.keyword)
    }

    @Get('market_ticker')
    @ApiOperation({
        summary: '获取市场行情信息'
    })
    @ApiQuery({ name: 'code', description: '虚拟币 code', example: 'bitcoin' })
    @ApiOkResponse({ type: FeixiaohaoMarketTicker })
    async getMarketTicker(@Query() query: GetMarketTickerDto): Promise<FeixiaohaoMarketTicker> {
        return await this.feixiaohaoService.getMarketTicker(query.code)
    }
}
