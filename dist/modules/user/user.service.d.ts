import { Repository } from 'typeorm';
import { ICreateUser } from './interfaces/create-user.interface';
import User from '../../database/entities/users.entity';
import { IUser } from './interfaces/user.interface';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(payload: ICreateUser): Promise<void>;
    findByUsername(username: string): Promise<User>;
    findById(id: string): Promise<User>;
    find(username: string): Promise<IUser[]>;
}
