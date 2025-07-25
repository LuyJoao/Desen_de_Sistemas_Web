import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

export default class ListProductService{
    public async execute() : Promise<Product[]>{
        const productsRepository = getCustomRepository(ProductRepository);
        const products = productsRepository.find();
        return products;
    }
}