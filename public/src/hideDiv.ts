export function hideDiv(hider: any, hidden: HTMLDivElement, animation?: string): void {
    if (animation) {
        var clicked: boolean = false; //if its let, then the variable isn't available in hider clicker.
    }

    
    hider.addEventListener('click', () => {
        clicked = true;

        hider.classList.toggle('hidden');
        hidden.classList.toggle('hidden');


        animation ? animationHandler(animation, hidden, clicked) : console.log('No animation.');
    });
}

export function animationHandler(animation: string, object: any, clicked: boolean): void {
    object.classList.toggle(animation);
}