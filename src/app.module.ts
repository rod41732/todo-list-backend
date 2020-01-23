import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { ListService } from './list/list.service';
import { ListController } from './list/list.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/todo-app-dev'), TodoModule],
  controllers: [
    AppController,
    UserController,
    // UsersController,
    // ListsController,
  ],
  providers: [AppService, UserService],
})
export class AppModule { }
