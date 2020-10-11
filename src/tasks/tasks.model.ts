export interface Task {
  id: string;
  name: string;
  dueDate: Date;
  priority: TaskPriority;
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
