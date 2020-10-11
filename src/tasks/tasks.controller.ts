import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskPriority } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('name') name: string,
    @Body('dueDate') dueDate: string,
    @Body('priority') priority: TaskPriority,
  ) {
    const parsedDueDate = new Date(dueDate);
    console.log('Parsed', parsedDueDate);
    return this.tasksService.createTask(name, parsedDueDate, priority);
  }
}
