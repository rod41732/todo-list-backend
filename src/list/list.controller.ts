import { Controller, Get, Patch, Param, Body, Post, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { List } from 'src/interfaces/list.interface';
import { TodoService } from 'src/todo/todo.service';

@Controller('labels')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly todoService: TodoService,
  ) {}
  
  @Get() 
  findAll(): Promise<List[]> {
    return this.listService.findAll();
  }

  @Patch(':id') 
  updateList(
    @Param('id') id: String, 
    @Body() list: List,
  ): Promise<List> {
    return this.listService.updateList(id, list);
  }

  @Post()
  createList(
    @Body() list: List,
  ): Promise<List> {
    return this.listService.createList(list);
  }

  @Delete(':id')
  async deleteById(
    @Param() id: String,
  ): Promise<any> {
    try {
      await this.todoService.deleteByListId(id);
      await this.listService.deleteById(id);
      return true;
    } catch (err) {
      return false;
    }
  }
}
