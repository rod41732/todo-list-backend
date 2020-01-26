import { Controller, Body, Post, Get, Patch, Param, Options, Delete, UsePipes, ValidationPipe, UseGuards, Req, NotFoundException, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';
import { createListDto } from 'src/list/dto/createList.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ApiDefaultResponse } from '@nestjs/swagger';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(
    private todoService: TodoService
  ){}

  
    @Post() 
    createToDo(
      @Req() req: Request,
      @Body() createTodoDto: createTodoDto
    ): Promise<Todo> {
      const { user } = req.user as any;
      createTodoDto.ownerId = user;
      return this.todoService.createTodo(createTodoDto);
    }

    @Get()
    findAll(
      @Req() req: Request,
    ): Promise<Todo[]> {
      const { user } = req.user as any;
      return this.todoService.findByOwner(user);
    } 

    
    // @Get(':id')
    // async getTodoById(
    //   @Param('id') id: String,
    //   @Req() req: Request,  
    // ): Promise<Todo> {
    //   const { user } = req.user as any;
    //   return this.todoService.findById(id);
    // }

    @Patch(':id')
    async updateTodo(
      @Param('id') id: String,
      @Body() todo: updateTodoDto,
      @Req() req: Request,
    ) {
      const { user } = req.user as any;
      const updatedTodo = await this.todoService.updateById(id, user, todo);
      if (updatedTodo === null) {
        throw new NotFoundException("Either todo doesn't exist, or you don't have permission to do that");
      } 
      return updatedTodo;
    } 

    @Delete(':id')
    async deleteTodo(
      @Param('id') id: String,
      @Req() req: Request,
    ) {
      const { user } = req.user as any;
      const { deletedCount } = await this.todoService.deleteById(id, user);
      if (deletedCount === 0)
        throw new NotFoundException("Either todo doesn't exist, or you don't have permission to do that");
      else
      return {
        statusCode: 200,
        message: 'OK',
      };
    } 
}
  