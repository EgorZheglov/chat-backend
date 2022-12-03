import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  // @Column('boolean', { default: false })
  // is_active: boolean;
  
  // @BeforeInsert()
  // async hashPassword(): Promise<void> {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
