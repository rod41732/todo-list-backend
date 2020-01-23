import { Controller, Body, Post, Get, Patch, Param, Options, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/interfaces/todo.interface';

@Controller('todos')
export class TodoController {
  constructor(
    private todoService: TodoService
  ){}

    @Options()
    getOptions() {
      return "Hello!"
    }

    @Post() 
    createToDo(@Body() body: Partial<Todo>): Promise<Todo> {
      return this.todoService.createTodo(body);
    }

    @Get()
    getAllTodo(): Promise<Todo[]> {
      return this.todoService.findAll();
    } 

    @Get(':id')
    getTodoById(@Param('id') id: String): Promise<Todo> {
      return this.todoService.findById(id);
    }

    @Patch(':id')
    async updateTodo(
      @Param(':id') id: String,
      @Body() todo: Partial<Todo>
    ) {
      console.log(todo);
      return await this.todoService.updateById(id, todo);
    } 

    @Delete(':id')
    deleteTodo(
      @Param('id') id: String,
    ): Promise<any> {
      return this.todoService.deleteById(id);
    } 
}
  