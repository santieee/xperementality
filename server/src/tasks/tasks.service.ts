import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, FilterTaskDto } from './dto/task.dto'
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity'
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ){}

  async getAlltasks(): Promise<Task[]>{
    return await this.taskRepository.find()
  }

  async getFilteredTasks(filters: FilterTaskDto): Promise<any>{
    const { status, search } = filters;
    let tasks = await this.getAlltasks();

    if(status) tasks = tasks.filter( task => task.status === status );
    if(search) tasks = tasks.filter( task => task.title.includes(search) || task.description.includes(search) );

    return tasks;
  }

  async getTask(id: number): Promise<Task>{ 
    const task = await this.taskRepository.findOne(id);
    if(!task) throw new NotFoundException(`id: ${id} not found`)
    return task;
  }

  async createTask(createTaskDto :CreateTaskDto){
    const { title, description } = createTaskDto
    const task = new Task();
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    task.save()
  }

  async removeTask(id: number){
    const task = await this.taskRepository.delete(id);
  }

  async updateTask(taskData: any): Promise<Task>{
    await this.getTask(taskData.id);
    const task = await this.taskRepository.update(taskData.id, taskData);
    return taskData;
  }
}
