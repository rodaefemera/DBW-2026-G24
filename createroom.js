// *get elements from HTML*
const modeCards = document.querySelectorAll(".mode-card");
const createRoomForm = document.getElementById("createRoomForm");


// *highlight selected game mode card*
modeCards.forEach(card => {
    const input = card.querySelector("input");

    if (input.checked) {
        card.classList.add("active");
    }

    input.addEventListener("change", function () {
        modeCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    });
});


// *redirect to roombase with selected room options*
if (createRoomForm) {
    createRoomForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
        const selectedPlayers = document.querySelector('input[name="playersLimit"]:checked').value;
        const selectedPrivacy = document.querySelector('input[name="privacy"]:checked').value;

        window.location.href =
            "roombase.html?mode=" + selectedMode +
            "&players=" + selectedPlayers +
            "&privacy=" + selectedPrivacy;
    });
}