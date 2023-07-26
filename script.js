// Initialize variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let playBtn = document.getElementById('plyBtn');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songName = document.querySelector('.last');
let songitems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Shayad", musicPath: "./songs/1.mp3", cover: "./covers/1.png" },
    { songName: "Sanam Re", musicPath: "./songs/2.mp3", cover: "./covers/2.png" },
    { songName: "Tera Hoke Rahoon", musicPath: "./songs/3.mp3", cover: "./covers/3.png" },
    { songName: "Janiye", musicPath: "./songs/4.mp3", cover: "./covers/4.png" },
    { songName: "Passori", musicPath: "./songs/5.mp3", cover: "./covers/5.png" },
    { songName: "Apna Bana Le", musicPath: "./songs/6.mp3", cover: "./covers/6.png" },
    { songName: "Jaadui", musicPath: "./songs/7.mp3", cover: "./covers/7.png" },
    { songName: "Hawa Banke", musicPath: "./songs/8.mp3", cover: "./covers/8.png" },
    { songName: "Tum Hi Ho", musicPath: "./songs/9.mp3", cover: "./covers/9.png" },
    { songName: "Dil Se Dil Tak", musicPath: "./songs/10.mp3", cover: "./covers/10.png" },
];

songitems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].cover;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
});

// Play and Pause Music
playBtn.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        playBtn.classList.remove('fa-circle-play');
        playBtn.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        playBtn.classList.remove('fa-circle-pause');
        playBtn.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `./songs/${songIndex + 1}.mp3`;
        songName.textContent = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        playBtn.classList.remove('fa-circle-play');
        playBtn.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    });
});

document.getElementById('previous').addEventListener('click', (e) => {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    songName.textContent = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    playBtn.classList.remove('fa-circle-play');
    playBtn.classList.add('fa-circle-pause');
});

document.getElementById('after').addEventListener('click', (e) => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    songName.textContent = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    playBtn.classList.remove('fa-circle-play');
    playBtn.classList.add('fa-circle-pause');
});
