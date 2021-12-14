import express from 'express';
import bodyParser from 'body-parser';
import addPlayerController from './controllers/addPlayerHttp.controller';
import getPlayerInfoController from './controllers/getPlayerHttp.controller';
import addBetController from './controllers/addBetHttp.controller';

const PORT = 8080;

const app = express();
app.use(bodyParser.json());

app.post('/players', addPlayerController);

app.post('/bets', addBetController);

app.get('/players/:address', getPlayerInfoController);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
