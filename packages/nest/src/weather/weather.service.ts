import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class WeatherService {
    async getWeather(city: string) {
        const {
            data: { status, result, message }
        } = await axios.get(`https://api2.jirengu.com/getWeather.php?city=${encodeURIComponent(city)}`)
        if (status !== 0) {
            throw new Error(message)
        }
        return result
    }
}
