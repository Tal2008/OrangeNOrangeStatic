require('dotenv').config({ path: '../../../.env' });
import axios from 'axios';

const games: string = 'Undertale⫻Outcore⫻Oneshot⫻Hat in Time⫻Star Apprentice⫻MC⫻Hollow Knight⫻Paper Mario⫻Stardew Valley⫻Henry Stickmin⫻Danganronpa⫻DDLC⫻Oxenfree⫻vividstasis⫻Stanley Parable⫻Cuphead⫻Celeste';
const gamesArray: string[] = games.split('⫻');
//  console.log(process.env.ClientID, process.env.Authorization) //delete later
//"fields url; where game=26226;"
let data: string = 'fields name, artworks, cover.url, websites.url; search "Celeste"; limit 1;';

for (let game in gamesArray) {
    console.log(game)
}
axios.post('https://api.igdb.com/v4/games', data, {
    headers: {
        'Client-ID': process.env.ClientID,
        'Authorization': process.env.Authorization,
    }
}).then((response: any) => {
    console.log(response.data)
    console.log("website", response.data.websites)
})


