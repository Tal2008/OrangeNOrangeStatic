const games: string = 'Undertale⫻Outcore⫻Oneshot⫻Hat in Time⫻Star Apprentice⫻MC⫻Hollow Knight⫻Paper Mario⫻Stardew Valley⫻Henry Stickmin⫻Danganronpa⫻DDLC⫻Oxenfree⫻vividstasis⫻Stanley Parable⫻Cuphead⫻Celeste';

window.addEventListener("DOMContentLoaded", () => {
    const placeholder: HTMLImageElement | null = document.getElementById('image') as HTMLImageElement;

    console.log(placeholder)
    
    placeholder.addEventListener('click', () => {
        window.location.href="https://undertale.com/"
        console.log('Ho')
    })

    //DOnt delete:

});


const gamesArray: string[] = games.split('⫻');
console.log(gamesArray)

for (let game in gamesArray) {

}