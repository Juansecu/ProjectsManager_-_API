import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Companies')
export default class CompanyEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Company_id' }) companyId: string;
  @Column('varchar', {
    length: 45,
    name: 'Name',
    nullable: false,
    unique: true
  })
  name: string;
  @Column('varchar', {
    length: 45,
    name: 'Email',
    nullable: false,
    unique: true
  })
  email: string;
  @Column('varchar', { length: 45, name: 'Nit', nullable: false, unique: true })
  nit: string;
  @Column('varchar', {
    length: 10,
    name: 'Phone',
    nullable: false,
    unique: true
  })
  phone: string;
  @Column('varchar', {
    length: 45,
    name: 'Address',
    nullable: false,
    unique: true
  })
  address: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Added_at'
  })
  addedAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
