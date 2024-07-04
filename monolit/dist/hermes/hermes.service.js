"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HermesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hermes_entity_1 = require("./entities/hermes.entity");
let HermesService = class HermesService {
    constructor(artistRepository, hermesRepository, SculptureArtistRepository, buildingRepository, inventorRepository, relationArtArtistRepository, relationImgBuildingRepository) {
        this.artistRepository = artistRepository;
        this.hermesRepository = hermesRepository;
        this.SculptureArtistRepository = SculptureArtistRepository;
        this.buildingRepository = buildingRepository;
        this.inventorRepository = inventorRepository;
        this.relationArtArtistRepository = relationArtArtistRepository;
        this.relationImgBuildingRepository = relationImgBuildingRepository;
    }
    createHermes(createHermesDto) {
        const hermes = new hermes_entity_1.Hermes();
        hermes.filme = createHermesDto.filme;
        return this.hermesRepository.save(hermes);
    }
    findAllHermes() {
        return this.hermesRepository.find();
    }
    viewHermes(id) {
        return this.hermesRepository.findOneBy({ id });
    }
    updateHermes(id, updateHermesDto) {
        const hermes = new hermes_entity_1.Hermes();
        hermes.filme = updateHermesDto.filme;
        hermes.id = id;
        return this.hermesRepository.save(hermes);
    }
    removeHermes(id) {
        return this.hermesRepository.delete(id);
    }
    async getBioArtists(page) {
        const artists = await this.artistRepository.find({
            order: {
                id: 'ASC',
            },
            skip: page,
            take: 3,
        });
        return artists;
    }
    async getAllArts(id) {
        const queryBuilder = this.relationArtArtistRepository.createQueryBuilder('A');
        const artists = await queryBuilder.select([
            'ROW_NUMBER() OVER (ORDER BY paint_name) AS ID_INDEX',
            'name',
            'id_artist',
            'paint_name',
            'year',
            'file_name',
        ])
            .innerJoin(hermes_entity_1.Artist, 'B', 'A.id_artist = B.id')
            .orderBy('A.paint_name')
            .where(id ? "A.id_artist = :id" : "", { id: id })
            .limit(7)
            .orderBy("id_index", "DESC")
            .getRawMany();
        return artists;
    }
    async getSculpCarousel(id) {
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getPaintersCombo() {
        try {
            const distinctArtists = await this.artistRepository
                .createQueryBuilder("A")
                .select("A.id", "id")
                .addSelect("A.name", "name")
                .innerJoin("tbf_relation_art_artists", "B", "A.id = B.id_artist")
                .distinct(true)
                .getRawMany();
            return distinctArtists;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getSculptorsCombo() {
        try {
            const distinctSculptureArtists = await this.artistRepository
                .createQueryBuilder("A")
                .select("A.id", "id")
                .addSelect("A.name", "name")
                .innerJoin("tbf_relation_sculpture_artists", "B", "A.id = B.id_artist")
                .distinct(true)
                .getRawMany();
            return distinctSculptureArtists;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBuildTable() {
        try {
            const buildings = await this.buildingRepository
                .createQueryBuilder("B")
                .select("B.id", "id")
                .addSelect("B.build", "build")
                .addSelect("B.country", "country")
                .addSelect("B.year", "year")
                .getRawMany();
            return buildings;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBuildingDetails(id_build) {
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getCenturyChoices() {
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getImagesCentury(cent, type) {
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBCbuilds() {
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.HermesService = HermesService;
exports.HermesService = HermesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hermes_entity_1.Artist)),
    __param(1, (0, typeorm_1.InjectRepository)(hermes_entity_1.Hermes)),
    __param(2, (0, typeorm_1.InjectRepository)(hermes_entity_1.SculptureArtist)),
    __param(3, (0, typeorm_1.InjectRepository)(hermes_entity_1.Building)),
    __param(4, (0, typeorm_1.InjectRepository)(hermes_entity_1.Inventor)),
    __param(5, (0, typeorm_1.InjectRepository)(hermes_entity_1.RelationArtArtist)),
    __param(6, (0, typeorm_1.InjectRepository)(hermes_entity_1.RelationImgBuilding)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HermesService);
//# sourceMappingURL=hermes.service.js.map