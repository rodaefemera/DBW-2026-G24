'use strict';

const modeCards = document.querySelectorAll('.mode-card');
const createRoomForm = document.getElementById('createRoomForm');

// Highlight selected mode card
modeCards.forEach(card => {
    const input = card.querySelector('input');
    if (input.checked) card.classList.add('active');
    input.addEventListener('change', function () {
        modeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

if (createRoomForm) {
    createRoomForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedMode    = document.querySelector('input[name="gameMode"]:checked').value;
        const selectedPlayers = document.querySelector('input[name="playersLimit"]:checked').value;
        const selectedPrivacy = document.querySelector('input[name="privacy"]:checked').value;
        const roomCode        = generateRoomCode();

        window.location.href =
            "/roombase?mode=" + selectedMode +
            "&players=" + selectedPlayers +
            "&privacy=" + selectedPrivacy +
            "&roomCode=" + roomCode;
    });
}
