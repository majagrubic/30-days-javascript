const video = document.querySelector("video"); 
const togglePlayButton = document.querySelector("button.player__button");
const rangeControls = document.querySelectorAll('input[type="range"]');
const progressControl = document.querySelector('div.progress');
const progressBar = document.querySelector('div.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
togglePlayButton.addEventListener('click', togglePlay);
rangeControls.forEach(control => control.addEventListener('change', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progressControl.addEventListener('click', handleResize);
progressControl.addEventListener('mousemove', (e) => mousedown && handleResize(e));
progressControl.addEventListener('mousedown', () => mousedown = true);
progressControl.addEventListener('mouseup', () => mouseup = false);


function togglePlay() { 
  if (video.paused) {
  	togglePlayButton.innerHTML = "&#9612;&#9612;";
  	video.play();
  } else {
  	togglePlayButton.innerHTML = "&#9658;"
    video.pause();
  }
} 

function handleRangeUpdate() {
  if (video.paused) return;
  video[this.name] = this.value;
}

function handleProgress(e) {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progress}%`;
}

function handleResize(e) {
  const width = progressControl.clientWidth;
  const progress = (e.offsetX / width) * video.duration;
  video.currentTime = progress;
}

function skip(e) {
  const skip = e.target.dataset.skip;
  video.currentTime += parseFloat(skip);
}
