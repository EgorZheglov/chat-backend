import {
    Entity,
    BaseEntity,
    Column,
    PrimaryColumn,
} from 'typeorm';


@Entity('user')
export default class Message extends BaseEntity {
    //TODO: relate to users entity
    @PrimaryColumn('uuid') 
    producer_id: string;

    @Column('text', { unique: false, nullable: false })
    data: string;

    @Column('timestamptz', { unique: false, nullable: false })
    timestamp: Date;
    //TODO: relate to users entity
    @PrimaryColumn('uuid')
    consumer_id: string;
}
