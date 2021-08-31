import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import UserStoryEntity from 'src/user-stories/entities/user-story.entity';

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
  @JoinColumn({ name: 'User_story_id' })
  @ManyToOne(
    () => UserStoryEntity,
    (userStoryEntity: UserStoryEntity) => userStoryEntity.userStoryId,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  userStoryId: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Created_at'
  })
  createdAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
