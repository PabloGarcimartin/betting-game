import Player from '../entities/Player';
import Bet from '../entities/Bet';

export default interface ContractRepository {

  newPlayerAddress(): Promise <string>;

  setInitialBalance(address: string, _initialAmount: number);

  bet(address: string, amount: number): Promise<Bet>;

  runBets(openBets, winnerBet);
}
