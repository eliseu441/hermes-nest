export declare class Hermes {
    id: number;
    filme: string;
}
export declare class Artist {
    id: number;
    name: string;
    nacionality: string;
    born: number;
    death: number;
    bio: string;
    icon: string;
}
export declare class SculptureArtist {
    id: number;
    idArtist: number;
    sculpture: string;
    year: number;
    fileName: string;
}
export declare class Building {
    id: number;
    build: string;
    country: string;
    year: string;
    file_name: string;
    description: string;
}
export declare class Inventor {
    id: number;
    name: string;
    invention: string;
    invention_year: string;
    invention_description: string;
    file_name: string;
}
export declare class RelationArtArtist {
    id: number;
    id_artist: number;
    paint_name: string;
    year: number;
    file_name: string;
    artist: Artist;
}
export declare class RelationImgBuilding {
    id: number;
    id_build: number;
    file_name: string;
    building: Building;
}
