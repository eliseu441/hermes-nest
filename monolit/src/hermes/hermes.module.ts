import { Module } from '@nestjs/common';
import { HermesService } from './hermes.service';
import { HermesController } from './hermes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hermes, Artist, Building, Inventor, RelationArtArtist, RelationImgBuilding  } from './entities/hermes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Hermes,
    Artist,
    Building,
    Inventor,
    RelationArtArtist,
    RelationImgBuilding
  ])],
  controllers: [HermesController],
  providers: [HermesService],
})
export class HermesModule {}