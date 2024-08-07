import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HermesModule } from './hermes/hermes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'portal'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db-projects.cjukum6eu94v.us-east-2.rds.amazonaws.com',
      port: 5432,
      username: 'hermesUsers',
      password: '123',
      database: 'HERMES',
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    HermesModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
