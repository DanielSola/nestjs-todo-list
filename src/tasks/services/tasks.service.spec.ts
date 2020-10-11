import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from '../task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskStatus, TaskPriority } from '../tasks.model';
import { MoreThan, LessThan } from 'typeorm';
import * as dayjs from 'dayjs';
const tk = require('timekeeper');

describe('TasksService', () => {
  let tasksService: TasksService;
  //Freeze time for testing time-dependant stuff
  const time = new Date(1330688329321);
  tk.freeze(time);

  const mockTaskRepository = {
    find: jasmine.createSpy(),
    findOne: jasmine.createSpy(),
    save: jasmine.createSpy(),
    delete: jasmine.createSpy(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: mockTaskRepository },
      ],
    }).compile();

    mockTaskRepository.findOne.calls.reset();
    mockTaskRepository.find.calls.reset();
    mockTaskRepository.save.calls.reset();

    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('getTasks method', () => {
    it('should get all tasks if no status is provided', async () => {
      spyOn(tasksService, 'getAllTasks');
      await tasksService.getTasks(null);
      expect(tasksService.getAllTasks).toHaveBeenCalled();
    });

    it('should get PENDING tasks', async () => {
      spyOn(tasksService, 'getPendingTasks');
      await tasksService.getTasks(TaskStatus.PENDING);
      expect(tasksService.getPendingTasks).toHaveBeenCalled();
    });

    it('should get OVERDUE tasks', async () => {
      spyOn(tasksService, 'getOverDueTasks');
      await tasksService.getTasks(TaskStatus.OVERDUE);
      expect(tasksService.getOverDueTasks).toHaveBeenCalled();
    });
  });

  describe('getAllTasks method', () => {
    it('should get all tasks ', async () => {
      const mockTasks = [
        { id: 'foo', name: 'Make foo', dueDate: '01/07/1994' },
      ];

      mockTaskRepository.find.and.returnValue(mockTasks);

      await tasksService.getAllTasks();
      const findParams = {
        order: { dueDate: 'DESC', name: 'DESC', priority: 'ASC' },
      };
      expect(mockTaskRepository.find).toHaveBeenCalledWith(findParams);
    });
  });

  describe('getPendingTasks method', () => {
    it('should get PENDING tasks ', async () => {
      await tasksService.getPendingTasks();

      const findPendingTaskParams = {
        where: { dueDate: MoreThan(new Date()) },
        order: { dueDate: 'DESC', name: 'DESC', priority: 'ASC' },
      };

      expect(mockTaskRepository.find).toHaveBeenCalledWith(
        findPendingTaskParams,
      );
    });
  });

  describe('getOverDueTasks method', () => {
    it('should get PENDING tasks ', async () => {
      await tasksService.getOverDueTasks();

      const findOverdueTaskParams = {
        where: { dueDate: LessThan(new Date()) },
        order: { dueDate: 'DESC', name: 'DESC', priority: 'ASC' },
      };

      expect(mockTaskRepository.find).toHaveBeenCalledWith(
        findOverdueTaskParams,
      );
    });
  });

  describe('createTaskMethod', () => {
    it('should save task ', async () => {
      await tasksService.createTask({
        name: 'Hire Dani',
        dueDate: '12/10/2020',
        priority: TaskPriority.HIGH,
      });

      expect(mockTaskRepository.save).toHaveBeenCalled();
    });
  });

  describe('deleteTaskMethod', () => {
    it('should delete task ', async () => {
      const id = '2cdcc15f-803e-4287-9707-e61ffde5a274';
      const mockTask = {
        name: 'Hire Dani',
        dueDate: '12/10/2020',
        priority: TaskPriority.HIGH,
      };
      spyOn(tasksService, 'getTaskById').and.returnValue(mockTask);
      await tasksService.deleteTask(id);

      expect(mockTaskRepository.delete).toHaveBeenCalledWith(mockTask);
    });
  });

  describe('updateTaskMethod', () => {
    it('should update task ', async () => {
      const id = '2cdcc15f-803e-4287-9707-e61ffde5a274';
      const mockTask = {
        name: 'Hire Dani',
        dueDate: '12/10/2020',
        priority: TaskPriority.HIGH,
      };

      spyOn(tasksService, 'getTaskById').and.returnValue(mockTask);

      const newTaskInfo = {
        priority: TaskPriority.LOW,
        name: 'Hire Dani ASAP',
        dueDate: '11/10/2020',
      };

      await tasksService.updateTask(id, newTaskInfo);
      const now = dayjs().toISOString();

      expect(mockTaskRepository.save).toHaveBeenCalledWith({
        ...newTaskInfo,
        updatedAt: now,
      });
    });
  });

  describe('getTaskById method', () => {
    it('should retrieve task ', async () => {
      const id = '2cdcc15f-803e-4287-9707-e61ffde5a274';

      const mockTask = {
        priority: TaskPriority.LOW,
        name: 'Hire Dani ASAP',
        dueDate: '11/10/2020',
      };

      mockTaskRepository.findOne.and.returnValue(mockTask);

      await tasksService.getTaskById(id);

      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({ id });
    });

    it('should throw error if task is not found ', async () => {
      const id = '2cdcc15f-803e-4287-9707-e61ffde5a274';

      mockTaskRepository.findOne.and.returnValue(null);

      try {
        await tasksService.getTaskById(id);
      } catch (error) {
        expect(mockTaskRepository.findOne).toHaveBeenCalledWith({ id });
        expect(error).toBeDefined();
      }
    });
  });
});
