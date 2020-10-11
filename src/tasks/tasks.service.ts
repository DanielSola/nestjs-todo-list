import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}
  getAllTasks() {
    return 'tasks';
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = { ...createTaskDto, id: uuid.v4() };

    return await this.taskRepository.save(task);
  }
}
