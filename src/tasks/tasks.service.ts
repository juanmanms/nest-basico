import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll() {
    return this.taskModel.find();
  }

  async findOne(id: string) {
    return this.taskModel.findById(id);
  }

  async update(updateTaskDto: UpdateTaskDto, id: string) {
    return this.taskModel.findByIdAndUpdate({ _id: id }, updateTaskDto, {
      new: true,
    });
  }

  async complete(id: string) {
    return this.taskModel.findByIdAndUpdate({ _id: id }, { completed: true });
  }

  async incomplete(id: string) {
    return this.taskModel.findByIdAndUpdate({ _id: id }, { completed: false });
  }

  async remove(id: string) {
    return this.taskModel.findByIdAndDelete({ _id: id });
  }
}
