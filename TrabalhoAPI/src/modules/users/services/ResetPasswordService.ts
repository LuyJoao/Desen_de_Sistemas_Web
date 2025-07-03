import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { addHours, isAfter } from "date-fns";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import UsersTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest{
    token: string;
    password: string;
}
export default class ResetPasswordService{
    public async execute({token, password}: IRequest):Promise<void>{
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UsersTokensRepository);
        const userToken = await userTokensRepository.findByToken(token);
        if(!token){
            throw new AppError('User Token does not exists.');
        }
        const user = await userRepository.findById(userToken.user_id);
        if(!user){
            throw new AppError('User does not exists.');
        }
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);
        if(isAfter(Date.now() , compareDate)){
            throw new AppError('Token expired')
        }
        user.password = await hash(password, 8);
        await userRepository.save(user);
    }
}