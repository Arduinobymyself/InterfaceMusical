
// *************** Objects *************** // 
const starwayToHeaven = {
    id: '0',
    songName: "Starway To Heaven",
    artist: "Led Zeppelin",
    album: "Led Zepelin IV",
    coverFile: "Led-Zeppelin-IV.jpg",
    songFile: "Led-Zeppelin-Stairway-To-Heaven.mp3",
    liked: false,
}; 

const U2withOrWithoutYou = {
    id: '1',
    songName: "With or Without You",
    artist: "U2",
    album: "The Joshua Tree",
    coverFile: "U2-With-Or-Without-You.jpg",
    songFile: "U2-With-Or-Without-You.mp3",
    liked: false,
}     

const aHaTakeOnMe = {
    id: '2',
    songName: "Take on Me",
    artist: "A Ha",
    album: "Hunting High and Low",
    coverFile: "A-Ha-Take-On-Me.jpg",
    songFile: "A-Ha-Take-On-Me.mp3",
    liked: false,
};  

const depecheModeEnjoyTheSilence = {
    id: '3',
    songName: "Enjoy The Silence",
    artist: "Depeche Mode",
    album: "violator",
    coverFile: "Depeche-Mode-Enjoy-The-Silence.jpg",
    songFile: "Depeche-Mode-Enjoy-The-Silence.mp3",
    liked: false,
}; 

const REMLosingMyReligion = {
    id: '4',
    songName: "Losing My Religion",
    artist: "R.E.M.",
    album: "Out Of Time",
    coverFile: "REM-Losing-My-Religion.jpg",
    songFile: "REM-Losing-My-Religion.mp3",
    liked: false,
};

const direStraitsMoneyForNothing = {
    id: '5',
    songName: "Money for Nothing",
    artist: "Dire Straits",
    album: "Brothers in Arms",
    coverFile: "Dire-Straits-Money-For-Nothing.jpg",
    songFile: "Dire-Straits-Money-For-Nothing.mp3",
    liked: false,
};


// *************** Variables *************** // 
const musicLibrary = [
    starwayToHeaven, 
    U2withOrWithoutYou, 
    aHaTakeOnMe, 
    depecheModeEnjoyTheSilence, 
    REMLosingMyReligion, 
    direStraitsMoneyForNothing,
];

let songs = [
    ...musicLibrary
];

let playlist = JSON.parse(localStorage.getItem('playlist')) ?? [
    starwayToHeaven, 
    U2withOrWithoutYou, 
    aHaTakeOnMe, 
];



// *************** Elements *************** // 
const pageBody = document.getElementById('page-body');
const searchTerm = document.getElementById('search-term');
const searchButton = document.getElementById('search-button');
const playlistElement = document.getElementById('playlist');
const startPlayerBtn = document.getElementById('start-player');


// *************** Functions *************** // 
function loadLibrary(){
    pageBody.innerHTML = '';
    for(let index = 0; index < musicLibrary.length; index++){
        pageBody.innerHTML += `
        <div class="card d-flex flex-column align-items-center" style="width: 18rem; height: 30rem;">
        <img src="./images/covers/${songs[index].coverFile}" class="card-img-top" alt="Music Album Cover">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${songs[index].songName}</h5>
                <p class="card-text">${songs[index].album}</p>
                <p class="card-text">${songs[index].artist}</p>
                <button class="btn btn-outline-success" onclick="addToPlaylist('${songs[index].id}')"><i class="bi bi-plus-circle"></i> Add to Playlist</button>
            </div>
        </div>
        `;
    }
}

function searchClick(){
    if(searchTerm.value === ""){
        return;
    } else{
        songs = songs.filter((song) => song.songName.includes(searchTerm.value) || song.album.includes(searchTerm.value) || song.artist.includes(searchTerm.value));
        loadLibrary();
    }
}

function resetFilter(){
    if(searchTerm.value !== ""){
        return;
    } else{
        songs = [...musicLibrary];
        loadLibrary();
    }
}

function loadPlaylist(){
    playlistElement.innerHTML = '';
    for(let index = 0; index < playlist.length; index++){
        playlistElement.innerHTML += `
        <p id=${playlist[index].id} class="d-flex justify-content-between align-items-center border-top border-bottom">
        ${playlist[index].songName} - ${playlist[index].artist} 
        <button class="btn btn-outline-danger" onclick="removeFromPlaylist('${playlist[index].id}')">
        <i class="bi bi-trash-fill"></i>
        </button>
        </p>
        `
    }
}

function removeFromPlaylist(songId){
    playlist = playlist.filter((song) => song.id !== songId);
    document.getElementById(songId).remove();
    updateLocalStorage();
}

function addToPlaylist(songId){
    if(playlist.find((song) => song.id === songId)){
        return;
    }else{
        const songToAdd = songs.find((music) => music.id === `${songId}`);
        playlist.push(songToAdd);
        playlistElement.innerHTML += `
        <p id=${songToAdd.id} class="d-flex justify-content-between align-items-center border-top border-bottom">
        ${songToAdd.songName} - ${songToAdd.artist} 
        <button class="btn btn-outline-danger" onclick="removeFromPlaylist('${songToAdd.id}')">
        <i class="bi bi-trash3"></i>
        </button>
        </p>
        `
    }
    updateLocalStorage();
}

function updateLocalStorage(){
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

function startPlayer(){
    location.href = '/player/';
}

// *************** Calls *************** // 
loadLibrary();
loadPlaylist();


// *************** Events *************** // 
searchButton.addEventListener('click', searchClick);
searchTerm.addEventListener('input', resetFilter);
startPlayerBtn.addEventListener('click', startPlayer);



