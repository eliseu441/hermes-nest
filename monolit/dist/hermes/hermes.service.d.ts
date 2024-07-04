import { Repository } from 'typeorm';
import { CreateHermesDto } from './dto/create-hermes.dto';
import { UpdateHermesDto } from './dto/update-hermes.dto';
import { Hermes, Artist, SculptureArtist, Building, Inventor, RelationArtArtist, RelationImgBuilding } from './entities/hermes.entity';
export declare class HermesService {
    private readonly artistRepository;
    private readonly hermesRepository;
    private readonly SculptureArtistRepository;
    private readonly buildingRepository;
    private readonly inventorRepository;
    private readonly relationArtArtistRepository;
    private readonly relationImgBuildingRepository;
    constructor(artistRepository: Repository<Artist>, hermesRepository: Repository<Hermes>, SculptureArtistRepository: Repository<SculptureArtist>, buildingRepository: Repository<Building>, inventorRepository: Repository<Inventor>, relationArtArtistRepository: Repository<RelationArtArtist>, relationImgBuildingRepository: Repository<RelationImgBuilding>);
    createHermes(createHermesDto: CreateHermesDto): Promise<Hermes>;
    findAllHermes(): Promise<Hermes[]>;
    viewHermes(id: number): Promise<Hermes>;
    updateHermes(id: number, updateHermesDto: UpdateHermesDto): Promise<Hermes>;
    removeHermes(id: number): Promise<{
        affected?: number;
    }>;
    getBioArtists(page: number): Promise<Artist[]>;
    getAllArts(id: number): Promise<RelationArtArtist[]>;
    getSculpCarousel(id: number): Promise<any>;
    getPaintersCombo(): Promise<any>;
    getSculptorsCombo(): Promise<any>;
    getBuildTable(): Promise<any>;
    getBuildingDetails(id_build: number): Promise<any>;
    getCenturyChoices(): Promise<any>;
    getImagesCentury(cent: string, type: string): Promise<any>;
    getBCbuilds(): Promise<any>;
}
