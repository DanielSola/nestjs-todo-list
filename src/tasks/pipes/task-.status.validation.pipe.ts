import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log('Value', value);
    if (!value) {
      return;
    }

    if (value !== TaskStatus.PENDING && value !== TaskStatus.OVERDUE) {
      throw new BadRequestException(
        `Invalid value "${value}" for task status. Status must be PENDING or OVERDUE`,
      );
    }

    return value;
  }
}
