import { IsNotEmpty, IsString } from 'class-validator'

export class GetMarketTickerDto {
    @IsNotEmpty()
    @IsString()
    code: string
}
