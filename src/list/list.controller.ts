import { Controller, Get, Patch, Param, Body, Post, Delete, ValidationPipe, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './list';
import { TodoService } from 'src/todo/todo.service';
import { createListDto } from './dto/createList.dto';
import { updateListDto } from './dto/updateListDto';

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
  @UsePipes(new ValidationPipe({
    whitelist: true,
  }))
  updateList(
    @Param('id') id: String, 
    @Body() updateListDto: updateListDto,
  ): Promise<List> {
    return this.listService.updateList(id, updateListDto);
  }

  @Post()
  @UsePipes(new ValidationPipe({
    whitelist: true,
  }))
  createList(
    @Body() createListDto: createListDto,
  ): Promise<List> {
    //createListDto.ownerId = "foo"; 
    return this.listService.createList(createListDto);
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: String,
  ): Promise<any> {
    const {deletedCount: listDeleted} = await this.listService.deleteById(id);
    if (listDeleted === 0) {
      throw new HttpException("List not found", HttpStatus.NOT_FOUND);
    }
    try { 
      const {deletedCount: todoDeleted} = await this.todoService.deleteByListId(id);
      return {
        ok: true,
        todoDeleted,
      };
    } catch (err) {
      return {
        ok: false,
        err,
      }
    }
  }
}
