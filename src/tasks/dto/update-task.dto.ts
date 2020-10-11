import { TaskPriority } from '../tasks.model';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto {
  name: string;
  dueDate: string;
  @IsEnum(TaskPriority)
  priority: TaskPriority;
}
