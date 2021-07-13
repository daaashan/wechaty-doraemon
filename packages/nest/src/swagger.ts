import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { version } from '../package.json'

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder().setTitle('API Documentation').addTag('weather').setVersion(version).build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
}
