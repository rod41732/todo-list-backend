import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/interfaces/todo.interface';
import { TodoSchema } from "../schemas/todo.schema";

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async createTodo(todo: Partial<Todo>): Promise<Todo> {
    const createdTodo = new this.todoModel(todo);
    return createdTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find();
  }
  
  async findById(id: String) {
    return this.todoModel.findById(id);
  }

  async deleteByListId(id: String) {
    return this.todoModel.deleteMany({listId: id});
  }

  async deleteById(id: String) {
    return this.todoModel.findByIdAndDelete(id);
  }

  async updateById(id: String, updateTodo: Partial<Todo>) {
    return this.todoModel.findOneAndUpdate({_id: id}, updateTodo);
  }
}
