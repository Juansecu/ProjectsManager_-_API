import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import UserHistoryEntity from 'src/users/entities/user-history.entity';

@Entity('Tickets')
export default class TicketEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Ticket_id' }) ticketId: string;
  @Column('varchar', { length: 45, name: 'Title', nullable: false })
  title: string;
  @Column('enum', {
    enum: ['Activo', 'En proceso', 'Finalizado'],
    name: 'Status',
    nullable: false
  })
  status: string;
  @JoinColumn({ name: 'User_history_id' })
  @ManyToOne(
    () => UserHistoryEntity,
    (userHistoryEntity: UserHistoryEntity) => userHistoryEntity.userHistoryId,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  userHistoryId: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Created_at'
  })
  createdAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
