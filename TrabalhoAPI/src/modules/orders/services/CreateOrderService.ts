import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import Order from "../typeorm/entities/Order";
import AppError from "@shared/errors/AppError";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRespository";

interface IProduct{
    id: string;
    quantity: number;
}

interface IRequest{
    customer_id: string;
    products: IProduct[];
}

export default class CreateOrderService{
    public async execute({customer_id, products} : IRequest) : Promise<Order>{
        const orderRepository = getCustomRepository(OrdersRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productRepository = getCustomRepository(ProductRepository);

        const customerExists = await customerRepository.findById(customer_id);
        if(!customerExists){
            throw new AppError('Could not find any customer with the given id.');
        }

        const productsExists = await productRepository.findAllByIds(products);
        if(!productsExists.length){
            throw new AppError('Could not find any products with the given ids.');
        }

        const existProductsIds = productsExists.map((product) => product.id);
        const checkInexistentsProducts = products.filter(product => !existProductsIds.includes(product.id))
        if(checkInexistentsProducts.length){
            throw new AppError(`Could not find ${checkInexistentsProducts[0].id}`);
        }
        
        const quantityAvaliabe = products.filter(
            product => productsExists.filter(
                prod => prod.id === product.id)[0].quantity < product.quantity);
        if(quantityAvaliabe.length){
            throw new AppError(`The quantity ${quantityAvaliabe[0].quantity}
                id not avaliable for ${quantityAvaliabe[0].id}`);
        }

        const serializerProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: productsExists.filter(prod => prod.id === product.id)[0].price
        }));

        const order = await orderRepository.CreateOrder({
            customer: customerExists,
            products: serializerProducts
        });

        const { orders_products} = order;
        const updateProductQuantity = orders_products.map(product => ({
            id: product.product_id,
            quantity: productsExists.filter(p => p.id === product.product_id)[0].quantity - product.quantity
        }));
        await productRepository.save(updateProductQuantity);
        return order;
    }
}