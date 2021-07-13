import { Injectable, InternalServerErrorException } from '@nestjs/common'
import axios from 'axios'

import { Weather } from './entities/weather.entity'

@Injectable()
export class WeatherService {
    async getWeather(city: string): Promise<Weather> {
        try {
            const {
                data: { status, result, message }
            } = await axios.get(`https://api2.jirengu.com/getWeather.php?city=${encodeURIComponent(city)}`)
            if (status !== 0) {
                throw new Error(message)
            }
            return result
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
