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
const _maxBets = gameConstants_1.BettingGameConstants.max_bets;
const _betImport = gameConstants_1.BettingGameConstants.amount;
const addBet = (contractRepository, localDataRepository) => (address) => __awaiter(void 0, void 0, void 0, function* () {
    let player;
    player = localDataRepository.getPlayerInfoByAddress(address);
    if (!player) {
        throw Error();
    }
    if (player.balance < _betImport) {
        throw Error();
    }
    let bet = yield contractRepository.bet(address, _betImport);
    if (!bet.address) {
        throw Error();
    }
    localDataRepository.saveBet(bet);
    console.log('Bet created');
    let openBets = localDataRepository.getOpenBets();
    if (openBets.length == _maxBets) {
        let winningBetIndex = Math.floor(Math.random() * _maxBets);
        let winningBet = openBets[winningBetIndex];
        yield contractRepository.runBets(openBets, winningBet);
        localDataRepository.updateBetsStatus(winningBet);
    }
    player = yield localDataRepository.getPlayerInfoByAddress(address);
    return player;
});
const localData = new localData_datasource_1.default();
const erc20Holdable = new erc20Holdable_datasource_1.default();
exports.default = addBet(erc20Holdable, localData);
//# sourceMappingURL=addBet.interactor.js.map