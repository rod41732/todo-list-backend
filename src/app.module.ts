import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { config } from "./config";
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/${config.dbName}`),
    TodoModule,
    AuthModule,
    UserModule
  ],
  controllers: [
    AppController
    // UsersController,
    // ListsController,
  ],
  providers: [AppService]
})
export class AppModule {}
