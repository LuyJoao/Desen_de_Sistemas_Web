import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
}

export default class DeleteProductService{
    public async execute({id} : IRequest) : Promise<void>{
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);
        if(!product){
            throw new AppError('Product not Found');
        }
        await productsRepository.remove(product);
    }
}