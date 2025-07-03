import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default class UpdateProductService{
    public async execute({id, name, price, quantity} : IRequest) : Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findById(id);
        if(!product){
            throw new AppError('Product not Found');
        }
        const productsExists = await productsRepository.findByName(name);
        if(productsExists && name != product.name){
            throw new AppError('there is already once product with this name');
        }
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        await productsRepository.save(product);
        return product;
    }
}