import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateHermesDto } from './dto/create-hermes.dto';
import { UpdateHermesDto } from './dto/update-hermes.dto';
import { Hermes, Artist, SculptureArtist, Building, Inventor, RelationArtArtist, RelationImgBuilding } from './entities/hermes.entity';

@Injectable()
export class HermesService {
  constructor(
    @InjectRepository(Artist) private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Hermes) private readonly hermesRepository: Repository<Hermes>,
    @InjectRepository(SculptureArtist) private readonly SculptureArtistRepository: Repository<SculptureArtist>,
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
    .orderBy("id_index", "DESC")
    .getRawMany();
    return artists;
  }
  async getSculpCarousel(id: number): Promise<any> {
    try {
      let idArtist = id;
  
      const queryBuilder = this.SculptureArtistRepository
        .createQueryBuilder("A")
        .select("ROW_NUMBER() OVER (ORDER BY A.sculpture)", "id_index")
        .addSelect("B.name", "name")
        .addSelect("A.id_artist", "id_artist")
        .addSelect("A.sculpture", "sculpture")
        .addSelect("A.year", "year")
        .addSelect("A.file_name", "file_name")
        .innerJoin("tbf_artists", "B", "A.id_artist = B.id")
        .where("A.id_artist = :id_artist", { id_artist: id })
        .orderBy("id_index", "ASC");
  
      const result = await queryBuilder.getRawMany();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getPaintersCombo(): Promise<any> {
    try {
      const distinctArtists = await this.artistRepository
        .createQueryBuilder("A")
        .select("A.id", "id")
        .addSelect("A.name", "name")
        .innerJoin("tbf_relation_art_artists", "B", "A.id = B.id_artist")
        .distinct(true)
        .getRawMany();
      return distinctArtists;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getSculptorsCombo(): Promise<any> {
    try {
      const distinctSculptureArtists = await this.artistRepository
        .createQueryBuilder("A")
        .select("A.id", "id")
        .addSelect("A.name", "name")
        .innerJoin("tbf_relation_sculpture_artists", "B", "A.id = B.id_artist")
        .distinct(true)
        .getRawMany();
      return distinctSculptureArtists;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getBuildTable(): Promise<any> {
    try {
      const buildings = await this.buildingRepository
        .createQueryBuilder("B")
        .select("B.id", "id")
        .addSelect("B.build", "build")
        .addSelect("B.country", "country")
        .addSelect("B.year", "year")
        .getRawMany();
      return buildings;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getBuildingDetails(id_build: number): Promise<any> {
    try {

      const images = await this.relationImgBuildingRepository
        .createQueryBuilder("A")
        .select("B.id", "id")
        .addSelect("B.build", "build")
        .addSelect("B.country", "country")
        .addSelect("B.year", "year")
        .addSelect("CONCAT(B.file_name, A.file_name)", "path_name")
        .innerJoin("tbf_buildings", "B", "A.id_build = B.id")
        .where("A.id_build = :idBuild", { idBuild: id_build })
        .getRawMany();
  
      const descriptions = await this.buildingRepository
        .createQueryBuilder("B")
        .select("B.id", "id")
        .addSelect("CONCAT(B.build, '-', B.country)", "title")
        .addSelect("B.description", "description")
        .where("B.id = :id", { id: id_build })
        .limit(1)
        .getRawOne();
  
      return { images, descriptions };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getCenturyChoices(): Promise<any> {
    try {
      const paints = await this.artistRepository
        .query(`
          SELECT 
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_ART_ARTISTS WHERE YEAR BETWEEN 1200 AND 1299
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XIII_PAINT,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_ART_ARTISTS WHERE YEAR BETWEEN 1300 AND 1399
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XIV_PAINT,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_ART_ARTISTS WHERE YEAR BETWEEN 1400 AND 1499
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XV_PAINT,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_ART_ARTISTS WHERE YEAR BETWEEN 1500 AND 1599
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XVI_PAINT,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_ART_ARTISTS WHERE YEAR BETWEEN 1600 AND 1699
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XVII_PAINT,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_ART_ARTISTS WHERE YEAR BETWEEN 1700 AND 1799
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XVIII_PAINT,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_ART_ARTISTS WHERE YEAR BETWEEN 1800 AND 1899
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XIX_PAINT
        `);
  
      const sculps = await this.SculptureArtistRepository
        .query(`
          SELECT 
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_SCULPTURE_ARTISTS WHERE YEAR BETWEEN 1200 AND 1299
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XIII_SCULP,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_SCULPTURE_ARTISTS WHERE YEAR BETWEEN 1300 AND 1399
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XIV_SCULP,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_SCULPTURE_ARTISTS WHERE YEAR BETWEEN 1400 AND 1499
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XV_SCULP,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_SCULPTURE_ARTISTS WHERE YEAR BETWEEN 1500 AND 1599
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XVI_SCULP,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_SCULPTURE_ARTISTS WHERE YEAR BETWEEN 1600 AND 1699
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XVII_SCULP,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_SCULPTURE_ARTISTS WHERE YEAR BETWEEN 1700 AND 1799
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XVIII_SCULP,
            (CASE WHEN EXISTS (
              SELECT ID FROM TBF_RELATION_SCULPTURE_ARTISTS WHERE YEAR BETWEEN 1800 AND 1899
            ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) AS XIX_SCULP
        `);
  
      return [{ paints, sculps }];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getImagesCentury(cent: string, type: string): Promise<any> {
    try {
      let where = '';
      switch (cent) {
        case 'XIII':
          where = 'YEAR BETWEEN 1200 AND 1299';
          break;
        case 'XIV':
          where = 'YEAR BETWEEN 1300 AND 1399';
          break;
        case 'XV':
          where = 'YEAR BETWEEN 1400 AND 1499';
          break;
        case 'XVI':
          where = 'YEAR BETWEEN 1500 AND 1599';
          break;
        case 'XVII':
          where = 'YEAR BETWEEN 1600 AND 1699';
          break;
        case 'XVIII':
          where = 'YEAR BETWEEN 1700 AND 1799';
          break;
        case 'XIX':
          where = 'YEAR BETWEEN 1800 AND 1899';
          break;
        default:
          throw new Error('century parameter invalid');
      }
  
      let sql = '';
      switch (type) {
        case '1':
          sql = `SELECT ID, ID_ARTIST, SCULPTURE, YEAR, FILE_NAME FROM TBF_RELATION_SCULPTURE_ARTISTS WHERE ${where} ORDER BY ID_ARTIST`;
          break;
        case '2':
          sql = `SELECT  ID, ID_ARTIST, PAINT_NAME, YEAR, FILE_NAME FROM TBF_RELATION_ART_ARTISTS WHERE ${where} ORDER BY ID_ARTIST`;
          break;
        case '3':
          sql = `SELECT BUILD, COUNTRY, YEAR, CONCAT(A.FILE_NAME, B.FILE_NAME) AS PATH_NAME, DESCRIPTION FROM TBF_BUILDINGS AS A RIGHT JOIN TBF_RELATION_IMG_BUILDINGS AS B ON A.ID = B.ID_BUILD WHERE ${where} ORDER BY BUILD`;
          break;
        default:
          throw new Error('type parameter invalid');
      }
  
      const result = await this.artistRepository.query(sql);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async getBCbuilds(): Promise<any> {
    try {
      const sql = `
        SELECT
          BUILD,
          COUNTRY,
          REPLACE(CAST(YEAR AS VARCHAR), '-', 'BC.') as YEAR,
          CONCAT(A.FILE_NAME, B.FILE_NAME) AS PATH_NAME,
          DESCRIPTION
        FROM TBF_BUILDINGS AS A
        RIGHT JOIN TBF_RELATION_IMG_BUILDINGS AS B ON A.ID = B.ID_BUILD
        WHERE YEAR < 0 ORDER BY BUILD
      `;
    
      const result = await this.artistRepository.query(sql);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }

  }
}