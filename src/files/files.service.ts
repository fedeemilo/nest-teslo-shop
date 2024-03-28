import { existsSync } from 'fs'
import { join } from 'path'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class FilesService {
    getStaticProductImage(imageName: string) {
        const path = join(__dirname, '../../static/products', imageName)

        if (!existsSync(path))
            throw new BadRequestException(
                `No product image found with the name ${imageName}`
            )
        
        return path
    }
}
