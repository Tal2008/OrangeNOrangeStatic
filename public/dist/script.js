"use strict";
const gamePics = document.getElementById('gamePics');
const gamesString = 'Undertale⫻Outcore⫻Oneshot⫻Hat in Time⫻Star Apprentice⫻MC⫻Hollow Knight⫻Paper Mario⫻Stardew Valley⫻Henry Stickmin⫻Danganronpa⫻DDLC⫻Oxenfree⫻vividstasis⫻Stanley Parable⫻Cuphead⫻Celeste';
window.addEventListener("DOMContentLoaded", () => {
    const placeholder = document.getElementById('image');
    console.log(placeholder);
    placeholder.addEventListener('click', () => {
        window.location.href = "https://undertale.com/";
        console.log('Ho');
    });
    //DOnt delete:
});
let dataLoaded = false;
let gamesData;
axios.get('./data/games').then((response) => {
    gamesData = response.data;
    console.log(response.data, gamesData); //delete later
    dataLoaded = true;
});
if (dataLoaded) {
    setTimeout(() => {
        console.log(gamesData);
    }, 200);
}
; //delete later}
// Ok, so this might suck because the images are low-res. Welp, Guess it was a good learning experience.
// Gonna probably do it manually or something.
const gamesArray = gamesString.split('⫻');
console.log(gamesArray);
function createGame(gamesData) {
    for (let game in gamesData.gameNames) {
        let box = document.createElement('div');
        box.classList.add('game');
        gamePics === null || gamePics === void 0 ? void 0 : gamePics.appendChild(box);
        let image = document.createElement('img');
        image.classList.add('gamePictures');
        box.appendChild(image);
        image.src = gamesData.gameArtworks[game];
        console.log(gamesData.Artworks); //deletre
        let name = document.createElement('p');
        box.appendChild(name);
        name.innerHTML = gamesData.gameNames[game];
        image.addEventListener('click', () => {
            window.location.href = gamesData.gameWebsites[game];
        });
    }
}
setTimeout(() => {
    createGame(gamesData);
}, 200);
