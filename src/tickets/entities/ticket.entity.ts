import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tickets')
export default class TicketEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Ticket_id' }) ticketId: string;
  @Column('varchar', { length: 45, name: 'Title', nullable: false })
  title: string;
  @Column('tinytext', { name: 'Description', nullable: false })
  description: string;
  @Column('enum', {
    enum: ['Activo', 'En proceso', 'Finalizado'],
    name: 'Status',
    nullable: false
  })
  status: string;
  @Column('uuid', { name: 'Project_id', nullable: false }) projectId: string;
  @Column('uuid', { name: 'User_history_id', nullable: false })
  userHistoryId: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Created_at'
  })
  createdAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
