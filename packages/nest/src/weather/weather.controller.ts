import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WeatherService } from './weather.service'

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    async get(@Query('city') city: string) {
        return await this.weatherService.getWeather(city).catch(err => {
            throw new HttpException(
                {
                    message: err.message
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        })
    }
}
