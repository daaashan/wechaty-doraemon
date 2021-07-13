import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

import { setupSwagger } from './swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(
        new ValidationPipe({
            // disableErrorMessages: true,
            whitelist: true,
            transform: true
        })
    )

    setupSwagger(app)

    await app.listen(3000)
}

bootstrap()
