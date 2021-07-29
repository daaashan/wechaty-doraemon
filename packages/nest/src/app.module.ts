import { Module } from '@nestjs/common'

import { WeatherModule } from './weather/weather.module'
import { CoinModule } from './coin/coin.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [WeatherModule, CoinModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
