import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from 'src/schemas/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ListSchema } from 'src/schemas/list.schema';
import { ListController } from 'src/list/list.controller';
import { ListService } from 'src/list/list.service';
import { UserSchema } from 'src/schemas/user.schema';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Todo', schema: TodoSchema,
      }, {
        name: 'List', schema: ListSchema,
      }, {
        name: 'User', schema: UserSchema,
      }
    ]),
  ],
  controllers: [TodoController, ListController, UserController],
  providers: [TodoService, ListService, UserService],
})
export class TodoModule { }
