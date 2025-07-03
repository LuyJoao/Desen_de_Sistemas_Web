import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import Order from "../typeorm/entities/Order";

export default class ListOrderService{
    public async execute() : Promise<Order[]>{
        const orderRepository = getCustomRepository(OrdersRepository);
        const orders = orderRepository.find();
        return orders;
    }
}