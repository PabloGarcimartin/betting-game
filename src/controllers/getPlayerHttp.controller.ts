import { Request, Response } from 'express';
import getPlayerInfoByAddress from '../core/interactors/getPlayerInfo.interactor';

const getPlayerInfoController = async (request: Request, response: Response) => {

  const { params } = request;
  console.log(params);
  const { address } = params;

  const player = await getPlayerInfoByAddress( address );

  response.json(player);
}

export default getPlayerInfoController;
