import { TaskPriority } from '../tasks.model';

export class CreateTaskDto {
  name: string;
  dueDate: string;
  priority: TaskPriority;
}
