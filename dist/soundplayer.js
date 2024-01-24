"use strict";
//I vow to never create anything as messy as this ever again.
window.addEventListener("DOMContentLoaded", () => {
    const ost = document.getElementById('audio-html');
    const ostArrows = document.getElementsByClassName('arrowButton-ost');
    let ostName = document.getElementById('ost-name');
    const ostArrowLeft = ostArrows[0];
    const ostArrowRight = ostArrows[2];
    const playButton = document.getElementById('pauseButton'); //me: uses as | also me: >proceeds to do <type>
    let ostTime = document.getElementById('ost-time');
    let ostImage = document.getElementById('songImage');
    let ostList = ['../Osts/Children of the Ruins.mp3', '../Osts/Enemy Approaching.mp3', '../Osts/First Steps.mp3']; //dont forget to make backend.
    let ostImages = ['https://pbs.twimg.com/profile_images/1610231810201636870/Nj3OUXrQ_400x400.jpg', '../Assets/Images/DeleteLater/Undertale_2022_Poster.png', 'https://assets1.ignimgs.com/2018/01/23/celeste---button-1516746065043.jpg'];
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
                    ostImage.src = ostImages[currentSongNum];
                    if (currentSongNum == ostList.length) {
                        currentSongNum = 0;
                        ostName.innerHTML = 'loading...';
                    }
                }
                else if (!isFirst) {
                    currentSongNum = currentSongNum - 1;
                    ost.src = ostList[currentSongNum];
                    ostImage.src = ostImages[currentSongNum];
                    if (currentSongNum < 0) {
                        currentSongNum = ostList.length - 1;
                    }
                }
                ostImage.src = ostImages[currentSongNum];
                ost.src = ostList[currentSongNum];
                isFirst = false;
                console.log(currentSongNum); //debug
                ost.play();
                ost.addEventListener('loadedmetadata', () => {
                    ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;
                    ost.play();
                });
                ost.addEventListener('timeupdate', () => { ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`; });
                let songString = ostList[currentSongNum].split("/").pop();
                songString ? ostName.innerHTML = songString : console.log('No song name found.');
                ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;
            }
            function formatTime(time) {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
            console.log(currentSongNum); //debug
            ost ? ost.addEventListener('ended', () => {
                currentSongNum++;
                if (currentSongNum >= ostList.length) {
                    currentSongNum = 0;
                }
                ost.src = ostList[currentSongNum];
                ostImage.src = ostImages[currentSongNum];
                let songString = ostList[currentSongNum].split("/").pop();
                ostName ? songString ? ostName.innerHTML = songString : console.log('No song name found.') : console.log('No song name.');
                ost.play();
            }) : console.log('Song not loaded.');
        });
    }
    function stopPlayButton(button) {
        button.addEventListener('click', () => {
            if (!playing) { //why use !paused? well, I accidentally switched their places, but was too lazy to switch the places of their code.
                button.src = '../Assets/Images/PauseButton/stop_circle_FILL0_wght400_GRAD0_opsz24.svg';
                ost === null || ost === void 0 ? void 0 : ost.play();
                playing = true;
                isFirst = false;
                ostImage.src = ostImages[currentSongNum]; //I promise to do better code reusability in my next project, I swear.
                let songString = ostList[currentSongNum].split("/").pop();
                ostName ? songString ? ostName.innerHTML = songString : console.log('No song name found.') : console.log('No song name.');
            }
            else {
                button.src = '../Assets/Images/PauseButton/play_circle_FILL0_wght400_GRAD0_opsz24.svg';
                playing = false;
                ost === null || ost === void 0 ? void 0 : ost.pause();
            }
            ;
        });
    }
    //This whole file is a fucking mess, I'm very sorry to all my programmer friends.
    changeOst(ostArrowLeft);
    changeOst(ostArrowRight);
    stopPlayButton(playButton);
});
function formatTime(currentTime) {
    throw new Error("Function not implemented.");
}
