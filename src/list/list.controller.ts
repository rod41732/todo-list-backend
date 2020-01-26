import { Controller, Get, Patch, Param, Body, Post, Delete, ValidationPipe, UsePipes, HttpException, HttpStatus, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './list';
import { TodoService } from 'src/todo/todo.service';
import { createListDto } from './dto/createList.dto';
import { updateListDto } from './dto/updateListDto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('labels')
@UseGuards(AuthGuard('jwt'))
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly todoService: TodoService,
  ) {}
  
  @Get() 
  findAll(
    @Req() req: Request,
  ): Promise<List[]> {
    const { user } = req.user as any;
    return this.listService.findByOwner(user);
  }

  @Patch(':id')
  async updateList(
    @Param('id') id: String, 
    @Body() updateListDto: updateListDto,
    @Req() req: Request,
  ): Promise<any> {
    const { user } = req.user as any;
    const updatedList = await this.listService.updateList(id, user, updateListDto);
    if (updatedList === null) {
      throw new NotFoundException("Either list doesn't exist, or you don't have permission to do that");
    }
    return updatedList;
  }

  @Post()
  createList(
    @Body() createListDto: createListDto,
    @Req() req: Request, 
  ): Promise<List> {
    const { user } = req.user as any;
    createListDto.ownerId = user; 
    return this.listService.createList(createListDto);
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: String,
    @Req() req: Request,
  ): Promise<any> {
    const { user } = req.user as any;
    const { deletedCount} = await this.listService.deleteById(id, user);
    if (deletedCount === 0) {
      throw new NotFoundException("Either list doesn't exist, or you don't have permission to do that");
    }
    const {deletedCount: todoDeleted} = await this.todoService.deleteByListId(id, user);
    return {
      statusCode: 200,
      message: 'OK',
      todoDeleted,
    };
  }
}
