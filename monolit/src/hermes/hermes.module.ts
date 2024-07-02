import { Module } from '@nestjs/common';
import { HermesService } from './hermes.service';
import { HermesController } from './hermes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hermes } from './entities/hermes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hermes])],
  controllers: [HermesController],
  providers: [HermesService],
})
export class HermesModule {}