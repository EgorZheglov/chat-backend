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

  @Column('text', { unique: false, nullable: false })
  data: string;

  //this column does'nt need primary key actually  
  //But ORM won't let it be
  @PrimaryColumn('timestamptz', { unique: false, nullable: false })
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'consumer_id' })
  consumer_id: string;
}
