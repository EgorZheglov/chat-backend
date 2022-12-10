import { BaseEntity } from 'typeorm';
export default class Message extends BaseEntity {
    producer_id: string;
    data: string;
    timestamp: Date;
    consumer_id: string;
}
