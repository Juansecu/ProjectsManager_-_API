import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import CompanyEntity from 'src/companies/entities/company.entity';

import { IUser } from '../typings/User';

@Entity('Users')
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
  @Column('varchar', { length: 60, name: 'Password', nullable: false })
  password: string;
  @JoinColumn({ name: 'Company_id' })
  @OneToOne(() => CompanyEntity, companyEntity => companyEntity.companyId, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  companyId: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Registered_at'
  })
  registeredAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
