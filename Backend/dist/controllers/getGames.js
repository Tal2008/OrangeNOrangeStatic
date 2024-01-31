"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../../../.env' });
const axios_1 = __importDefault(require("axios"));
const games = 'Undertale⫻Outcore⫻Oneshot⫻Hat in Time⫻Star Apprentice⫻MC⫻Hollow Knight⫻Paper Mario⫻Stardew Valley⫻Henry Stickmin⫻Danganronpa⫻DDLC⫻Oxenfree⫻vividstasis⫻Stanley Parable⫻Cuphead⫻Celeste';
const gamesArray = games.split('⫻');
//  console.log(process.env.ClientID, process.env.Authorization) //delete later
//"fields url; where game=26226;"
let data = 'fields name, artworks, cover.url; search "Celeste"; limit 1;';
axios_1.default.post('https://api.igdb.com/v4/games', data, {
    headers: {
        'Client-ID': process.env.ClientID,
        'Authorization': process.env.Authorization,
    }
}).then((response) => {
    console.log(response.data);
});
