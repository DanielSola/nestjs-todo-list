import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(status: TaskStatus): Promise<Task[]> {
    if (!status) {
      return this.getAllTasks();
    }

    if (status === TaskStatus.PENDING) {
      return this.getPendingTasks();
    }

    if (status === TaskStatus.OVERDUE) {
      return this.getOverDueTasks();
    }
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();

    return tasks.map(this.setTaskIsOverDue);
  }

  async getPendingTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { dueDate: MoreThan(new Date()) },
    });
  }

  async getOverDueTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { dueDate: LessThan(new Date()) },
    });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const now = new Date().toISOString();
    const task: Task = {
      ...createTaskDto,
      id: uuid.v4(),
      createdAt: now,
      updatedAt: now,
    };

    return await this.taskRepository.save(task);
  }

  private setTaskIsOverDue(task: Task) {
    const isOverDue = new Date(task.dueDate) < new Date();

    return { ...task, isOverDue };
  }
}
