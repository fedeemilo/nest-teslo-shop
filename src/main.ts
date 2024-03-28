import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function main() {
    const app = await NestFactory.create(AppModule)
    const PORT = process.env.PORT
    const logger = new Logger('main')

    app.setGlobalPrefix('api')

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )

    await app.listen(PORT)
    logger.log(`App running on port ${PORT}`)
}
main()
