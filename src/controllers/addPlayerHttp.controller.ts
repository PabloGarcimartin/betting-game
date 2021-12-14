import { Request, Response } from 'express';
import addPlayer from '../core/interactors/addPlayer.interactor';

const addPlayerController = async (request: Request, response: Response) => {
  const { body } = request;
  const { name } = body;

  const player = await addPlayer( name );

  response.json(player);
}

export default addPlayerController;
