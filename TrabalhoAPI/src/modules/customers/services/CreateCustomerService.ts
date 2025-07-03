import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRespository";
import AppError from "@shared/errors/AppError";
import { custom } from "joi";

interface IRequest{
    name: string;
    email: string;
}

export default class CreateCustomerService{
    public async execute({name, email} : IRequest) : Promise<Customer>{
        const customerRepository = getCustomRepository(CustomersRepository);
        const emailExists = await customerRepository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email address already used');
        }
        const customer = customerRepository.create({name, email});
        await customerRepository.save(customer);
        return customer;
    }
}