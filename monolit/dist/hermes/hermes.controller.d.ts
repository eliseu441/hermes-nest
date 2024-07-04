import { HermesService } from './hermes.service';
import { CreateHermesDto } from './dto/create-hermes.dto';
import { UpdateHermesDto } from './dto/update-hermes.dto';
export declare class HermesController {
    private readonly hermesService;
    constructor(hermesService: HermesService);
    getPaintersCombo(): Promise<any>;
    getSculptorsCombo(): Promise<any>;
    getBuildTable(): Promise<any>;
    getCenturyChoices(): Promise<any>;
    getBCbuilds(): Promise<any>;
    getArtists(page: string): Promise<import("./entities/hermes.entity").Artist[]>;
    getAllArts(id: string): Promise<import("./entities/hermes.entity").RelationArtArtist[]>;
    getSculpCarousel(id: string): Promise<any>;
    getBuildingDetails(id: number): Promise<any>;
    getImagesCentury(cent: string, type: string): Promise<any>;
    create(createHermesDto: CreateHermesDto): Promise<import("./entities/hermes.entity").Hermes>;
    findAll(): Promise<import("./entities/hermes.entity").Hermes[]>;
    findOne(id: string): Promise<import("./entities/hermes.entity").Hermes>;
    update(id: string, updateHermesDto: UpdateHermesDto): Promise<import("./entities/hermes.entity").Hermes>;
    remove(id: string): Promise<{
        affected?: number;
    }>;
}
