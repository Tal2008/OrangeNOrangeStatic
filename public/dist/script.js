"use strict";
const games = 'Undertale⫻Outcore⫻Oneshot⫻Hat in Time⫻Star Apprentice⫻MC⫻Hollow Knight⫻Paper Mario⫻Stardew Valley⫻Henry Stickmin⫻Danganronpa⫻DDLC⫻Oxenfree⫻vividstasis⫻Stanley Parable⫻Cuphead⫻Celeste';
window.addEventListener("DOMContentLoaded", () => {
    const placeholder = document.getElementById('image');
    console.log(placeholder);
    placeholder.addEventListener('click', () => {
        window.location.href = "https://undertale.com/";
        console.log('Ho');
    });
    //DOnt delete:
});
const gamesArray = games.split('⫻');
console.log(gamesArray);
for (let game in gamesArray) {
}
