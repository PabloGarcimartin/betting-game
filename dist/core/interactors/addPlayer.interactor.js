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
const erc20Holdable_datasource_1 = __importDefault(require("../../dataSources/erc20Holdable.datasource"));
const gameConstants_1 = require("../../gameConstants");
const _initialAmount = gameConstants_1.BettingGameConstants.initial_balance;
const addPlayer = (contractRepository, localDataRepository) => (name) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield contractRepository.newPlayerAddress();
    yield contractRepository.setInitialBalance(address, _initialAmount);
    const player = {
        address: address,
        name: name,
        balance: _initialAmount,
        bets: []
    };
    localDataRepository.savePlayerInfo(player);
    return player;
});
const localData = new localData_datasource_1.default();
const erc20Holdable = new erc20Holdable_datasource_1.default();
exports.default = addPlayer(erc20Holdable, localData);
//# sourceMappingURL=addPlayer.interactor.js.map