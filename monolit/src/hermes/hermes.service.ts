import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateHermesDto } from './dto/create-hermes.dto';
import { UpdateHermesDto } from './dto/update-hermes.dto';
import { Hermes, Artist, Building, Inventor, RelationArtArtist, RelationImgBuilding } from './entities/hermes.entity';

@Injectable()
export class HermesService {
  constructor(
    @InjectRepository(Artist) private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Hermes) private readonly hermesRepository: Repository<Hermes>,
    @InjectRepository(Building) private readonly buildingRepository: Repository<Building>,
    @InjectRepository(Inventor) private readonly inventorRepository: Repository<Inventor>,
    @InjectRepository(RelationArtArtist) private readonly relationArtArtistRepository: Repository<RelationArtArtist>,
    @InjectRepository(RelationImgBuilding) private readonly relationImgBuildingRepository: Repository<RelationImgBuilding>,
    
  ) {}

  createHermes(createHermesDto: CreateHermesDto): Promise<Hermes> {
    const hermes: Hermes = new Hermes();
    hermes.filme = createHermesDto.filme;
    return this.hermesRepository.save(hermes);
  }

  findAllHermes(): Promise<Hermes[]> {
    return this.hermesRepository.find();
  }

  viewHermes(id: number): Promise<Hermes> {
    return this.hermesRepository.findOneBy({ id });
  }

  updateHermes(id: number, updateHermesDto: UpdateHermesDto): Promise<Hermes> {
    const hermes: Hermes = new Hermes();
    hermes.filme = updateHermesDto.filme;
    hermes.id = id;
    return this.hermesRepository.save(hermes);
  }
  removeHermes(id: number): Promise<{ affected?: number }> {
    return this.hermesRepository.delete(id);
  }
  //////
  async getBioArtists(page: number): Promise<Artist[]> {
    const artists = await this.artistRepository.find({
      order: {
        id: 'ASC', 
      },
      skip: page,
      take: 3,
    });
    return artists;
  }

  
  async getAllArts(id: number): Promise<RelationArtArtist[]> {
    const queryBuilder: SelectQueryBuilder<RelationArtArtist> = this.relationArtArtistRepository.createQueryBuilder('A');

    const artists = await queryBuilder.select([
      'ROW_NUMBER() OVER (ORDER BY paint_name) AS ID_INDEX',
      'name',
      'id_artist',
      'paint_name',
      'year',
      'file_name',
    ])
    .innerJoin(Artist, 'B', 'A.id_artist = B.id')
    .orderBy('A.paint_name')
    .where(
      id ? "A.id_artist = :id" : "", { id: id  }
    )
    .limit(7)
    .getRawMany();
    return artists;
  }
  getSculpCarousel(id: number): Promise<{ affected?: number }> {
    return this.hermesRepository.delete(id);
  }
  getPaintersCombo(id: number): Promise<{ affected?: number }> {
    return this.hermesRepository.delete(id);
  }

}