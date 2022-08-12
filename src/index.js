let video = document.querySelector('.video');
let playButton = document.querySelector('.play-button');
let play = document.querySelector('.play');
let poster = document.querySelector('.poster');
let timeline = document.getElementById('timeline');
let isPlaying = false;
let duration;

video.addEventListener('loadedmetadata', () => {
    duration = video.duration;
    timeline.max = duration;
    console.dir(timeline.max);
})

playButton.addEventListener('click', playVideo);
play.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);
timeline.min = 0;

timeline.addEventListener('input', () => {
    timeline.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${timeline.value}%, #fff ${timeline.value}%, #fff 100%)`;
    video.currentTime = timeline.value;
    console.log(currentTime);
});

function playVideo() {
    if (!isPlaying) {
        video.play();
        playButton.style.display = 'none';
        poster.style.display = 'none';
        play.classList.toggle('pause');
        setInterval(() => {
            timeline.value = Math.round(video.currentTime);
            timeline.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${Math.round(video.currentTime * 100 / video.duration)}%, #fff ${Math.round(video.currentTime * 100 / video.duration)}%, #fff 100%)`;
        }, 1000);
        isPlaying = true;
    } else {
        video.pause();
        playButton.style.display = 'block';
        play.classList.toggle('pause');
        isPlaying = false;
    }
}