import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.use(cookieParser());
  const options = new DocumentBuilder()
    .setTitle('Todo app')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
