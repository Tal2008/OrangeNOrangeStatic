export function hideDiv(hider, hidden, animation) {
    if (animation) {
        var clicked = false; //if its let, then the variable isn't available in hider clicker.
    }
    hider.addEventListener('click', () => {
        clicked = true;
        hider.classList.toggle('hidden');
        hidden.classList.toggle('hidden');
        animation ? animationHandler(animation, hidden, clicked) : console.log('No animation.');
    });
}
export function animationHandler(animation, object, clicked) {
    object.classList.toggle(animation);
}
