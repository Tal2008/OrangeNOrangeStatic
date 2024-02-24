// import { animationHandler, hideDiv } from "./hideDiv";  //animation + toggle
//import { gamesData } from "./script"; Doesn't work.
//console.log(gamesData, "GamesDataTest."); Doesn't work for some reason.
let gamesData;
let gameNames: any;
let gameCovers: any;
axios.get('./data/games').then((response) => {
    gamesData = response.data;
    gameNames = gamesData.gameNames;
    gameCovers = gamesData.gameCovers;
});
// let gameNames = gamesData.gameNames;
import axios from "axios"; //ALWAYS DELETE THIS IN DIST FIle.

//I vow to never create anything as messy as this ever again.
let ostList: string[] = [];
axios.get('./data/ost').then((response: any) => {
    ostList = response.data;
    console.log(response.data, ostList) //delete later
}); // WARNING: Each time you use this, you need to manually add the base path to the Osts folder.

window.addEventListener("DOMContentLoaded", () => {
    const ost: HTMLAudioElement | null = document.getElementById('audio-html') as HTMLAudioElement;
    const ostArrows = document.getElementsByClassName('arrowButton-ost');
    let ostName: HTMLParagraphElement | null = document.getElementById('ost-name') as HTMLParagraphElement; 
    const ostArrowLeft: HTMLImageElement = ostArrows[0] as HTMLImageElement;
    const ostArrowRight: HTMLImageElement = ostArrows[2] as HTMLImageElement;
    const playButton: HTMLImageElement = <HTMLImageElement>document.getElementById('pauseButton'); //me: uses as | also me: >proceeds to do <type>
    let ostTime: HTMLParagraphElement = document.getElementById('ost-time') as HTMLParagraphElement;
    let ostImage: HTMLImageElement = document.getElementById('songImage') as HTMLImageElement;

    //let ostList: string[] = ['../Osts/Children of the Ruins.mp3', '../Osts/Enemy Approaching.mp3', '../Osts/First Steps.mp3']; //dont forget to make backend.
    //let ostImages: string[] = ['https://pbs.twimg.com/profile_images/1610231810201636870/Nj3OUXrQ_400x400.jpg', '../Assets/Images/DeleteLater/Undertale_2022_Poster.png', 'https://assets1.ignimgs.com/2018/01/23/celeste---button-1516746065043.jpg'];
    let currentSongNum: number = 0;
    let isFirst: boolean = true;
    let playing: boolean = false; //for pause button, not done yet. comment .

    console.log(ost)
    //ost.play();
    // DONT FORGET TO GET IMAGES VIA API

    function changeOst(arrow: HTMLImageElement): void {
        arrow.addEventListener('click', () =>{
            //if theres a better way to do this, please tell me.
            playing = true;
            playButton.src = '../Assets/Images/PauseButton/stop_circle_FILL0_wght400_GRAD0_opsz24.svg';
            if (ost && ostName && ostTime) {
                
            if (arrow.id.includes('right') && !isFirst) {
                currentSongNum++;

                if (currentSongNum == ostList.length) {
                    currentSongNum = 0;
                    ostName.innerHTML = 'loading...' 
                }

            }
            else if(!isFirst) {
                currentSongNum = currentSongNum - 1;
                
                if (currentSongNum < 0) {
                    currentSongNum = ostList.length - 1;
                }

            }

            let gameName = ostList[currentSongNum].split('-').shift(); //Here
            gameNames.findIndex((game: any) => console.log(game)); // delete
            let coverIndex = gameNames.findIndex((game: (string | undefined)[]) => game.includes(gameName));
            isFirst = false;
            ostImage.src = gameCovers[coverIndex];
            ost.src = "../Osts/" + ostList[currentSongNum];

            console.log(currentSongNum) //debug
            ost.play()
            
            ost.addEventListener('loadedmetadata', ()=> {
                ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;
                ost.play()
            })

            ost.addEventListener('timeupdate', () => {ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;})

            let songString: string | undefined = ostList[currentSongNum].split("-").pop();

            songString ? ostName.innerHTML = songString : console.log('No song name found.'); 
            
            ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;        
        }


    console.log(currentSongNum) //debug

    ost  ? ost.addEventListener('ended', () => {
        currentSongNum++;
        if (currentSongNum >= ostList.length) {
            currentSongNum = 0;
        }

        let gameName = ostList[currentSongNum].split('-').pop();
        let coverIndex = gameNames.findIndex((game: (string | undefined)[]) => game.includes(gameName));
        ostImage.src = gameCovers[coverIndex];
        ost.src = "../Osts/" + ostList[currentSongNum];
        
        let songString: string | undefined = ostList[currentSongNum].split("-").pop();

        ostName ? songString ? ostName.innerHTML = songString : console.log('No song name found.') : console.log('No song name.');

        ost.play();
    
    }) : console.log('Song not loaded.');


    })
    
    }
    
    function stopPlayButton(button: HTMLImageElement): void {
        button.addEventListener('click', () => { //what the hell is readable code
            if(!playing) { //why use !paused? well, I accidentally switched their places, but was too lazy to switch the places of their code.
                //god forgive me
                 let ostName: HTMLParagraphElement | null = document.getElementById('ost-name') as HTMLParagraphElement; 

                button.src = '../Assets/Images/PauseButton/stop_circle_FILL0_wght400_GRAD0_opsz24.svg';
                playing = true;

                
                isFirst = false;
                ostImage.src = ostImages[currentSongNum] //I promise to do better code reusability in my next project, I swear.
                ost?.addEventListener('timeupdate', () => {ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;})

                let songString: string | undefined = ostList[currentSongNum].split("-").pop();
    
                songString ? ostName.innerHTML = songString : console.log('No song name found.'); 
                
                ost ? ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`: console.log('No ost.');   
                ost?.play();
            }
            else {
                button.src = '../Assets/Images/PauseButton/play_circle_FILL0_wght400_GRAD0_opsz24.svg';
                playing = false;
                ost?.pause();
            };
    })
    }

    //This whole file is a fucking mess, I'm very sorry to all my programmer friends.
    changeOst(ostArrowLeft);
    changeOst(ostArrowRight);
    stopPlayButton(playButton)
    })


function formatTime(time: number): string {
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
    const ostToggle: HTMLImageElement = document.getElementById('ost-toggle') as HTMLImageElement;
    const ostContainer = document.getElementById('ostContainer') as HTMLDivElement;


    //forgive me for what I am about to do
    // hideDiv.ts
    function hideDiv(hider: any, hidden: HTMLDivElement, animation?: string): void {
        if (animation) {
            var clicked: boolean = false; //if its let, then the variable isn't available in hider clicker.
        }

        
        hider.addEventListener('click', () => {
            clicked = true;

            hidden.classList.toggle('hidden');


            animation ? animationHandler(animation, hidden, clicked) : console.log('No animation.');
        });
    }

    function animationHandler(animation: string, object: any, clicked: boolean): void {
        object.classList.toggle(animation);
    }


    hideDiv(ostToggle, ostContainer, "leftScreenAnimation");
});

