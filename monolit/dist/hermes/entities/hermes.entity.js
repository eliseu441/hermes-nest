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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationImgBuilding = exports.RelationArtArtist = exports.Inventor = exports.Building = exports.SculptureArtist = exports.Artist = exports.Hermes = void 0;
const typeorm_1 = require("typeorm");
let Hermes = class Hermes {
};
exports.Hermes = Hermes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Hermes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], Hermes.prototype, "filme", void 0);
exports.Hermes = Hermes = __decorate([
    (0, typeorm_1.Entity)()
], Hermes);
let Artist = class Artist {
};
exports.Artist = Artist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Artist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Artist.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], Artist.prototype, "nacionality", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Artist.prototype, "born", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Artist.prototype, "death", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 900, nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "icon", void 0);
exports.Artist = Artist = __decorate([
    (0, typeorm_1.Entity)({ name: 'tbf_artists' })
], Artist);
let SculptureArtist = class SculptureArtist {
};
exports.SculptureArtist = SculptureArtist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SculptureArtist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_artist' }),
    __metadata("design:type", Number)
], SculptureArtist.prototype, "idArtist", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SculptureArtist.prototype, "sculpture", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SculptureArtist.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    __metadata("design:type", String)
], SculptureArtist.prototype, "fileName", void 0);
exports.SculptureArtist = SculptureArtist = __decorate([
    (0, typeorm_1.Entity)({ name: 'tbf_relation_sculpture_artists' })
], SculptureArtist);
let Building = class Building {
};
exports.Building = Building;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Building.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Building.prototype, "build", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Building.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Building.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Building.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1000, nullable: true }),
    __metadata("design:type", String)
], Building.prototype, "description", void 0);
exports.Building = Building = __decorate([
    (0, typeorm_1.Entity)({ name: 'tbf_buildings' })
], Building);
let Inventor = class Inventor {
};
exports.Inventor = Inventor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Inventor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Inventor.prototype, "invention", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], Inventor.prototype, "invention_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 900, nullable: true }),
    __metadata("design:type", String)
], Inventor.prototype, "invention_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Inventor.prototype, "file_name", void 0);
exports.Inventor = Inventor = __decorate([
    (0, typeorm_1.Entity)({ name: 'tbf_inventors' })
], Inventor);
let RelationArtArtist = class RelationArtArtist {
};
exports.RelationArtArtist = RelationArtArtist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RelationArtArtist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RelationArtArtist.prototype, "id_artist", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], RelationArtArtist.prototype, "paint_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], RelationArtArtist.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], RelationArtArtist.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Artist),
    (0, typeorm_1.JoinColumn)({ name: 'id_artist' }),
    __metadata("design:type", Artist)
], RelationArtArtist.prototype, "artist", void 0);
exports.RelationArtArtist = RelationArtArtist = __decorate([
    (0, typeorm_1.Entity)({ name: 'tbf_relation_art_artists' })
], RelationArtArtist);
let RelationImgBuilding = class RelationImgBuilding {
};
exports.RelationImgBuilding = RelationImgBuilding;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RelationImgBuilding.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RelationImgBuilding.prototype, "id_build", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], RelationImgBuilding.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Building),
    (0, typeorm_1.JoinColumn)({ name: 'id_build' }),
    __metadata("design:type", Building)
], RelationImgBuilding.prototype, "building", void 0);
exports.RelationImgBuilding = RelationImgBuilding = __decorate([
    (0, typeorm_1.Entity)({ name: 'tbf_relation_img_buildings' })
], RelationImgBuilding);
//# sourceMappingURL=hermes.entity.js.map