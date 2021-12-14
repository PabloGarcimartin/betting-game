import Bet from './Bet';

export default interface Player {
  address: string;
  name: string;
  balance: number;
  bets: Array<Bet>;
}
