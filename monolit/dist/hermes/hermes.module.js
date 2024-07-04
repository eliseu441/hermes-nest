"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HermesModule = void 0;
const common_1 = require("@nestjs/common");
const hermes_service_1 = require("./hermes.service");
const hermes_controller_1 = require("./hermes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const hermes_entity_1 = require("./entities/hermes.entity");
let HermesModule = class HermesModule {
};
exports.HermesModule = HermesModule;
exports.HermesModule = HermesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                hermes_entity_1.Hermes,
                hermes_entity_1.Artist,
                hermes_entity_1.Building,
                hermes_entity_1.Inventor,
                hermes_entity_1.RelationArtArtist,
                hermes_entity_1.RelationImgBuilding,
                hermes_entity_1.SculptureArtist
            ])],
        controllers: [hermes_controller_1.HermesController],
        providers: [hermes_service_1.HermesService],
    })
], HermesModule);
//# sourceMappingURL=hermes.module.js.map