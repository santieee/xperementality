import { Controller, Get, Post, Delete, Patch, Body, Param, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto, FilterTaskDto } from './dto/task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService){}

  @Get()
  getAllTasks(@Query() filters: FilterTaskDto){
    if(!Object.keys(filters).length) return this.taskService.getAlltasks()
    return this.taskService.getFilteredTasks(filters)
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number){
    return this.taskService.getTask(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskData: CreateTaskDto) {
    return await this.taskService.createTask(taskData)
  }

  @Delete()
  async removeTask(@Body('id') id: number){
    await this.taskService.removeTask(id)
  }

  @Patch()
  async updateTask(@Body() taskData: UpdateTaskDto){
    return await this.taskService.updateTask(taskData)
  }
}
