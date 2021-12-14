import Player from '../entities/Player';
import LocalDataRepository from '../repositories/data.repository';

import LocalData from '../../dataSources/localData.datasource';

const getPlayerInfoByAddress = (localDataRepository: LocalDataRepository) => async ( address: string ): Promise<Player> => {

  const player: Player = await localDataRepository.getPlayerInfoByAddress(address);

  return player;
}

const localData = new LocalData();
export default getPlayerInfoByAddress( localData );
