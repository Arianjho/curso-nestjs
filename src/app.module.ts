import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD12121212';

@Module({
  imports: [
    HttpModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
