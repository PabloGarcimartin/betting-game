import Player from '../entities/Player';
import Bet from '../entities/Bet';

export default interface LocalDataRepository {

  //Stores new player data
  savePlayerInfo(player: Player);

  //Gets player info by address
  getPlayerInfoByAddress(address: string): Player;

  //Stores bet data
  saveBet(bet: Bet);

  //Gets open bets
  getOpenBets(): Array<Bet>;

  //Sets winningBet as 'won' and the rest of openBets as 'lost'
  updateBetsStatus(winningBet: Bet);
}
