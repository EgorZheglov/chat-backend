import { BaseEntity } from 'typeorm';
export default class User extends BaseEntity {
    id: string;
    username: string;
    password: string;
}
