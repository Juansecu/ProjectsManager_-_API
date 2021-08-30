import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import CompanyEntity from 'src/companies/entities/company.entity';

@Entity('Projects')
export default class ProjectEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Project_id' }) projectId: string;
  @Column('varchar', { length: 45, name: 'Name', nullable: false })
  name: string;
  @Column('varchar', { length: 75, name: 'Description', nullable: false })
  description: string;
  @JoinColumn({ name: 'Company_id' })
  @ManyToOne(
    () => CompanyEntity,
    (companyEntity: CompanyEntity) => companyEntity.companyId,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  companyId: string;
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP', name: 'Added_at' })
  addedAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
