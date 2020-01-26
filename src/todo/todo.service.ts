import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo';
import { TodoSchema } from "./todo";

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async createTodo(todo: Partial<Todo>): Promise<Todo> {
    const createdTodo = new this.todoModel(todo);
    return createdTodo.save();
  }

  async findByOwner(ownerId: String): Promise<Todo[]> {
    return this.todoModel.find({ownerId});
  } 

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find();
  }
  
  // async findById(id: String) {
  //   return this.todoModel.findById(id);
  // }

  async deleteByListId(listId, ownerId: String) {
    return this.todoModel.deleteMany({listId, ownerId});
  }

  async deleteById(_id: String, ownerId: String) {
    return this.todoModel.deleteMany({_id, ownerId});
  }

  async updateById(_id: String, ownerId: String, updateTodo: Partial<Todo>) {
    return this.todoModel.updateOne({_id, ownerId}, updateTodo);
  }
}
