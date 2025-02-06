const ALL_MESSAGES = [
	"Do you know!\nWhat's on the Valentine's Day menu?\nMe n U :)",
	"Still hoping it's Me + u btw :)",
	"\uD83D\uDC9E You had me at \"Hello\" :)",
	"The things I'd do for a little chocolate \uD83D\uDE09",
	"Hey you!\nNot sure if cupid messed up but\nhere I am :)",
	"I was never into calculus but\nU n Me?\nMight add up :)",
	"U + Me = a decent team\nWanna try it out? :)",
	"Be my sorta valentine?\nWe can work out the details later",
	"We get together like wifi and memes!\nalways connected ;)",
	"Hey, fun fact!\nThis Valentine's Day recipe call\nfor the two of us \uD83D\uDC97",
	"Heads up!\nThe best menu special I found this year\nIs U :)",
	"FYI\nCupids looking for an update - \nMight as well put our names in!",
	"Pop Quiz!\nWhat sounds better: chocolates alone?\nOr chocolates with me? :)",
]

// state variables
let messages = [...ALL_MESSAGES];
let messageIndex = 0;
let opened = false;
let timesClicked = 0;
let animationRunning  = false;
let nudgeInterval = null;

// grab elements just once
let lid = document.querySelector(".lid");
let card = document.querySelector(".card");
let messageElement = document.getElementById("message");
let button = document.getElementById("openButton");


/*
 * Returns the next messages and updates the state of `messages`.
 */
function getNextMessage() {
	if (messages.length === 0) {
		messages = [...ALL_MESSAGES];
		messageIndex = 0;
	}

	// Let the first two messages play out in order, the ones after can be
	// randomized.
	let index = (messageIndex <= 1) 
		? 0 
		: Math.floor(Math.random() * messages.length);

	let newMessage = messages[index];
	messages.splice(index, 1);
	
	messageIndex++;

	return newMessage;
}


/*
 * Updates the text displayed on the card.
 */
function updateCardMessage() {
	let text = getNextMessage();

	let textNode = document.createTextNode(text);
	while(messageElement.firstChild) {
		messageElement.removeChild(messageElement.firstChild);
	}
	messageElement.appendChild(textNode);
}


/*
 * Adds a "nudge" animation to the button.
 */
function triggerNudge(button) {
	button.classList.remove("button-nudge");
	requestAnimationFrame(() => {
		setTimeout(() => button.classList.add("button-nudge"), 10);
	})
}


/*
 * Starts the loop for the "nudge" animation.
 */
function startNudgeLoop(button) {
	if (!nudgeInterval) {
		nudgeInterval = setInterval(() => triggerNudge(button), 2000);
	}
}


/*
 * Kills the loop for the "nudge" animation.
 */
function stopNudgeLoop() {
	if (nudgeInterval) {
		clearInterval(nudgeInterval);
		nudgeInterval = null;
	}
}


button.addEventListener("click", function() {
	// Prevents clicking and spam while animation runs.
	if (animationRunning) return;
	animationRunning = true;

	stopNudgeLoop();

	if (!opened) {
		// Opening card for the first time
		updateCardMessage();
		lid.style.transform = "rotatex(-180deg)";

		setTimeout(() => {
			card.style.zIndex = "3";
			card.style.transform = "translatey(-9.5vmin)";
		}, 400);

		opened = true;

	} else {
		// Re-open sequence after first time
		card.style.transform = "translatey(0)";

		// Close lid
		setTimeout(() => {
			card.style.zIndex = "1";
			lid.style.transform = "rotatex(0deg)";
		}, 500);

		// Update message while closeed
		setTimeout(() => {
			updateCardMessage();
		}, 900);

		// Open lid
		setTimeout(() => {
			lid.style.transform = "rotatex(-180deg)";
		}, 1400);

		// lift the card
		setTimeout(() => {
			card.style.zIndex = "3";
			card.style.transform = "translatey(-9.5vmin)";
		}, 1800);

	}

	// Decide when to resume nudging the button. Changes depending on whether
	// its the first time opening the card or subsequent.
	let nudgeDelay = timesClicked > 0 ? 3000 : 1000;
	setTimeout(() => startNudgeLoop(this), nudgeDelay);

	let animationEndDelay = timesClicked > 0 ? 2300 : 1500;
	setTimeout(() => {
		animationRunning = false;
	}, animationEndDelay);

	timesClicked++;
});

