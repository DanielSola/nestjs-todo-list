import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import * as dayjs from 'dayjs';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan } from 'typeorm';
import { Task } from '../task.entity';
import { TaskStatus } from '../tasks.model';
import { UpdateTaskDto } from '../dto/update-task.dto';

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
    const tasks = await this.taskRepository.find({
      order: { dueDate: 'DESC', name: 'DESC', priority: 'ASC' },
    });

    return tasks.map(this.setTaskIsOverDue);
  }

  async getPendingTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { dueDate: MoreThan(new Date()) },
      order: { dueDate: 'DESC', name: 'DESC', priority: 'ASC' },
    });
  }

  async getOverDueTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { dueDate: LessThan(new Date()) },
      order: { dueDate: 'DESC', name: 'DESC', priority: 'ASC' },
    });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const now = dayjs().toString();
    const task: Task = {
      ...createTaskDto,
      id: uuid.v4(),
      createdAt: now,
      updatedAt: now,
    };

    return await this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.getTaskById(id);
    await this.taskRepository.delete(task);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    const now = dayjs().toISOString();

    const updatedTask: Task = {
      ...task,
      ...updateTaskDto,
      updatedAt: now,
    };

    return await this.taskRepository.save(updatedTask);
  }

  async getTaskById(id: string): Promise<Task> {
    const task: Task = await this.taskRepository.findOne({ id });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.setTaskIsOverDue(task);
  }

  private setTaskIsOverDue(task: Task) {
    const isOverDue = new Date(task.dueDate) < new Date();

    return { ...task, isOverDue };
  }
}
