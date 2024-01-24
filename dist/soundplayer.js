"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const ost = document.getElementById('audio-html');
    const ostArrows = document.getElementsByClassName('arrowButton-ost');
    let ostName = document.getElementById('ost-name');
    const ostArrowLeft = ostArrows[0];
    const ostArrowRight = ostArrows[1];
    let ostTime = document.getElementById('ost-time');
    let ostImage = document.getElementById('songImage');
    let ostList = ['../Osts/Children of the Ruins.mp3', '../Osts/toby fox - UNDERTALE Soundtrack - 09 Enemy Approaching.mp3', '../Osts/First Steps.mp3']; //dont forget to make backend.
    let ostImages = ['https://pbs.twimg.com/profile_images/1610231810201636870/Nj3OUXrQ_400x400.jpg', 'https://pbs.twimg.com/profile_images/1610231810201636870/Nj3OUXrQ_400x400.jpg'];
    let currentSongNum = 0;
    console.log(ost);
    //ost.play();
    // DONT FORGET TO GET IMAGES VIA API
    function changeOst(arrow) {
        arrow.addEventListener('click', () => {
            //if theres a better way to do this, please tell me.
            if (ost && ostName && ostTime) {
                if (arrow.id.includes('right')) {
                    currentSongNum++;
                    ost.src = ostList[currentSongNum];
                    ostImage.src = ostImages[currentSongNum];
                    if (currentSongNum == ostList.length) {
                        currentSongNum = 0;
                    }
                    ost.play();
                }
                else {
                    currentSongNum = currentSongNum - 1;
                    ost.src = ostList[currentSongNum];
                    ostImage.src = ostImages[currentSongNum];
                    if (currentSongNum < 0) {
                        currentSongNum = ostList.length - 1;
                    }
                    ost.play();
                }
                ostTime.addEventListener('change', () => { ostTime.innerHTML = `${formatTime(ost.currentTime)} ⫻ ${formatTime(ost.duration)}`; });
                let songString = ostList[currentSongNum].split("/").pop();
                songString ? ostName.innerHTML = songString : console.log('No song name found.');
                ostTime.innerHTML = `${formatTime(ost.currentTime)} ⫻ ${formatTime(ost.duration)}`;
            }
            function formatTime(time) {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        });
    }
    changeOst(ostArrowLeft);
    changeOst(ostArrowRight);
});
function formatTime(currentTime) {
    throw new Error("Function not implemented.");
}
