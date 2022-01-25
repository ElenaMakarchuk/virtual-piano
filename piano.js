const MODE_BUTTONS = document.querySelectorAll(".btn");
const PIANO_KEYS = document.querySelectorAll(".piano-key");
const AUDIOS = document.querySelectorAll("audio");

let isMouseDowned = false;

const LETTER_NOTE = {};
PIANO_KEYS.forEach((item) => {
  LETTER_NOTE[`Key${item.dataset.letter}`] = {
    note: item.dataset.note,
    pianoKey: item,
  };
});

window.addEventListener("keydown", onKeyDownPiano);
window.addEventListener("keyup", onKeyUpPiano);
window.addEventListener("mouseup", () => {
  isMouseDowned = false;
});

function playAudio(note) {
  AUDIOS.forEach((audio) => {
    if (audio.dataset.note === note) {
      audio.currentTime = 0;
      audio.play();
    }
  });
}

function onMouseDownPiano(event) {
  const pianoKey = event.target;
  isMouseDowned = true;
  togglePianoKeyActive(pianoKey);
  playAudio(pianoKey.dataset.note);
}

function onMouseUpPiano(event) {
  const pianoKey = event.target;
  togglePianoKeyActive(pianoKey);
}

function onMouseOver(event) {
  if (isMouseDowned) {
    const pianoKey = event.target;
    togglePianoKeyActive(pianoKey);
    playAudio(pianoKey.dataset.note);
  }
}

function onMouseOut(event) {
  if (isMouseDowned) {
    const pianoKey = event.target;
    togglePianoKeyActive(pianoKey);
  }
}

function onKeyDownPiano(event) {
  if (
    LETTER_NOTE[event.code] &&
    !LETTER_NOTE[event.code].pianoKey.classList.contains("piano-key-active")
  ) {
    togglePianoKeyActive(LETTER_NOTE[event.code].pianoKey);
    playAudio(LETTER_NOTE[event.code].note);
  }
}

function onKeyUpPiano(event) {
  if (LETTER_NOTE[event.code]) {
    togglePianoKeyActive(LETTER_NOTE[event.code].pianoKey);
  }
}

function togglePianoKeyActive(pianoKey) {
  pianoKey.classList.toggle("piano-key-active-pseudo");
  pianoKey.classList.toggle("piano-key-active");
}

function toggleNotesLeters(event) {
  const clickedButton = event.target;
  if (!clickedButton.classList.contains("btn-active")) {
    MODE_BUTTONS.forEach((item) => {
      item.classList.toggle("btn-active");
    });
    PIANO_KEYS.forEach((e) => {
      e.classList.toggle("letters");
      e.classList.toggle("notes");
    });
  }
}

function toggleFullscreen() {
  if (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement
  ) {
    disableFullscreen();
  } else {
    enableFullscreen();
  }
}

function enableFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

function disableFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
