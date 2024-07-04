"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHermesDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hermes_dto_1 = require("./create-hermes.dto");
class UpdateHermesDto extends (0, mapped_types_1.PartialType)(create_hermes_dto_1.CreateHermesDto) {
}
exports.UpdateHermesDto = UpdateHermesDto;
//# sourceMappingURL=update-hermes.dto.js.map