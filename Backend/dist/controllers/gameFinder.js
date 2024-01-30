"use strict";
require('dotenv').config({ path: '../../../env' });
const games = 'Undertale⫻Outcore⫻Oneshot⫻Hat in Time⫻Star Apprentice⫻MC⫻Hollow Knight⫻Paper Mario⫻Stardew Valley⫻Henry Stickmin⫻Danganronpa⫻DDLC⫻Oxenfree⫻vividstasis⫻Stanley Parable⫻Cuphead⫻Celeste';
const gamesArray = games.split('⫻');
console.log(process.env.ClientID, process.env.Authorization);
// axios.post('https://api.igdb.com/v4/artworks', {
//     Headers: {
//         'Client-ID': process.env.ClientID,
//         'Authorization': process.env.Authorization,
//     }
// })
