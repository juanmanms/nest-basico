import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb'; // Import ObjectId from 'mongodb' instead of 'mongoose'
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  private validateObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  }

  @Get()
  async findAll() {
    const tasks = await this.tasksService.findAll();
    if (!tasks.length) {
      throw new NotFoundException('No tasks found');
    }
    return tasks;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.validateObjectId(id);
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async create(@Body() body: CreateTaskDto) {
    try {
      return await this.tasksService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    this.validateObjectId(id);
    const task = await this.tasksService.update(body, id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Put(':id/complete')
  async complete(@Param('id') id: string) {
    this.validateObjectId(id);
    const task = await this.tasksService.complete(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Put(':id/incomplete')
  async incomplete(@Param('id') id: string) {
    this.validateObjectId(id);
    const task = await this.tasksService.complete(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.validateObjectId(id);
    const task = await this.tasksService.remove(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
