'use strict';
 
const modeCards = document.querySelectorAll('.mode-card');
 
// Highlight selected mode card
modeCards.forEach(card => {
    const input = card.querySelector('input');
    if (input.checked) card.classList.add('active');
    input.addEventListener('change', function () {
        modeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});
 