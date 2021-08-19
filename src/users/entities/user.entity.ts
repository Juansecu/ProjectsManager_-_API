import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '../typings/User';

@Entity({ name: 'Users' })
export default class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid', { name: 'User_id' }) userId: string;
  @Column('varchar', {
    length: 15,
    name: 'Username',
    nullable: false,
    unique: true
  })
  username: string;
  @Column('varchar', {
    length: 45,
    name: 'Email',
    nullable: false,
    unique: true
  })
  email: string;
  @Column('varchar', { length: 20, name: 'First_name', nullable: false })
  firstName: string;
  @Column('varchar', { length: 20, name: 'Last_name', nullable: false })
  lastName: string;
  @Column('varchar', { length: 10, name: 'Password', nullable: false })
  password: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Registered_at'
  })
  registeredAt: Date;
  @Column('datetime', { name: 'Updated_at' }) updatedAt: Date;
}
