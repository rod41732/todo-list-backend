import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { UsersController } from './users/users.controller';
import { ListsController } from './lists/lists.controller';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/todo-app-dev')],
  controllers: [AppController, TodosController, UsersController, ListsController],
  providers: [AppService],
})
export class AppModule {}
