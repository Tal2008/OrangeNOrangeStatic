const ost: HTMLAudioElement | null = document.getElementById('audio-html') as HTMLAudioElement;
const ostArrows = document.getElementsByClassName('arrowButton-ost');
let ostName: HTMLParagraphElement | null = document.getElementById('ost-name') as HTMLParagraphElement; 
const ostArrowLeft: HTMLImageElement = ostArrows[0] as HTMLImageElement;
const ostArrowRight: HTMLImageElement = ostArrows[1] as HTMLImageElement;
let ostTime: HTMLDivElement = document.getElementById('ost-time') as HTMLDivElement;

let ostList: string[] = ['Children of the Ruins', 'Enemy Approaching', 'First Steps']; //dont forget to make backend.
let currentSongNum: number = 0;

function changeOst(arrow: HTMLImageElement): void {
    arrow.addEventListener('click', () =>{
        //if theres a better way to do this, please tell me.
        if (ost && ostName && ostTime) {
        ostName.innerHTML = ostList[currentSongNum]
        ostTime.innerHTML = `${ost.currentTime} ⫻ ${ost.duration}`;
        currentSongNum++;
    }
    })
}
