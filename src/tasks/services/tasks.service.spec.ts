import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from '../task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskStatus } from '../tasks.model';

describe('TasksService', () => {
  let tasksService: TasksService;

  const mockTaskRepository = {
    find: jasmine.createSpy(),
    findOne: jasmine.createSpy(),
    save: jasmine.createSpy(),
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
});
