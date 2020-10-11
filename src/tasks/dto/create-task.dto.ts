import { TaskPriority } from '../tasks.model';
import { IsNotEmpty, IsEnum, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  dueDate: string;
  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority;
}
