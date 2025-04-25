const startButton = document.getElementById("start_button");
const gifLanding = document.querySelector(".gif");
const questionLanding = document.querySelector(".question");

var questionMain = null;
var gifMain = null;
var yesButton = null;
var noButton = null;
var input = null;
var count = 0;

startButton.addEventListener("click", () => {
    input = document.getElementById("fname").value;

    if (input == "") {
        gifLanding.src = "https://media.giphy.com/media/VB3cK9oA48BbQWcObd/giphy.gif";
        questionLanding.innerHTML = "Please give me your name before you start!";
    } else {
        document.head.innerHTML = `
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Do You Love Me?</title>
            <link rel='stylesheet' href='styleMain.css'/>
        `;

        document.body.innerHTML = `
            <div class='wrapper'>
                <h2 class='question'>Hello ${input}! Would you make my day and say yes to going on a date with me??</h2>
                <img class='gif' alt='gif' src='https://media.giphy.com/media/0kDdAFAELmvvFNUKim/giphy.gif'/>
                <div class='btn-group'>
                    <button class='yes-btn'>Yes</button>
                    <button class='no-btn'>No</button>
                </div>
            </div>
        `;

        questionMain = document.querySelector(".question");
        gifMain = document.querySelector(".gif");
        yesButton = document.querySelector(".yes-btn");
        noButton = document.querySelector(".no-btn");

        yesButton.addEventListener("click", yesButtonListener);
        noButton.addEventListener("click", noButtonListener);
    }
});

function yesButtonListener() {
    document.body.innerHTML = `
        <div class='wrapper'>
            <h2 class='question'>
                Yay! Thank you. 💖<br>
                That 1 hour at the garden meant the world to me, and I just need 438,000 more hours with you. ❤️<br>
                I need you forever, ${input}!
            </h2>
            <img class='gif' alt='gif' src='https://media.giphy.com/media/fHGl1MDMNkO6fOaFDF/giphy.gif'/>
        </div>
    `;
}

function noButtonListener() {
    if (count === 0) {
        gifMain.src = "https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif";
        questionMain.innerHTML = "You don't love me? that's okay I'm strong, I'll fight for people I love";
    } else if (count === 1) {
        gifMain.src = "https://media.giphy.com/media/QuCslOrnS649PSCnn7/giphy.gif";
        questionMain.innerHTML = "Don’t play with my heart 💞. If there's even a little chance... would you try?";
    } else if (count === 2) {
        gifMain.src = "https://i.pinimg.com/originals/6b/1e/b7/6b1eb75915c0359234e21b6557120279.gif";
        questionMain.innerHTML = "You don't like me, fine 💔 at least try naa...";
    } else {
        gifMain.src = "https://media.giphy.com/media/8OPf6xrtXi3QEcu5h9/giphy.gif";
        questionMain.innerHTML = "Can we at least talk? I mean, keep on talking—forever?";
    }
    
    const gifRect = gifMain.getBoundingClientRect();
    const questionRect = questionMain.getBoundingClientRect();
    const noButtonRect = noButton.getBoundingClientRect();

    const maxX = window.innerWidth - noButtonRect.width;

    // Set a safe vertical range: from top of page to just above the question
    const safeTop = Math.max(0, questionRect.bottom + 10); // Ensures it's below the question
    const maxY = gifRect.top - noButtonRect.height - 10;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * (maxY - safeTop) + safeTop);

    noButton.style.position = "absolute";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;

    count++;
}