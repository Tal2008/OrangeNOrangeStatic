// import { animationHandler, hideDiv } from "./hideDiv";  //animation + toggle
//import { gamesData } from "./script"; Doesn't work.
//console.log(gamesData, "GamesDataTest."); Doesn't work for some reason.
let gamesData;
let gameNames;
let gameCovers;
axios.get('./data/games').then((response) => {
    gamesData = response.data;
    gameNames = gamesData.gameNames;
    gameCovers = gamesData.gameCovers;
    console.log("GAME NAMES< GAME COVERS<", gameNames, gameCovers);
});
// let gameNames = gamesData.gameNames;
//import axios from "axios"; //ALWAYS DELETE THIS IN DIST FIle.
//I vow to never create anything as messy as this ever again.
let ostList = [];
axios.get('./data/ost').then((response) => {
    ostList = response.data;
    console.log(response.data, ostList); //delete later
}); // WARNING: Each time you use this, you need to manually add the base path to the Osts folder.
window.addEventListener("DOMContentLoaded", () => {
    const ost = document.getElementById('audio-html');
    const ostArrows = document.getElementsByClassName('arrowButton-ost');
    let ostName = document.getElementById('ost-name');
    const ostArrowLeft = ostArrows[0];
    const ostArrowRight = ostArrows[2];
    const playButton = document.getElementById('pauseButton'); //me: uses as | also me: >proceeds to do <type>
    let ostTime = document.getElementById('ost-time');
    let ostImage = document.getElementById('songImage');
    //let ostList: string[] = ['../Osts/Children of the Ruins.mp3', '../Osts/Enemy Approaching.mp3', '../Osts/First Steps.mp3']; //dont forget to make backend.
    let ostImages = ['https://pbs.twimg.com/profile_images/1610231810201636870/Nj3OUXrQ_400x400.jpg', '../Assets/Images/DeleteLater/Undertale_2022_Poster.png', 'https://assets1.ignimgs.com/2018/01/23/celeste---button-1516746065043.jpg', 'https://pbs.twimg.com/profile_images/1610231810201636870/Nj3OUXrQ_400x400.jpg'];
    let currentSongNum = 0;
    let isFirst = true;
    let playing = false; //for pause button, not done yet. comment .
    console.log(ost);
    //ost.play();
    // DONT FORGET TO GET IMAGES VIA API
    function changeOst(arrow) {
        arrow.addEventListener('click', () => {
            //if theres a better way to do this, please tell me.
            playing = true;
            playButton.src = '../Assets/Images/PauseButton/stop_circle_FILL0_wght400_GRAD0_opsz24.svg';
            if (ost && ostName && ostTime) {
                if (arrow.id.includes('right') && !isFirst) {
                    currentSongNum++;
                    //ostImage.src = ostImages[currentSongNum];
                    if (currentSongNum == ostList.length) {
                        currentSongNum = 0;
                        ostName.innerHTML = 'loading...';
                    }
                }
                else if (!isFirst) {
                    currentSongNum = currentSongNum - 1;
                    //ost.src = ostList[currentSongNum];
                    //ostImage.src = ostImages[currentSongNum];
                    if (currentSongNum < 0) {
                        currentSongNum = ostList.length - 1;
                    }
                }
                
                let gameName = ostList[currentSongNum].split('-').shift(); //Here
                console.log(gameName, "HELLO TESTING HERE GAMENAME")
                gameNames.findIndex(game => console.log(game)); // delete
                let coverIndex = gameNames.findIndex(game => game.includes(gameName));
                console.log(coverIndex);
                console.log(gameName);

                ostImage.src = gameCovers[coverIndex];
                ost.src = "../Osts/" + ostList[currentSongNum];
                isFirst = false;
                console.log(currentSongNum); //debug
                ost.play();
                ost.addEventListener('loadedmetadata', () => {
                    ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;
                    ost.play();
                });
                ost.addEventListener('timeupdate', () => { ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`; });
                let songString = ostList[currentSongNum].split("-").pop();
                songString ? ostName.innerHTML = songString : console.log('No song name found.');
                ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;
            }
            console.log(currentSongNum); //debug
            ost ? ost.addEventListener('ended', () => {
                currentSongNum++;
                if (currentSongNum >= ostList.length) {
                    currentSongNum = 0;
                }
                let gameName = ostList[currentSongNum].split('-').pop();
                console.log(gameName) //debug
                gameNames.findIndex(game => console.log(game)); // delete
                let coverIndex = gameNames.findIndex(game => game.includes(gameName));
                ost.src = "../Osts/" + ostList[currentSongNum];
                ostImage.src = gameCovers[coverIndex];
                let songString = ostList[currentSongNum].split("-").pop(); //here?
                ostName ? songString ? ostName.innerHTML = songString : console.log('No song name found.') : console.log('No song name.');
                ost.play();
            }) : console.log('Song not loaded.');
        });
    }
    function stopPlayButton(button) {
        button.addEventListener('click', () => {
            if (!playing) { //why use !paused? well, I accidentally switched their places, but was too lazy to switch the places of their code.
                //god forgive me
                let ostName = document.getElementById('ost-name');
                button.src = '../Assets/Images/PauseButton/stop_circle_FILL0_wght400_GRAD0_opsz24.svg';
                playing = true;
                isFirst = false;
                ostImage.src = ostImages[currentSongNum]; //I promise to do better code reusability in my next project, I swear.
                ost === null || ost === void 0 ? void 0 : ost.addEventListener('timeupdate', () => { ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`; });
                let songString = ostList[currentSongNum].split("-").pop();
                songString ? ostName.innerHTML = songString : console.log('No song name found.');
                ost ? ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}` : console.log('No ost.');
                ost === null || ost === void 0 ? void 0 : ost.play();
            }
            else {
                button.src = '../Assets/Images/PauseButton/play_circle_FILL0_wght400_GRAD0_opsz24.svg';
                playing = false;
                ost === null || ost === void 0 ? void 0 : ost.pause();
            };
            //sorry for the repetition //doesnt work either way
            //let songString = ostList[currentSongNum].split("/").pop();
            //ostName ? songString ? ostName.innerHTML = songString : console.log('No song name found.') : console.log('No song name.');
        });
    }
    //This whole file is a fucking mess, I'm very sorry to all my programmer friends.
    changeOst(ostArrowLeft);
    changeOst(ostArrowRight);
    stopPlayButton(playButton);
});
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
//Before you say anything (though you can, I appreciate feedback.):
//I tried just using it as a module, but it always gave me an error.
//One time it gives me some random error and the other it gives me a CORS error.
//Tried fixing it, but this is the fastest way to solve this.
window.addEventListener("DOMContentLoaded", () => {
    //Yeah this probably isn't the best way to do this.
    const ostToggle = document.getElementById('ost-toggle');
    const ostContainer = document.getElementById('ostContainer');
    //forgive me for what I am about to do
    // hideDiv.ts
    function hideDiv(hider, hidden, animation) {
        if (animation) {
            var clicked = false; //if its let, then the variable isn't available in hider clicker.
        }
        hider.addEventListener('click', () => {
            clicked = true;
            hidden.classList.toggle('hidden');
            animation ? animationHandler(animation, hidden, clicked) : console.log('No animation.');
        });
    }
    function animationHandler(animation, object, clicked) {
        object.classList.toggle(animation);
    }
    hideDiv(ostToggle, ostContainer, "leftScreenAnimation");
});
