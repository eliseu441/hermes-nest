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
exports.HermesController = void 0;
const common_1 = require("@nestjs/common");
const hermes_service_1 = require("./hermes.service");
const create_hermes_dto_1 = require("./dto/create-hermes.dto");
const update_hermes_dto_1 = require("./dto/update-hermes.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let HermesController = class HermesController {
    constructor(hermesService) {
        this.hermesService = hermesService;
    }
    getPaintersCombo() {
        return this.hermesService.getPaintersCombo();
    }
    getSculptorsCombo() {
        return this.hermesService.getSculptorsCombo();
    }
    getBuildTable() {
        return this.hermesService.getBuildTable();
    }
    getCenturyChoices() {
        return this.hermesService.getCenturyChoices();
    }
    getBCbuilds() {
        return this.hermesService.getBCbuilds();
    }
    getArtists(page) {
        let pageNumber = 0;
        if (page) {
            pageNumber = parseInt(page) * 3;
        }
        return this.hermesService.getBioArtists(pageNumber);
    }
    getAllArts(id) {
        let id_artitst = id ? parseInt(id) : 1;
        return this.hermesService.getAllArts(id_artitst);
    }
    getSculpCarousel(id) {
        let id_artitst = id ? parseInt(id) : 5;
        return this.hermesService.getSculpCarousel(id_artitst);
    }
    getBuildingDetails(id) {
        return this.hermesService.getBuildingDetails(id);
    }
    getImagesCentury(cent, type) {
        return this.hermesService.getImagesCentury(cent, type);
    }
    create(createHermesDto) {
        return this.hermesService.createHermes(createHermesDto);
    }
    findAll() {
        return this.hermesService.findAllHermes();
    }
    findOne(id) {
        return this.hermesService.viewHermes(+id);
    }
    update(id, updateHermesDto) {
        return this.hermesService.updateHermes(+id, updateHermesDto);
    }
    remove(id) {
        return this.hermesService.removeHermes(+id);
    }
};
exports.HermesController = HermesController;
__decorate([
    (0, common_1.Get)('/getPaintersCombo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getPaintersCombo", null);
__decorate([
    (0, common_1.Get)('/getSculptorsCombo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getSculptorsCombo", null);
__decorate([
    (0, common_1.Get)('/getBuildTable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getBuildTable", null);
__decorate([
    (0, common_1.Get)('/getCenturyChoices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getCenturyChoices", null);
__decorate([
    (0, common_1.Get)('/getBCbuilds'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getBCbuilds", null);
__decorate([
    (0, common_1.Get)('/getBioArtists/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getArtists", null);
__decorate([
    (0, common_1.Get)('/getAllArts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getAllArts", null);
__decorate([
    (0, common_1.Get)('/getSculpCarousel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getSculpCarousel", null);
__decorate([
    (0, common_1.Get)('/getBuildingDetails/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getBuildingDetails", null);
__decorate([
    (0, common_1.Get)('/getImagesCentury/:cent/:type'),
    __param(0, (0, common_1.Param)('cent')),
    __param(1, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "getImagesCentury", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hermes_dto_1.CreateHermesDto]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hermes_dto_1.UpdateHermesDto]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HermesController.prototype, "remove", null);
exports.HermesController = HermesController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [hermes_service_1.HermesService])
], HermesController);
//# sourceMappingURL=hermes.controller.js.map