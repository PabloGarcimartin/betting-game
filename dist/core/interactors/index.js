"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addPlayer_interactor_1 = __importDefault(require("./addPlayer.interactor"));
const erc20Holdable_datasource_1 = __importDefault(require("../../dataSources/erc20Holdable.datasource"));
const playerRepository = new erc20Holdable_datasource_1.default();
//Aqui se ponen las otras implementaciones
exports.default = (0, addPlayer_interactor_1.default)(playerRepository);
//export default addPlayer(playerRepository);
//# sourceMappingURL=index.js.map