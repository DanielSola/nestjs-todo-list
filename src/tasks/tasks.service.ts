import { Injectable } from '@nestjs/common';
import { TaskPriority, Task } from './tasks.model';
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  getAllTasks() {
    return 'tasks';
  }

  createTask(name: string, dueDate: Date, priority: TaskPriority): Task {
    const task: Task = {
      id: uuid.v4(),
      name,
      dueDate,
      priority,
    };

    console.log('Task!');

    return task;
  }
}
