import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoSchema } from "./todo";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { ListSchema } from "src/list/list";
import { ListController } from "src/list/list.controller";
import { ListService } from "src/list/list.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Todo",
        schema: TodoSchema
      },
      {
        name: "List",
        schema: ListSchema
      }
    ])
  ],
  controllers: [TodoController, ListController],
  providers: [TodoService, ListService],
  exports: [TodoService, ListService]
})
export class TodoModule {}
