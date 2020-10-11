import { Entity, Column, PrimaryColumn } from 'typeorm';
import { TaskPriority } from './tasks.model';

@Entity()
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'due_date' })
  dueDate: string;

  @Column()
  priority: TaskPriority;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;
}
