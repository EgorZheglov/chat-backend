import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './users.entity';

@Entity('messages')
export default class Message extends BaseEntity {
  //TODO: relate to users entity
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'producer_id' })
  producer_id: string;

  //this column does'nt need primary key actually, 
  //But ORM throws exception if have not one at this entity
  @PrimaryColumn('text', { unique: false, nullable: false }) 
  data: string;

  @Column('timestamptz', { unique: false, nullable: false })
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'consumer_id' })
  consumer_id: string;
}
