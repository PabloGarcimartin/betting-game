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
const web3_1 = __importDefault(require("web3"));
const fs_1 = __importDefault(require("fs"));
const gameConstants_1 = require("../gameConstants");
let web3 = new web3_1.default(new web3_1.default.providers.HttpProvider('HTTP://127.0.0.1:9545'));
let contractAbi = JSON.parse(fs_1.default.readFileSync('./build/contracts/ERC20Holdable.json', 'utf8'));
let contractAddress = contractAbi.networks['5777'].address;
let totalBets = 0;
let contract = new web3.eth.Contract(contractAbi.abi, contractAddress);
let players = [];
class Erc20Holdable {
    constructor() {
        this._maxBets = gameConstants_1.BettingGameConstants.max_bets;
        this._initialBalance = gameConstants_1.BettingGameConstants.initial_balance;
        this._amount = gameConstants_1.BettingGameConstants.amount;
        this._bet_pending = gameConstants_1.BettingGameConstants.bet_pending;
        this._gasLimit = web3.utils.toWei('1');
    }
    newPlayerAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = yield this.getAccounts();
            let newPlayerAddress;
            if (players.length == accounts.length - 1) {
                let newPlayerAccount = yield web3.eth.accounts.create();
                newPlayerAddress = newPlayerAccount.address;
                accounts.push(newPlayerAddress);
            }
            else {
                newPlayerAddress = accounts[players.length + 1];
            }
            players.push(newPlayerAddress);
            return newPlayerAddress;
        });
    }
    setInitialBalance(address, _initialAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = yield this.getAccounts();
            let owner = accounts[0];
            yield contract.methods.transfer(address, web3.utils.toWei(_initialAmount.toString())).send({ from: owner }).then(result => {
                console.log('Initial balance sent to new player');
            }).catch(err => {
                console.log('Error: ' + err);
                return err;
            });
        });
    }
    bet(address, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let bet;
            let accounts = yield this.getAccounts();
            let owner = accounts[0];
            try {
                let estimatedGas = yield contract.methods.hold(totalBets, owner, web3.utils.toWei(amount.toString())).estimateGas({ from: address });
                yield contract.methods.hold(totalBets, owner, web3.utils.toWei(amount.toString())).send({ from: address, gas: estimatedGas })
                    .then(result => {
                    if (result.status) {
                        bet = {
                            id: totalBets,
                            address: address,
                            status: this._bet_pending,
                            amount: amount
                        };
                        totalBets = totalBets + 1;
                        console.log(bet);
                    }
                }).catch(err => {
                    console.log('Error: ' + err);
                });
            }
            catch (error) {
                console.log('Error: ' + error);
            }
            return bet;
        });
    }
    runBets(openBets, winningBet) {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = yield this.getAccounts();
            let owner = accounts[0];
            for (let i = 0; i < this._maxBets; i++) {
                let bet = openBets[i];
                let estimatedGas = yield contract.methods.executeHold(bet.id).estimateGas({ from: owner });
                yield contract.methods.executeHold(bet.id).send({ from: owner, gas: estimatedGas }).then(result => {
                    console.log('HOLD EXECUTED');
                }).catch(err => {
                    console.log('Error: ' + err);
                    return err;
                });
            }
            yield contract.methods.transfer(winningBet.address, web3.utils.toWei((this._maxBets * winningBet.amount).toString())).send({ from: owner }).then(result => {
                console.log('WINNER MONEY TRANSFERRED');
            }).catch(err => {
                console.log('Error: ' + err);
                return err;
            });
        });
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = yield web3.eth.getAccounts();
            return accounts;
        });
    }
}
exports.default = Erc20Holdable;
//# sourceMappingURL=erc20Holdable.datasource.js.map