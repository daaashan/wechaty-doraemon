import { Module } from '@nestjs/common'
import { FeixiaohaoController } from './feixiaohao.controller'
import { FeixiaohaoService } from './fexiaohao.service'

@Module({
    controllers: [FeixiaohaoController],
    providers: [FeixiaohaoService]
})
export class CoinModule {}
