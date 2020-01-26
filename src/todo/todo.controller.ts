import { Controller, Body, Post, Get, Patch, Param, Options, Delete, UsePipes, ValidationPipe, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';
import { createListDto } from 'src/list/dto/createList.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('todos')
export class TodoController {
  constructor(
    private todoService: TodoService
  ){}

  
    @UseGuards(AuthGuard('jwt'))
    @Post() 
    @UsePipes(new ValidationPipe({
      whitelist: true,
    }))
    createToDo(
      @Req() req: Request,
      @Body() createTodoDto: createTodoDto
    ): Promise<Todo> {
      const { user } = req.user as any;
      createTodoDto.ownerId = user;
      return this.todoService.createTodo(createTodoDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAllTodo(
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

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateTodo(
      @Param('id') id: String,
      @Body() todo: updateTodoDto,
      @Req() req: Request,
    ) {
      const { user } = req.user as any;
      return this.todoService.updateById(id, user, todo);
    } 

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteTodo(
      @Param('id') id: String,
      @Req() req: Request,
    ): Promise<any> {
      const { user } = req.user as any;
      const { deletedCount } = await this.todoService.deleteById(id, user);
      if (deletedCount === 0)
        throw new NotFoundException("Either todo doesn't exist, or you don't have permission to do that");
      else
        return {
          status : "OK",
        };
    } 
}
  