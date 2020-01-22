import { Controller, Get } from '@nestjs/common';

@Controller('lists')
export class ListsController {
  @Get()
  findAll(): string {
    return 'Hello list';
  }
}
