const startButton = document.getElementById("start_button");
const gifLanding = document.querySelector(".gif");
const questionLanding = document.querySelector(".question");

let questionMain, gifMain, yesButton, noButton, input;
let count = 0;

startButton.addEventListener("click", () => {
    input = document.getElementById("fname").value.trim();

    if (input === "") {
        gifLanding.src = "https://media.giphy.com/media/VB3cK9oA48BbQWcObd/giphy.gif";
        questionLanding.innerHTML = "Please give me your name before you start!";
        return;
    }

    document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Do You Love Me?</title>
        <link rel="stylesheet" href="styleMain.css">
    `;

    document.body.innerHTML = `
    <div class="wrapper">
        <div class="top-section">
            <h2 class="question">Hello ${input}! Would you make my day and say yes to a date with me?</h2>
            <div class="gif-container">
                <img class="gif" alt="gif" src="https://media.giphy.com/media/0kDdAFAELmvvFNUKim/giphy.gif">
            </div>
        </div>
        <div class="buttons-container">
            <button class="yes-btn">Yes</button>
            <button class="no-btn">No</button>
        </div>
    </div>
    `;

    initializeElements();
});

function initializeElements() {
    questionMain = document.querySelector(".question");
    gifMain = document.querySelector(".gif");
    yesButton = document.querySelector(".yes-btn");
    noButton = document.querySelector(".no-btn");

    if (yesButton && noButton) {
        yesButton.addEventListener("click", yesButtonListener);
        noButton.addEventListener("click", noButtonListener);
        positionNoButton();
    }
}

function yesButtonListener() {
    document.body.innerHTML = `
        <div class="wrapper">
            <p class="yes-response">
                Yay! Thank you 💖<br><br>
                That one hour at the garden meant the world to me,<br>
                and I just need 438,000 more hours with you ❤️<br><br>
                I need you forever, ${input}!
            </p>
            <img class="gif" alt="gif" src="https://media.giphy.com/media/fHGl1MDMNkO6fOaFDF/giphy.gif">
        </div>
    `;
}

function noButtonListener() {
    const messages = [
        "You don't love me? 💔 It's okay, I'm strong... I fight for those I love.",
        "This baka made up their mind... there's no way we can move on... show some mercy!",
        "Don't play with my heart 💞. If there's even a little chance... would you try?",
        "You don't like me fine 💔 at least try naa...?",
        "Okay fine, maybe just one more conversation... or a lifetime of them?"
    ];
    
    const gifs = [
        "https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif",
        "https://media.giphy.com/media/QuCslOrnS649PSCnn7/giphy.gif",
        "https://media.giphy.com/media/QuCslOrnS649PSCnn7/giphy.gif",
        "https://media.giphy.com/media/QuCslOrnS649PSCnn7/giphy.gif",
        "https://media.giphy.com/media/8OPf6xrtXi3QEcu5h9/giphy.gif"
    ];
    
    const currentIndex = Math.min(count, messages.length - 1);
    questionMain.innerHTML = messages[currentIndex];
    gifMain.src = gifs[currentIndex];
    
    positionNoButton();
    count++;
}function positionNoButton() {
    if (!noButton || !gifMain) return;

    const gifContainer = document.querySelector('.gif-container');
    const container = document.querySelector('.wrapper');
    const yesBtnRect = yesButton.getBoundingClientRect();
    const questionRect = questionMain.getBoundingClientRect();
    const gifRect = gifContainer.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const noBtnRect = noButton.getBoundingClientRect();

    const restrictedZones = [yesBtnRect, questionRect];

    const safeArea = {
        minX: 20,
        maxX: containerRect.width - noBtnRect.width - 20,
        minY: 20,
        maxY: containerRect.height - noBtnRect.height - 20
    };

    let attempts = 0;
    let randomX, randomY, noBtnNewRect;

    do {
        randomX = Math.random() * (safeArea.maxX - safeArea.minX) + safeArea.minX;
        randomY = Math.random() * (safeArea.maxY - safeArea.minY) + safeArea.minY;

        // Simulate where the button would be
        noBtnNewRect = {
            left: randomX + containerRect.left,
            top: randomY + containerRect.top,
            right: randomX + containerRect.left + noBtnRect.width,
            bottom: randomY + containerRect.top + noBtnRect.height
        };

        // Check if it overlaps any restricted area
        const overlaps = restrictedZones.some(zone => {
            return !(
                noBtnNewRect.right < zone.left ||
                noBtnNewRect.left > zone.right ||
                noBtnNewRect.bottom < zone.top ||
                noBtnNewRect.top > zone.bottom
            );
        });

        if (!overlaps) break;
        attempts++;
    } while (attempts < 50); // Prevent infinite loop

    noButton.style.position = "absolute";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}