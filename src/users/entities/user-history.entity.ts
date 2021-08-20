import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IUserHistory } from '../typings/UserHistory';

@Entity('User_histories')
export default class UserHistoryEntity implements IUserHistory {
  @PrimaryGeneratedColumn('uuid', { name: 'User_history_id' })
  userHistoryId: string;
  @Column('varchar', { length: 45, name: 'Title', nullable: false })
  title: string;
  @Column('uuid', { name: 'User_id', nullable: false }) userId: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Created_at'
  })
  createdAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
