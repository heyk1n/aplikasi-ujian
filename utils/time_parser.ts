const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;

export function getHours(time: number) {
	return Math.floor(time / hour);
}

export function getMinutes(time: number) {
	let timeMinute = time / minute;

	while (timeMinute > 60) {
		timeMinute -= 60;
	}

	return Math.floor(timeMinute);
}

export function getSeconds(time: number) {
	let timeSecond = time / second;

	while (timeSecond > 60) {
		timeSecond -= 60;
	}

	return Math.floor(timeSecond);
}

export function timeString(time: number) {
	let timeString = "";

	const hours = getHours(time);
	const minutes = getMinutes(time);
	const seconds = getSeconds(time);

	if (hours > 0) {
		timeString += `${hours}:`;
	}

	if (minutes > 0) {
		timeString += `${minutes > 9 ? minutes : `0${minutes}`}:`;
	}

	timeString += `${seconds > 9 ? seconds : `0${seconds}`}${
		minutes === 0 ? "s" : ""
	}`;

	return timeString;
}
