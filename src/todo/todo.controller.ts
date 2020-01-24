import { Controller, Body, Post, Get, Patch, Param, Options, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';
import { createListDto } from 'src/list/dto/createList.dto';

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
    @UsePipes(new ValidationPipe({
      whitelist: true,
    }))
    createToDo(@Body() createTodoDto: createTodoDto): Promise<Todo> {
      createTodoDto.ownerId = "123456789012345678901234";
      return this.todoService.createTodo(createTodoDto);
    }

    @Get()
    getAllTodo(): Promise<Todo[]> {
      return this.todoService.findAll();
    } 

    @Get(':id')
    async getTodoById(@Param('id') id: String): Promise<Todo> {
      return this.todoService.findById(id);
    }

    @Patch(':id')
    async updateTodo(
      @Param('id') id: String,
      @Body() todo: updateTodoDto,
    ) {
      return this.todoService.updateById(id, todo);
    } 

    @Delete(':id')
    deleteTodo(
      @Param('id') id: String,
    ): Promise<any> {
      return this.todoService.deleteById(id);
    } 
}
  