require('dotenv').config({ path: '../../../.env' });
import axios from 'axios';
import { request } from 'http';

const games: string = 'Undertale⫻Outcore: Desktop Adventure⫻OneShot: World Machine Edition⫻Hat in Time⫻Star Apprentice⫻Minecraft: Frozen⫻Hollow Knight⫻Paper Mario⫻Stardew Valley⫻Henry Stickmin⫻Danganronpa: Trigger Happy Havoc⫻Doki Doki Literature Club⫻Oxenfree⫻Vivid/Stasis⫻Stanley Parable⫻Cuphead⫻Celeste';
const gamesArray: string[] = games.split('⫻');
let gameWebsites: string[] = [];
let gameArtworks: string[] = [];
let gameCovers: string[] = [];
let gameNames: string[] = [];

//  console.log(process.env.ClientID, process.env.Authorization) //delete later
//"fields url; where game=26226;"

for (let game in gamesArray) {
    let data: string = `fields name, artworks, artworks.url, cover.url, websites.url; search "${gamesArray[game]}"; limit 5;`;
    console.log(game, gamesArray[game])
    setTimeout(() => {requestGame(data)}, 1000);
}

// //for reusability
function requestGame(data: string):void {
    axios.post('https://api.igdb.com/v4/games', data, {
    headers: {
        'Client-ID': process.env.ClientID,
        'Authorization': process.env.Authorization,
    }
    }).then((response: any) => {
        try {
        // console.log("game", response.data[0].name, count); //count doesn't work well eitherway.

        let gameWebsite = getFirstUrl(response.data[0].websites[0].url);
        let gameArtwork = getFirstUrl(response.data[0].artworks[0].url);
        let gameCover = getFirstUrl(response.data[0].cover.url);
        let gameName = response.data[0].name;
        //console.log(gameWebsite, gameArtwork, gameCover, gameName); //delete later
        
        gameNames.push(gameName);
        gameWebsites.push(gameWebsite);
        gameArtworks.push(gameArtwork);
        gameCovers.push(gameCover);

        console.log("Websites:",gameWebsites, "Artworks:",gameArtworks, "Covers:",gameCovers,"Names:",gameNames);

        }
        catch(err) {console.log(err)}
    });
}

function getFirstUrl(field: any) {
    if (field) {
        console.log(field)
        return field;
    }
}

module.exports = {
    gameNames,
    gameWebsites,
    gameArtworks,
    gameCovers,
}