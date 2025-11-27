// Songs list
let songs = [
    {
        title: "Song 1",
        artist: "Artist A",
        src: "song1.mp3"
    },
    {
        title: "Song 2",
        artist: "Artist B",
        src: "song2.mp3"
    },
    {
        title: "Song 3",
        artist: "Artist C",
        src: "song3.mp3"
    }
];

let index = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const totalDuration = document.getElementById("total-duration");

const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

// Load song
function loadSong(i) {
    index = i;
    audio.src = songs[i].src;
    title.textContent = songs[i].title;
    artist.textContent = songs[i].artist;
}
loadSong(index);

// Play / Pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

// Next
nextBtn.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸";
});

// Previous
prevBtn.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸";
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;

    // Time display
    currentTime.textContent = formatTime(audio.currentTime);
    totalDuration.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value * audio.duration) / 100;
});

// Volume
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Format time
function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Playlist
songs.forEach((song, i) => {
    let li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => {
        loadSong(i);
        audio.play();
        playBtn.textContent = "⏸";
    };
    playlist.appendChild(li);
});

// Autoplay next song
audio.addEventListener("ended", () => {
    nextBtn.click();
});
