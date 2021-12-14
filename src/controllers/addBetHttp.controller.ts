import { Request, Response } from 'express';
import addBet from '../core/interactors/addBet.interactor';

const addBetController = async (request: Request, response: Response) => {
  const { body } = request;
  const { address } = body;

  const bet = await addBet( address );

  response.json(bet);
}

export default addBetController;
