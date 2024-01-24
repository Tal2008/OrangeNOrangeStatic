//I vow to never create anything as messy as this ever again.

window.addEventListener("DOMContentLoaded", () => {
    const ost: HTMLAudioElement | null = document.getElementById('audio-html') as HTMLAudioElement;
    const ostArrows = document.getElementsByClassName('arrowButton-ost');
    let ostName: HTMLParagraphElement | null = document.getElementById('ost-name') as HTMLParagraphElement; 
    const ostArrowLeft: HTMLImageElement = ostArrows[0] as HTMLImageElement;
    const ostArrowRight: HTMLImageElement = ostArrows[1] as HTMLImageElement;
    let ostTime: HTMLParagraphElement = document.getElementById('ost-time') as HTMLParagraphElement;
    let ostImage: HTMLImageElement = document.getElementById('songImage') as HTMLImageElement;

    let ostList: string[] = ['../Osts/Children of the Ruins.mp3', '../Osts/Enemy Approaching.mp3', '../Osts/First Steps.mp3']; //dont forget to make backend.
    let ostImages: string[] = ['https://pbs.twimg.com/profile_images/1610231810201636870/Nj3OUXrQ_400x400.jpg', '../Assets/Images/DeleteLater/Undertale_2022_Poster.png', 'https://assets1.ignimgs.com/2018/01/23/celeste---button-1516746065043.jpg'];
    let currentSongNum: number = 0;
    let isFirst: boolean = true;

    console.log(ost)
    //ost.play();
    // DONT FORGET TO GET IMAGES VIA API

    function changeOst(arrow: HTMLImageElement): void {
        arrow.addEventListener('click', () =>{
            //if theres a better way to do this, please tell me.
            if (ost && ostName && ostTime) {

            if (arrow.id.includes('right') && !isFirst) {
                currentSongNum++;
                ostImage.src = ostImages[currentSongNum];

                if (currentSongNum == ostList.length) {
                    currentSongNum = 0;
                    ostName.innerHTML = 'loading...' 
                }

            }
            else if(!isFirst) {
                currentSongNum = currentSongNum - 1;
                ost.src = ostList[currentSongNum]; 
                ostImage.src = ostImages[currentSongNum];
                
                if (currentSongNum < 0) {
                    currentSongNum = ostList.length - 1;
                }

            }

            ostImage.src = ostImages[currentSongNum]
            ost.src = ostList[currentSongNum];
            isFirst = false;

            console.log(currentSongNum) //debug
            ost.play()
            
            ost.addEventListener('loadedmetadata', ()=> {
                ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;
                ost.play()
            })

            ost.addEventListener('timeupdate', () => {ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;})

            let songString: string | undefined = ostList[currentSongNum].split("/").pop();

            songString ? ostName.innerHTML = songString : console.log('No song name found.'); 
            
            ostTime.innerHTML = `${formatTime(ost.currentTime)} // ${formatTime(ost.duration)}`;        
        }

        
    function formatTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    console.log(currentSongNum) //debug

    ost  ? ost.addEventListener('ended', () => {
        currentSongNum++;
        if (currentSongNum >= ostList.length) {
            currentSongNum = 0;
        }
        ost.src = ostList[currentSongNum];
        ostImage.src = ostImages[currentSongNum];
        
        let songString: string | undefined = ostList[currentSongNum].split("/").pop();

        ostName ? songString ? ostName.innerHTML = songString : console.log('No song name found.') : console.log('No song name.');

        ost.play();
    
    }) : console.log('Song not loaded.');


    })
    }
    //This whole file is a fucking mess, I'm very sorry to all my programmer friends.
    changeOst(ostArrowLeft);
    changeOst(ostArrowRight);
    })


function formatTime(currentTime: number) {
    throw new Error("Function not implemented.");
}
