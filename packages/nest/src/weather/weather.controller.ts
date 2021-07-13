import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common'
import { WeatherService } from './weather.service'

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
