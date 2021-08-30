import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import ProjectEntity from 'src/projects/entities/project.entity';
import UserEntity from 'src/users/entities/user.entity';

import { IUserHistory } from '../typings/UserHistory';

@Entity('User_histories')
export default class UserHistoryEntity implements IUserHistory {
  @PrimaryGeneratedColumn('uuid', { name: 'User_history_id' })
  userHistoryId: string;
  @Column('varchar', { length: 45, name: 'Title', nullable: false })
  title: string;
  @Column('tinytext', { name: 'Description', nullable: false })
  description: string;
  @JoinColumn({ name: 'User_id' })
  @ManyToOne(() => UserEntity, user => user.userId, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  userId: string;
  @JoinColumn({ name: 'Project_id' })
  @ManyToOne(
    () => ProjectEntity,
    (projectEntity: ProjectEntity) => projectEntity.projectId,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  projectId: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Created_at'
  })
  createdAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
