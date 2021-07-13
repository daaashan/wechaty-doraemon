import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery, ApiOkResponse } from '@nestjs/swagger'
import { WeatherService } from './weather.service'

import { GetWeatherDto } from './dto/get-weather.dto'

import { Weather } from './entities/weather.entity'

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    @ApiOperation({
        summary: '获取国内天气信息'
    })
    @ApiQuery({ name: 'city', description: '城市', example: '北京' })
    @ApiOkResponse({ type: Weather })
    async get(@Query() query: GetWeatherDto): Promise<Weather> {
        return await this.weatherService.getWeather(query.city)
    }
}
