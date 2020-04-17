---
---

function rocket2Duration() {
	const diff = Date.now() - new Date(2018, 9, 29);
	const months = diff / 2629800000 + 0.5;

	document.getElementById('rocket2-months').innerHTML = Math.round(months);
}

rocket2Duration();
