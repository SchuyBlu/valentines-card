const all_messages = [
	"Do you know!\nWhat's on the Valentine's Day menu?\nMe n U :)",
	"Hey!\nYou know what I want for Valentine's?\nStill hoping it's Me + u :)",
	"\uD83D\uDC9E You had me at \"Hello\" :)",
	"The things I'd do for a little chocolate \uD83D\uDC95",
	"Hey you!\nNot sure if cupid messed up but\nhere I am :)",
	"I was never into calculus but\nU n Me?\nMight add up :)",
	"U + Me = a decent team\nWanna try it out? :)",
	"Be my sorta valentine?\nWe can work out the details later",
	"We get together like wifi and meme\nalways connected ;)",
	"Hey, fun fact!\nThis Valentine's Day recipe call\nfor the two of us \uD83D\uDC97",
	"Heads up!\nThe best menu special I found this year\nIs U :)",
	"FYI\nCupids looking for an update - \nMight as well put our names in!",
	"Pop Quiz!\nWhat sounds better: chocolates alone?\nOr chocolates with me? :)",
]
let messages = structuredClone(all_messages);
let opened = false;
let changed = 0;
let nudgeInterval = null;
let timesClicked = 0;

// Changes the message on the card.
// Returns: changed, as changed is not reference and functions as a bool.
function changeMessage(messages, changed) {
	let text = document.getElementById("message");
	let new_text = null;

	// Reset array if exhausted options
	if (messages.length === 0) {
		changed = 0;
		messages = structuredClone(all_messages);
	}

	let index = Math.floor(Math.random() * messages.length);

	if (changed === 0 || changed === 1) {
		index = 0;
		new_text = messages[0];
	} else {
		new_text = messages[index];
	}
	changed++;
	let final_text = document.createTextNode(new_text);
	while (text.firstChild) {
		text.removeChild(text.firstChild);
	}
	text.appendChild(final_text);

	messages.splice(index, 1);

	return changed;
}

function triggerNudge(button) {
	button.classList.remove("button-nudge");
	setTimeout(() => button.classList.add("button-nudge"), 10);
}

function startNudgeLoop(button) {
	if (!nudgeInterval) {
		nudgeInterval = setInterval(() => triggerNudge(button), 2000);
	}
}

function stopNudgeLoop() {
	if (nudgeInterval) {
		clearInterval(nudgeInterval);
		nudgeInterval = null;
	}
}

document.getElementById("openButton").addEventListener("click", function() {
	const lid = document.querySelector(".lid");
	const card = document.querySelector(".card");

	stopNudgeLoop();
	timesClicked++;

	if (!opened) {
		// Tranform lid
		changed = changeMessage(messages, changed);
		lid.style.transform = "rotatex(-180deg)";

		setTimeout(() => {
			card.style.zIndex = "3";
			card.style.transform = "translatey(-9.5vmin)";
		}, 400);
		opened = true;

	} else {
		card.style.transform = "translatey(0)";

		// Close lid
		setTimeout(() => {
			card.style.zIndex = "1";
			lid.style.transform = "rotatex(0deg)";
		}, 500);

		// Change message
		setTimeout(() => {
			changed = changeMessage(messages, changed);
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
	if (timesClicked > 1) {
		setTimeout(() => startNudgeLoop(this), 4000);
	} else {
		setTimeout(() => startNudgeLoop(this), 3000);
	}
});

