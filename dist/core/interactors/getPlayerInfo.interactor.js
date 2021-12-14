"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localData_datasource_1 = __importDefault(require("../../dataSources/localData.datasource"));
const getPlayerInfoByAddress = (localDataRepository) => (address) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield localDataRepository.getPlayerInfoByAddress(address);
    return player;
});
const localData = new localData_datasource_1.default();
exports.default = getPlayerInfoByAddress(localData);
//# sourceMappingURL=getPlayerInfo.interactor.js.map