import { TaskStatus } from '../task-status.enum'
import { IsNotEmpty } from 'class-validator'

export class UpdateTaskDto {
  title: string;
  description: string;
  status: TaskStatus
}

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}

export class FilterTaskDto {
  status: TaskStatus;
  search: string;
}