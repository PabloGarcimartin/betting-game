import Web3 from 'web3';
import fs from 'fs';
import ContractRepository from '../core/repositories/contract.repository';
import Player from '../core/entities/Player';
import Bet from '../core/entities/Bet';
import { BettingGameConstants } from '../gameConstants';

let web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:9545'));
let contractAbi = JSON.parse(fs.readFileSync('./build/contracts/ERC20Holdable.json', 'utf8'));
let contractAddress = contractAbi.networks['5777'].address;
let totalBets = 0;
let contract = new web3.eth.Contract(contractAbi.abi, contractAddress);
let players = [];

export default class Erc20Holdable implements ContractRepository {

  private _maxBets = BettingGameConstants.max_bets;
  private _initialBalance = BettingGameConstants.initial_balance;
  private _amount = BettingGameConstants.amount;
  private _gasLimit = web3.utils.toWei('1');

  public async newPlayerAddress(): Promise <string>{

    let accounts = await this.getAccounts();
    let newPlayerAddress;
    if( players.length == accounts.length - 1) {
      let newPlayerAccount = await web3.eth.accounts.create();
      newPlayerAddress = newPlayerAccount.address;
      accounts.push(newPlayerAddress);
    } else {
      newPlayerAddress = accounts[players.length + 1];
    }

    players.push(newPlayerAddress);


    return newPlayerAddress;
  }

  public async setInitialBalance( address: string, _initialAmount: number ){

    let accounts = await this.getAccounts();
    let owner = accounts[0];

    await contract.methods.transfer(address, web3.utils.toWei(_initialAmount.toString())).send({from: owner}).then(result => {
      console.log('Initial balance sent to new player');
    }).catch(err => {
      console.log('Error: ' + err);
      return err;
    });
  }

  public async bet( address: string, amount: number ): Promise <Bet>{
    let bet: Bet;
    let accounts = await this.getAccounts();
    let owner = accounts[0];

    try {
      let estimatedGas = await contract.methods.hold(totalBets, owner, web3.utils.toWei( amount.toString() )).estimateGas({from: address});
      await contract.methods.hold(totalBets,owner, web3.utils.toWei( amount.toString() )).send({from: address, gas: estimatedGas})
      .then( result => {

        if( result.status ){

          bet = {
            id: totalBets,
            address: address,
            status: 'pending',
            amount: amount
          }

          totalBets = totalBets + 1;
          console.log(bet);
        }
      }).catch(err => {
        console.log('Error: ' + err);
      });
    } catch (error) {
      console.log('Error: ' + error);
    }
    return bet;
  }

  public async runBets(openBets: Array<Bet>, winningBet: Bet){
    let accounts = await this.getAccounts();
    let owner = accounts[0];

    for( let i = 0; i<this._maxBets; i++ ){

        let bet = openBets[i];

        let estimatedGas = await contract.methods.executeHold(bet.id).estimateGas({from:owner});

        await contract.methods.executeHold(bet.id).send({from: owner, gas: estimatedGas}).then(result => {
          console.log('HOLD EXECUTED');
        }).catch(err => {
          console.log('Error: ' + err);
          return err;
        });
    }

    let res = await contract.methods.transfer(winningBet.address, web3.utils.toWei((this._maxBets*winningBet.amount).toString())).send({from: owner}).then(result => {
      console.log('WINNER MONEY TRANSFERRED');
    }).catch(err => {
      console.log('Error: ' + err);
      return err;
    });

  }

  private async getAccounts(): Promise <Array<String>>{
      let accounts = await web3.eth.getAccounts();
      return accounts;
  }

}
