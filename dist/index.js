"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const addPlayerHttp_controller_1 = __importDefault(require("./controllers/addPlayerHttp.controller"));
const getPlayerHttp_controller_1 = __importDefault(require("./controllers/getPlayerHttp.controller"));
const addBetHttp_controller_1 = __importDefault(require("./controllers/addBetHttp.controller"));
const PORT = 8080;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post('/players', addPlayerHttp_controller_1.default);
app.post('/bets', addBetHttp_controller_1.default);
app.get('/players/:address', getPlayerHttp_controller_1.default);
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map