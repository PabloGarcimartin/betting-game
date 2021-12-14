import Bet from '../entities/Bet';
import Player from '../entities/Player';

import ContractRepository from '../repositories/contract.repository';
import LocalDataRepository from '../repositories/data.repository';

import LocalData from '../../dataSources/localData.datasource';
import Erc20Holdable from '../../dataSources/erc20Holdable.datasource';
import { BettingGameConstants } from '../../gameConstants';

const _maxBets = BettingGameConstants.max_bets;
const _betImport = BettingGameConstants.amount;

const addBet = (contractRepository: ContractRepository, localDataRepository: LocalDataRepository) => async (address: string): Promise<Player> => {

  let player:Player;
  player = localDataRepository.getPlayerInfoByAddress( address );

  if(!player){
    throw Error();
  }

  if( player.balance < _betImport ){
    throw Error();
  }

  let bet = await contractRepository.bet( address, _betImport );

  if( !bet.address ){
    throw Error();
  }

  localDataRepository.saveBet( bet );
  console.log('Bet created');

  let openBets = localDataRepository.getOpenBets();

  if( openBets.length == _maxBets ){

    let winningBetIndex = Math.floor(Math.random() * _maxBets);
    let winningBet = openBets[winningBetIndex];

    await contractRepository.runBets(openBets, winningBet);
    localDataRepository.updateBetsStatus(winningBet);
  }

  player = await localDataRepository.getPlayerInfoByAddress( address );
  return player;
}

const localData = new LocalData();
const erc20Holdable = new Erc20Holdable();
export default addBet( erc20Holdable, localData );
