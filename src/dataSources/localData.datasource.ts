import LocalDataRepository from '../core/repositories/data.repository';
import Player from '../core/entities/Player';
import Bet from '../core/entities/Bet';
import { BettingGameConstants } from '../gameConstants';

let playersInfo = {};
let openBets: Array<Bet> = [];
let totalBets = 0;

export default class LocalData implements LocalDataRepository {

  private _maxBets = BettingGameConstants.max_bets;
  private _amount = BettingGameConstants.amount;

  public savePlayerInfo( player: Player ){
    let address = player.address;

    playersInfo[address] = player;
  }

  public getPlayerInfoByAddress( address: string ){
    let playerInfo = playersInfo[address];

    return playerInfo;
  }

  public saveBet( bet: Bet ){
    openBets.push(bet);
    playersInfo[bet.address].bets.push(bet);
    playersInfo[bet.address].balance = playersInfo[bet.address].balance - this._amount;
    totalBets++;
  }

  public getOpenBets(){
    return openBets;
  }

  public updateBetsStatus(winningBet){

    let winningBetId = winningBet.id;

    for( let i = 0; i<this._maxBets; i++ ){

      let bet = openBets[i];
      if(bet.id === winningBetId){
        bet.status = 'won';
        playersInfo[bet.address].balance = playersInfo[bet.address].balance + this._maxBets*this._amount;
      } else {
        bet.status = 'lost';
      }
    }

    openBets = [];
  }

}
