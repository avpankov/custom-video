let video = document.querySelector('.video');
let playButton = document.querySelector('.play-button');
let play = document.querySelector('.play');
let poster = document.querySelector('.poster');
let timeline = document.getElementById('timeline');
let mute = document.querySelector('.mute');
let isPlaying = false;
let isMuted = false;
let currentVolume;
let duration;

video.addEventListener('loadedmetadata', () => {
    duration = video.duration;
    timeline.max = duration;
    timeline.step = 0.01;
    video.volume = 1;
})

playButton.addEventListener('click', playVideo);
play.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);
timeline.min = 0;

timeline.addEventListener('input', () => {
    timeline.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${timeline.value * 100 / video.max}%, #fff ${timeline.value * 100 / video.max}%, #fff 100%)`;
    video.currentTime = timeline.value;
});

mute.addEventListener('click', () => {
    if (!isMuted) {
        video.volume = 0;
        volume.value = 0;
        volume.style.background = '#fff';
        mute.classList.toggle('unmute');
        isMuted = true;
    } else {
        video.volume = currentVolume || 1;
        volume.value = currentVolume || 1;
        volume.style.background = currentVolume ? `linear-gradient(to right, #bdae82 0%, #bdae82 ${currentVolume * 100}%, #fff ${currentVolume * 100}%, #fff 100%)` : '#bdae82';
        mute.classList.toggle('unmute');
        isMuted = false;
    }
});

volume.addEventListener('input', () => {
    volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${volume.value * 100}%, #fff ${volume.value * 100}%, #fff 100%)`;
    video.volume = volume.value;
    currentVolume = video.volume;
})
function playVideo() {
    if (!isPlaying) {
        video.play();
        playButton.style.display = 'none';
        poster.style.display = 'none';
        play.classList.toggle('pause');
        let timer = setInterval(() => {
            timeline.value = video.currentTime;
            timeline.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${video.currentTime * 100 / video.duration}%, #fff ${video.currentTime * 100 / video.duration}%, #fff 100%)`;
            if (video.currentTime == video.duration) {
                clearInterval(timer);
                video.pause();
                playButton.style.display = 'block';
                play.classList.toggle('pause');
                isPlaying = false;
            } 
        }, 100);
        isPlaying = true;
    } else {
        video.pause();
        playButton.style.display = 'block';
        play.classList.toggle('pause');
        isPlaying = false;
    }
}