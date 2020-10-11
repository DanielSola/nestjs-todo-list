import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from '../task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
});
