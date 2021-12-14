"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameConstants_1 = require("../gameConstants");
let playersInfo = {};
let openBets = [];
let totalBets = 0;
class LocalData {
    constructor() {
        this._maxBets = gameConstants_1.BettingGameConstants.max_bets;
        this._amount = gameConstants_1.BettingGameConstants.amount;
    }
    savePlayerInfo(player) {
        let address = player.address;
        playersInfo[address] = player;
    }
    getPlayerInfoByAddress(address) {
        let playerInfo = playersInfo[address];
        return playerInfo;
    }
    saveBet(bet) {
        openBets.push(bet);
        playersInfo[bet.address].bets.push(bet);
        playersInfo[bet.address].balance = playersInfo[bet.address].balance - this._amount;
        totalBets++;
    }
    getOpenBets() {
        return openBets;
    }
    updateBetsStatus(winningBet) {
        let winningBetId = winningBet.id;
        for (let i = 0; i < this._maxBets; i++) {
            let bet = openBets[i];
            if (bet.id === winningBetId) {
                bet.status = 'won';
                playersInfo[bet.address].balance = playersInfo[bet.address].balance + this._maxBets * this._amount;
            }
            else {
                bet.status = 'lost';
            }
        }
        openBets = [];
    }
}
exports.default = LocalData;
//# sourceMappingURL=localData.datasource.js.map