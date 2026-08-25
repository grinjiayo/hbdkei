/* =====================================================
   MUSIC
===================================================== */

const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

let playing = false;


/* =========================
   START MUSIC
========================= */

function startMusic() {

    if (!music || playing) {
        return;
    }

    music.play()
        .then(() => {

            playing = true;

            if (musicButton) {
                musicButton.textContent = "⏸️";
            }

        })
        .catch(error => {

            console.log("Music could not be played:", error);

        });
}


/* =========================
   MUSIC BUTTON
========================= */

function toggleMusic() {

    if (!music) {
        return;
    }

    if (music.paused) {

        music.play()
            .then(() => {

                playing = true;

                if (musicButton) {
                    musicButton.textContent = "⏸️";
                }

            })
            .catch(error => {

                console.log("Music could not be played:", error);

            });

    } else {

        music.pause();

        playing = false;

        if (musicButton) {
            musicButton.textContent = "🎵";
        }

    }

}


/* =========================
   START MUSIC ON FIRST CLICK
========================= */

document.addEventListener("click", function firstClick() {

    startMusic();

}, { once: true });



/* =====================================================
   WISH
===================================================== */

function makeWish() {

    const wishSection = document.getElementById("wish");

    if (wishSection) {

        wishSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   WISH POPUP
===================================================== */

function blowCandles() {

    createConfetti();

    const popup = document.getElementById("wishPopup");

    if (popup) {

        popup.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}


function closeWishPopup() {

    const popup = document.getElementById("wishPopup");

    if (popup) {

        popup.classList.remove("show");

        document.body.style.overflow = "";

    }

}


const wishPopup = document.getElementById("wishPopup");

if (wishPopup) {

    wishPopup.addEventListener("click", function(event) {

        if (event.target === wishPopup) {

            closeWishPopup();

        }

    });

}



/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    for (let i = 0; i < 80; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";

        confetti.style.background = [
            "#2563eb",
            "#60a5fa",
            "#93c5fd",
            "#ffffff"
        ][Math.floor(Math.random() * 4)];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-10px";

        confetti.style.borderRadius = "2px";

        confetti.style.zIndex = "30000";

        document.body.appendChild(confetti);

        const duration =
            2000 + Math.random() * 3000;

        confetti.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh)
                         rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ],

            {
                duration: duration,
                easing: "ease-out"
            }

        );

        setTimeout(() => {

            confetti.remove();

        }, duration);

    }

}



/* =====================================================
   GAME SYSTEM
===================================================== */


/*
    GAME PROGRESS

    1 = Hearts
    2 = Hidden Message
    3 = Balloons
    4 = Memory

    The next game is unlocked only after
    the previous game is completed.
*/

let unlockedGames = 1;

let currentGame = null;


/* =========================
   GAME ELEMENTS
========================= */

const gamesOverlay =
    document.getElementById("gamesOverlay");

const gameOverlay =
    document.getElementById("gameOverlay");

const gameContent =
    document.getElementById("gameContent");

const gameReward =
    document.getElementById("gameReward");

const rewardText =
    document.getElementById("rewardText");

const rewardTitle =
    document.getElementById("rewardTitle");


/* =====================================================
   OPEN / CLOSE GAMES
===================================================== */

