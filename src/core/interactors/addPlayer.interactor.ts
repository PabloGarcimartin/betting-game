import Player from '../entities/Player';
import ContractRepository from '../repositories/contract.repository';
import LocalDataRepository from '../repositories/data.repository';

import LocalData from '../../dataSources/localData.datasource';
import Erc20Holdable from '../../dataSources/erc20Holdable.datasource';
import { BettingGameConstants } from '../../gameConstants';

const _initialAmount = BettingGameConstants.initial_balance;

const addPlayer = (contractRepository: ContractRepository, localDataRepository: LocalDataRepository) => async (name: string): Promise<Player> => {

  const address: string = await contractRepository.newPlayerAddress();

  await contractRepository.setInitialBalance(address, _initialAmount);

  const player: Player = {
    address: address,
    name: name,
    balance: _initialAmount,
    bets: []
  }

  localDataRepository.savePlayerInfo(player);

  return player;
}

const localData = new LocalData();
const erc20Holdable = new Erc20Holdable();
export default addPlayer( erc20Holdable, localData );
