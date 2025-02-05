const messages = [
	"Do you know!\nWhat's on the Valentine's Day menu?\nMe n U :)",
	"\uD83D\uDC9E You had me at \"Hello\" :)",
	"The things I'd do for a little chocolate \uD83D\uDC95",
	"Hey you!\nNot sure if cupid messed up but\nhere I am :)",
]

let opened = false;
let changed = false;
document.getElementById("openButton").addEventListener("click", function() {
	if (!opened) {
		const lid = document.querySelector(".lid");
		const card = document.querySelector(".card");
		let text = document.getElementById("message");
		let new_text = null;

		if (!changed) {
			changed = true;
			new_text = messages[0];
		} else {
			new_text = messages[Math.floor(Math.random() * messages.length)];
		}

		console.log(new_text);
		console.log(text);
		let final_text = document.createTextNode(new_text);
		while (text.firstChild) {
			text.removeChild(text.firstChild);
		}
		text.appendChild(final_text);

		// Tranform lid
		lid.style.transform = "rotatex(-180deg)";

		setTimeout(() => {
			card.style.zIndex = "3";
			card.style.transform = "translatey(-9.5vmin)";
		}, 400);
		opened = true;
	}
});

document.getElementById("resetButton").addEventListener("click", function() {
	if (opened) {
		const lid = document.querySelector(".lid");
		const card = document.querySelector(".card");

		card.style.transform = "translatey(0)";

		setTimeout(() => {
			card.style.zIndex = "1";
			lid.style.transform = "rotatex(0deg)";
		}, 400);
		opened = false;
	}
});