function openGames() {

    if (gamesOverlay) {

        gamesOverlay.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}


function closeGames() {

    if (gamesOverlay) {

        gamesOverlay.classList.remove("show");

        document.body.style.overflow = "";

    }

}


function closeGame() {

    if (gameOverlay) {

        gameOverlay.classList.remove("show");

    }

    if (gameContent) {

        gameContent.innerHTML = "";

    }

}



/* =====================================================
   GAME UNLOCK SYSTEM
===================================================== */

function isGameUnlocked(gameNumber) {

    return gameNumber <= unlockedGames;

}


function unlockNextGame(completedGame) {

    if (completedGame >= 4) {

        showFinalPoem();

        return;

    }


    unlockedGames = completedGame + 1;


    updateGameCards();


    showReward(
        "Game Complete! 🎉",
        getUnlockMessage(unlockedGames)
    );

}


function getUnlockMessage(gameNumber) {

    const messages = {

        2:
            "You collected all the hearts! 💙 Game 2 is now unlocked!",

        3:
            "You found the hidden message! 🔎 Game 3 is now unlocked!",

        4:
            "Amazing! You popped all the balloons! 🎈 The final game is unlocked!"

    };

    return messages[gameNumber] || "";

}



/* =========================
   UPDATE GAME CARDS
========================= */

function updateGameCards() {

    for (let i = 1; i <= 4; i++) {

        const card =
            document.getElementById("gameCard" + i);

        const status =
            document.getElementById("gameStatus" + i);

        if (!card || !status) {
            continue;
        }


        if (i <= unlockedGames) {

            card.classList.remove("locked");

            card.classList.add("unlocked");


            if (i === 1) {
                status.textContent = "▶ Play";
            }

            if (i === 2) {
                status.textContent = "▶ Unlocked";
            }

            if (i === 3) {
                status.textContent = "▶ Unlocked";
            }

            if (i === 4) {
                status.textContent = "▶ Final Game";
            }


        } else {

            card.classList.add("locked");

            card.classList.remove("unlocked");

            status.textContent = "🔒 Locked";

        }

    }

}



/* =====================================================
   REWARD POPUP
===================================================== */

function showReward(title, message) {

    if (!gameReward) {
        return;
    }

    if (rewardTitle) {
        rewardTitle.textContent = title;
    }

    if (rewardText) {
        rewardText.textContent = message;
    }

    gameReward.classList.add("show");

}


function closeReward() {

    if (gameReward) {

        gameReward.classList.remove("show");

    }

}



/* =====================================================
   GAME 1
   COLLECT THE HEARTS
===================================================== */

let heartsCollected = 0;


function startHeartsGame() {

    if (!isGameUnlocked(1)) {
        return;
    }

    closeGames();

    gameOverlay.classList.add("show");

    currentGame = 1;

    heartsCollected = 0;


    gameContent.innerHTML = `

        <h2 class="game-title">
            Collect the Hearts 💙
        </h2>

        <p class="game-description">
            Catch all 5 hearts to unlock the next game!
        </p>

        <div class="game-score">
            Hearts: <span id="heartScore">0</span> / 5
        </div>

        <div class="heart-game-area"
             id="heartGameArea">
        </div>

    `;


    createHeart();

}


function createHeart() {

    const area =
        document.getElementById("heartGameArea");

    if (!area) {
        return;
    }


    const heart =
        document.createElement("div");

    heart.className = "game-heart";

    heart.textContent = "💙";


    const maxX =
        area.clientWidth - 45;

    const maxY =
        area.clientHeight - 45;


    heart.style.left =
        Math.random() * maxX + "px";

    heart.style.top =
        Math.random() * maxY + "px";


    heart.addEventListener("click", function() {

        heartsCollected++;


        const score =
            document.getElementById("heartScore");

        if (score) {

            score.textContent =
                heartsCollected;

        }


        heart.remove();


        if (heartsCollected >= 5) {

            setTimeout(() => {

                closeGame();

                unlockNextGame(1);

            }, 400);

        } else {

            createHeart();

        }

    });


    area.appendChild(heart);

}



/* =====================================================
   GAME 2
   HIDDEN MESSAGE
===================================================== */

let hiddenLetters = [];

let hiddenFound = 0;


function startHiddenGame() {

    if (!isGameUnlocked(2)) {

        showLockedMessage(2);

        return;

    }


    closeGames();

    gameOverlay.classList.add("show");

    currentGame = 2;

    hiddenFound = 0;


    /*
        The hidden message is:

        SMILE

        The player must find
        the five correct letters.
    */

    hiddenLetters = [
        "S",
        "M",
        "I",
        "L",
        "E"
    ];


    const randomLetters = [
        "A", "K", "X", "P",
        "S", "Q", "M", "T",
        "I", "B", "L", "R",
        "E", "N", "Z"
    ];


    const letters =
        randomLetters
        .sort(() => Math.random() - 0.5);


    gameContent.innerHTML = `

        <h2 class="game-title">
            Unlock the Message 🔐
        </h2>

        <p class="game-description">
            Find the hidden letters and reveal the secret message.
        </p>

        <div class="game-score">
            Letters Found:
            <span id="hiddenScore">0</span> / 5
        </div>

        <div class="hidden-message-area">

            <p style="
                color:#93c5fd;
                margin-bottom:10px;
            ">
                Hint: It's something you should always do. 💙
            </p>

            <div class="hidden-clues"
                 id="hiddenClues">
            </div>

            <div class="secret-result"
                 id="secretResult">
            </div>

        </div>

    `;


    const container =
        document.getElementById("hiddenClues");


    /*
        Create the cards.
    */

    letters.forEach(letter => {

        const button =
            document.createElement("button");

        button.className =
            "hidden-clue";

        button.textContent = "?";

        button.dataset.letter =
            letter;


        button.addEventListener(
            "click",
            function() {

                if (
                    button.classList.contains("found")
                ) {
                    return;
                }


                /*
                    Correct hidden letter
                */

                if (
                    hiddenLetters.includes(letter)
                ) {

                    button.textContent =
                        letter;

                    button.classList.add("found");

                    hiddenFound++;


                    document.getElementById(
                        "hiddenScore"
                    ).textContent =
                        hiddenFound;


                    /*
                        Show the discovered
                        letters.
                    */

                    updateSecretMessage();


                    if (hiddenFound >= 5) {

                        setTimeout(() => {

                            closeGame();

                            unlockNextGame(2);

                        }, 1000);

                    }


                } else {

                    /*
                        Wrong letter
                    */

                    button.textContent = "❌";


                    setTimeout(() => {

                        button.textContent = "?";

                    }, 500);

                }

            }
        );


        container.appendChild(button);

    });

}


function updateSecretMessage() {

    const result =
        document.getElementById("secretResult");

    if (!result) {
        return;
    }


    const found =
        hiddenLetters.slice(
            0,
            hiddenFound
        );


    result.innerHTML =

        found.length > 0
            ? found.join(" ")
            : "";

}



/* =====================================================
   GAME 3
   POP THE BALLOONS
===================================================== */

let balloonsPopped = 0;


function startBalloonGame() {

    if (!isGameUnlocked(3)) {

        showLockedMessage(3);

        return;

    }


    closeGames();

    gameOverlay.classList.add("show");

    currentGame = 3;

    balloonsPopped = 0;


    gameContent.innerHTML = `

        <h2 class="game-title">
            Pop the Balloons 🎈
        </h2>

        <p class="game-description">
            Pop all 10 balloons to unlock the final game!
        </p>

        <div class="game-score">
            Balloons:
            <span id="balloonScore">0</span> / 10
        </div>

        <div class="balloon-game-area"
             id="balloonGameArea">
        </div>

    `;


    for (let i = 0; i < 10; i++) {

        createGameBalloon();

    }

}


function createGameBalloon() {

    const area =
        document.getElementById(
            "balloonGameArea"
        );


    if (!area) {
        return;
    }


    const balloon =
        document.createElement("div");

    balloon.className =
        "game-balloon";


    balloon.style.left =
        Math.random() *
        (area.clientWidth - 60)
        + "px";


    balloon.style.top =
        Math.random() *
        (area.clientHeight - 100)
        + "px";


    balloon.style.animationDelay =
        Math.random() * 1 + "s";


    balloon.addEventListener(
        "click",
        function() {

            if (
                balloon.classList.contains("pop")
            ) {
                return;
            }


            balloonsPopped++;


            balloon.classList.add("pop");


            document.getElementById(
                "balloonScore"
            ).textContent =
                balloonsPopped;


            setTimeout(() => {

                balloon.remove();

            }, 250);


            if (balloonsPopped >= 10) {

                setTimeout(() => {

                    closeGame();

                    unlockNextGame(3);

                }, 600);

            }

        }
    );


    area.appendChild(balloon);

}



/* =====================================================
   GAME 4
   MEMORY GAME
===================================================== */

let memoryCards = [];

let firstMemoryCard = null;

let secondMemoryCard = null;

let memoryLocked = false;

let memoryMatches = 0;


function startMemoryGame() {

    if (!isGameUnlocked(4)) {

        showLockedMessage(4);

        return;

    }


    closeGames();

    gameOverlay.classList.add("show");

    currentGame = 4;

    memoryMatches = 0;

    firstMemoryCard = null;

    secondMemoryCard = null;

    memoryLocked = false;


    const symbols = [

        "💙",
        "🎂",
        "🎁",
        "🎈",
        "✨",
        "🌙"

    ];


    memoryCards =
        [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5);


    gameContent.innerHTML = `

        <h2 class="game-title">
            Birthday Memory 🧩
        </h2>

        <p class="game-description">
            Match all the birthday cards to reveal your final surprise!
        </p>

        <div class="game-score">
            Matches:
            <span id="memoryScore">0</span> / 6
        </div>

        <div class="memory-grid"
             id="memoryGrid">
        </div>

    `;


    const grid =
        document.getElementById(
            "memoryGrid"
        );


    memoryCards.forEach(
        (symbol, index) => {

            const card =
                document.createElement("button");

            card.className =
                "memory-card";

            card.textContent =
                "❔";

            card.dataset.symbol =
                symbol;

            card.dataset.index =
                index;


            card.addEventListener(
                "click",
                function() {

                    flipMemoryCard(card);

                }
            );


            grid.appendChild(card);

        }
    );

}


function flipMemoryCard(card) {

    if (
        memoryLocked ||
        card === firstMemoryCard ||
        card.classList.contains("matched") ||
        card.classList.contains("revealed")
    ) {

        return;

    }


    card.classList.add("revealed");

    card.textContent =
        card.dataset.symbol;


    if (!firstMemoryCard) {

        firstMemoryCard = card;

        return;

    }


    secondMemoryCard = card;

    memoryLocked = true;


    if (
        firstMemoryCard.dataset.symbol ===
        secondMemoryCard.dataset.symbol
    ) {

        firstMemoryCard.classList.add(
            "matched"
        );

        secondMemoryCard.classList.add(
            "matched"
        );


        memoryMatches++;


        document.getElementById(
            "memoryScore"
        ).textContent =
            memoryMatches;


        resetMemoryTurn();


        if (memoryMatches >= 6) {

            setTimeout(() => {

                closeGame();

                finishAllGames();

            }, 800);

        }


    } else {

        setTimeout(() => {

            firstMemoryCard.classList.remove(
                "revealed"
            );

            secondMemoryCard.classList.remove(
                "revealed"
            );


            firstMemoryCard.textContent =
                "❔";

            secondMemoryCard.textContent =
                "❔";


            resetMemoryTurn();

        }, 800);

    }

}


function resetMemoryTurn() {

    firstMemoryCard = null;

    secondMemoryCard = null;

    memoryLocked = false;

}



/* =====================================================
   FINAL GAME COMPLETED
===================================================== */

function finishAllGames() {

    createConfetti();


    /*
        Small delay so the game
        can close before poem appears.
    */

    setTimeout(() => {

        showFinalPoem();

    }, 700);

}



/* =====================================================
   SPECIAL POEM
===================================================== */

function showFinalPoem() {

    closeGames();

    closeGame();

    closeReward();


    const poem =
        document.getElementById(
            "poemOverlay"
        );


    if (poem) {

        poem.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }

}


function closePoem() {

    const poem =
        document.getElementById(
            "poemOverlay"
        );


    if (poem) {

        poem.classList.remove("show");

        document.body.style.overflow =
            "";

    }

    /*
        Reset the games so they can
        be played again.
    */

    unlockedGames = 1;

    updateGameCards();

}



/* =====================================================
   LOCKED GAME MESSAGE
===================================================== */

function showLockedMessage(gameNumber) {

    const messages = {

        2:
            "🔒 Finish Collect the Hearts first!",

        3:
            "🔒 Finish the Hidden Message game first!",

        4:
            "🔒 Finish Pop the Balloons first!"

    };


    showReward(
        "Not Yet! 🔐",
        messages[gameNumber]
    );

}



/* =====================================================
   OUTSIDE CLICK
===================================================== */

if (gamesOverlay) {

    gamesOverlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === gamesOverlay
            ) {

                closeGames();

            }

        }
    );

}


if (gameOverlay) {

    gameOverlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === gameOverlay
            ) {

                closeGame();

            }

        }
    );

}


const poemOverlay =
    document.getElementById(
        "poemOverlay"
    );


if (poemOverlay) {

    poemOverlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === poemOverlay
            ) {

                closePoem();

            }

        }
    );

}



/* =====================================================
   INITIALIZE
===================================================== */

updateGameCards();