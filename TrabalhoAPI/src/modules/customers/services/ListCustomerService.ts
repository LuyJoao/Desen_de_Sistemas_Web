import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRespository";

export default class ListCustomerService{
    public async execute() : Promise<Customer[]>{
        const customerRepository = getCustomRepository(CustomersRepository);
        const customers = await customerRepository.find();
        return customers
    }
}