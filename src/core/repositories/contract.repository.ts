import Player from '../entities/Player';
import Bet from '../entities/Bet';

export default interface ContractRepository {

  // Creates a new account for a new player
  //
  // Returns the address of the new player
  newPlayerAddress(): Promise <string>;

  // Transfers _initialAmount from contract owner to address
  setInitialBalance(address: string, _initialAmount: number);

  // Holds amount from address to transfer to contract owner
  //
  // Returns the new Bet object
  bet(address: string, amount: number): Promise<Bet>;

  // Execute the holds in openBets and then
  // transfers the winning amount to the winner bet address.
  runBets(openBets, winnerBet);
}
