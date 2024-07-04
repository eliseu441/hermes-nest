import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
@Entity()
export class Hermes {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  filme: string;
}

@Entity({ name: 'tbf_artists' })
export class Artist {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 15 })
    nacionality: string;

    @Column({ nullable: true })
    born: number;

    @Column({ nullable: true })
    death: number;

    @Column({ length: 900, nullable: true })
    bio: string;

    @Column({ length: 50, nullable: true })
    icon: string;

}

@Entity({ name: 'tbf_relation_sculpture_artists' })
export class SculptureArtist {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_artist' })
    idArtist: number;

    @Column()
    sculpture: string;

    @Column({ nullable: true })
    year: number;

    @Column({ name: 'file_name' })
    fileName: string;

}
@Entity({ name: 'tbf_buildings' })
export class Building {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    build: string;

    @Column({ length: 200 })
    country: string;

    @Column({ length: 10, nullable: true })
    year: string;

    @Column({ length: 150, nullable: true })
    file_name: string;

    @Column({ length: 1000, nullable: true })
    description: string;

}

@Entity({ name: 'tbf_inventors' })
export class Inventor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 150 })
    invention: string;

    @Column({ length: 15 })
    invention_year: string;

    @Column({ length: 900, nullable: true })
    invention_description: string;

    @Column({ length: 50, nullable: true })
    file_name: string;

}

@Entity({ name: 'tbf_relation_art_artists' })
export class RelationArtArtist {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_artist: number;

    @Column({ length: 200 })
    paint_name: string;

    @Column({ nullable: true })
    year: number;

    @Column({ length: 150, nullable: true })
    file_name: string;

    // Define the Many-to-One relationship with Artist
    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'id_artist' })
    artist: Artist;

}
@Entity({ name: 'tbf_relation_img_buildings' })
export class RelationImgBuilding {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_build: number;

    @Column({ length: 150, nullable: true })
    file_name: string;

    // Define the Many-to-One relationship with Building
    @ManyToOne(() => Building)
    @JoinColumn({ name: 'id_build' })
    building: Building;

}