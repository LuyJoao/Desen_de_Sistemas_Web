import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRespository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;
}

export default class ShowCustomerService{
    public async execute({id} : IRequest) : Promise<Customer>{
        const customerRepository = getCustomRepository(CustomersRepository);
        const customer = await customerRepository.findById(id);
        if(!customer){
            throw new AppError('Customer not found');
        }
        return customer;
    }
}