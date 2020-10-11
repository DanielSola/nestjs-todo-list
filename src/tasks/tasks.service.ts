import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  getAllTasks() {
    return 'tasks';
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { name, priority, dueDate } = createTaskDto;
    const parsedDate = new Date(dueDate);
    const task: Task = {
      id: uuid.v4(),
      name,
      dueDate: parsedDate,
      priority,
    };

    console.log('Task!');

    return task;
  }
}
