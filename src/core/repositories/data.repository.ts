import Player from '../entities/Player';
import Bet from '../entities/Bet';

export default interface LocalDataRepository {

  savePlayerInfo(player: Player);

  getPlayerInfoByAddress(address: string): Player;

  saveBet(bet: Bet);

  getOpenBets(): Array<Bet>;

  updateBetsStatus(winningBet: Bet);
}
