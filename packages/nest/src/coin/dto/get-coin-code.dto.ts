import { IsNotEmpty, IsString } from 'class-validator'

export class GetCoinCodeDto {
    @IsNotEmpty()
    @IsString()
    keyword: string
}
