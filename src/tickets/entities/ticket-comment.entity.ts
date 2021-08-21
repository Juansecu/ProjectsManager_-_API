import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import TicketEntity from './ticket.entity';
import UserEntity from 'src/users/entities/user.entity';

@Entity('Ticket_comments')
export default class TicketCommentEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Ticket_comment_id' })
  ticketCommentId: string;
  @Column('varchar', { length: 100, name: 'Description', nullable: false })
  description: string;
  @JoinColumn({ name: 'User_id' })
  @ManyToOne(() => UserEntity, (userEntity: UserEntity) => userEntity.userId, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  userId: string;
  @JoinColumn({ name: 'Ticket_id' })
  @ManyToOne(
    () => TicketEntity,
    (ticketEntity: TicketEntity) => ticketEntity.ticketId,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  ticketId: string;
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP', name: 'Added_at' })
  addedAt: Date;
  @Column('datetime', { name: 'Modified_at', nullable: true }) modifiedAt: Date;
}
