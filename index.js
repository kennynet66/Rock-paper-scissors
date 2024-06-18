const playerForm = document.getElementById("player-form");
const output = document.getElementById("output");

// Sections for players
const player1Section = document.getElementById("player1-section");
const player2Section = document.getElementById("player2-section");

// Input fields
const _player1 = document.getElementById("_player1");
const _select1 = document.getElementById("player1-select");
const _player2 = document.getElementById("_player2");
const _select2 = document.getElementById("player2-select");

// Button for player 1
const player1Next = document.getElementById("player1-next");

let player1 = {};
let player2 = {};

// Display results and trigger confetti
function displayResults(result, playerName) {
    if(result === "draw"){
        setTimeout(() => {
            output.textContent = "New Game!";
        }, 2000);
        output.textContent = "It's a draw!";
    } else {
        setTimeout(() => {
            output.textContent = "New Game!";
        }, 2000);
        output.textContent = `${playerName} wins!`;
        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function checkWinner(player1, player2) {
    const { answer1 } = player1;
    const { answer2 } = player2;

    if (answer1 === answer2) {
        displayResults("draw", "none");
        return;
    }

    if (
        (answer1 === "Rock" && answer2 === "Scissors") ||
        (answer1 === "Paper" && answer2 === "Rock") ||
        (answer1 === "Scissors" && answer2 === "Paper")
    ) {
        displayResults("win", player1.player1);
    } else {
        displayResults("win", player2.player2);
    }
}

// First step - get the player's names
player1Next.addEventListener("click", (e) => {
    const first = _player1.value.trim();
    const answer1 = _select1.value;

    if (first === "" || answer1 === "") {
        return window.alert("Please fill in all the fields");
    }

    player1 = {
        player1: first,
        answer1: answer1
    };

    player1Section.style.display = "none";
    player2Section.style.display = "block";
});

// Second step - get player 2's name and choice
playerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const second = _player2.value.trim();
    const answer2 = _select2.value;

    if (second === "" || answer2 === "") {
        return window.alert("Please fill in all the fields");
    }

    player2 = {
        player2: second,
        answer2: answer2
    };

    checkWinner(player1, player2);
    playerForm.reset();

    player1Section.style.display = "block";
    player2Section.style.display = "none";
});
