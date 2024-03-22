import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
    private readonly logger = new Logger('ProductsService')

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    async create(createProductDto: CreateProductDto) {
        try {
            const product = this.productRepository.create(createProductDto)
            await this.productRepository.save(product)

            return product
        } catch (error) {
            this.handleDBExceptions(error)
        }
    }

    findAll() {
        return `This action returns all products`
    }

    findOne(id: number) {
        return `This action returns a #${id} product`
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`
    }

    remove(id: number) {
        return `This action removes a #${id} product`
    }

    private handleDBExceptions(error: any) {
        this.logger.error(error)

        if (error.code === '23505') throw new BadRequestException(error.detail)

        throw new InternalServerErrorException(
            'Unexpected error, check server logs for more details'
        )
    }
}
