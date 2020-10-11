import { PipeTransform, BadRequestException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CreateTaskDto } from '../dto/create-task.dto';

export class DueDateValidationPipe implements PipeTransform {
  transform(body: CreateTaskDto) {
    const { dueDate } = body;
    const isValidDate = dayjs(dueDate).isValid();

    if (!isValidDate) {
      throw new BadRequestException(
        `Invalid date format for input "${dueDate}"`,
      );
    }

    return body;
  }
}
