const radio = new Audio('https://streaming.943.se/radio88?Fri');
const program = new Audio(
	'https://radio88.fullystage.se/wp-content/programs/lasse.mp3'
);
window.addEventListener('click', (e) => {
	console.log(e.target);
});
// Play/pause button
const play = document.getElementById('play');
const playHero = document.getElementById('play-hero');

playHero.addEventListener('click', () => {
	play.click();
});

play.addEventListener('click', () => {
	const playBtnContent = document.querySelector('.playbtn-content');
	const pauseBtnContent = document.querySelector('.pausebtn-content');

	if (radio.paused) {
		radio.play();
		playBtnContent.classList.add('hide');
		pauseBtnContent.classList.remove('hide');
		if (!program.paused) {
			playerPlayBtn.click();
		}
	} else {
		radio.pause();
		playBtnContent.classList.remove('hide');
		pauseBtnContent.classList.add('hide');
	}
});

// Stream volume slider
const volume = document.querySelector('#vol');
volume.addEventListener('input', (e) => {
	if (radio.play()) {
		radio.volume = e.currentTarget.value / 100;
	} else if (program.play()) {
		program.volume = e.currentTarget.value / 100;
	}
});

// Mute button
const mute = document.querySelector('.mutebtn');
let muteIcon = document.querySelector('.fa-volume-xmark');
let speakerIcon = document.querySelector('.fa-volume-high');
mute.addEventListener('click', () => {
	if (!program.paused) {
		program.muted = !program.muted;
		muteIcon.classList.toggle('hide');
		speakerIcon.classList.toggle('hide');
	}
});

// Play archive
const playerPlayBtn = document.querySelector('#player__playbtn');
const playerPlayIcon = document.querySelector('.archive-play-icon');
const playerPauseIcon = document.querySelector('.archive-pause-icon');
playerPlayBtn.addEventListener('click', () => {
	if (program.paused) {
		program.play();
		playerPlayIcon.classList.add('hide');
		playerPauseIcon.classList.remove('hide');
		if (!radio.paused) {
			play.click();
		}
	} else {
		program.pause();
		playerPlayIcon.classList.remove('hide');
		playerPauseIcon.classList.add('hide');
	}
});

//Seek slider
const seekslider = document.querySelector('#seekslider');

function changeDuration() {
	sliderPosition = program.duration * (seekslider.value / 100);
	program.currentTime = sliderPosition;
}

function volumeSlider() {
	let position = 0;

	if (!isNaN(program.duration)) {
		position = program.currentTime * (100 / program.duration);
		seekslider.value = position;
	}
}

// Time
const currTime = document.querySelector('#current-time');
const totTime = document.querySelector('#total-time');

program.addEventListener('timeupdate', () => {
	seekTimeUpdate();
});

function seekTimeUpdate() {
	let currentMins = Math.floor(program.currentTime / 60);
	let currentSecs = Math.floor(program.currentTime - currentMins * 60);
	let durationMins = Math.floor(program.duration / 60);
	let durationSecs = Math.floor(program.duration - durationMins * 60);
	let nt = program.currentTime * (100 / program.duration);
	seekslider.value = nt;

	if (currentSecs < 10) {
		currentSecs = '0' + currentSecs;
	}
	if (currentMins < 10) {
		currentMins = '0' + currentMins;
	}
	if (durationSecs < 10) {
		durationSecs = '0' + durationSecs;
	}
	if (durationMins < 10) {
		durationMins = '0' + durationMins;
	}

	currTime.innerHTML = `${currentMins}:${currentSecs}`;
	totTime.innerHTML = `${durationMins}:${durationSecs}`;
}

// Replay volume slider
const programVol = document.querySelector('#player__vol');
programVol.addEventListener('input', (e) => {
	program.volume = e.currentTarget.value / 100;
});

// START ARCHIVE

const startArchiveBtn = document.querySelector('.start-archive');
const archivePlayer = document.querySelector('#player');

startArchiveBtn.addEventListener('click', () => {
	archivePlayer.style.height = 'auto';
	playerPlayBtn.click();
});
