const time = document.getElementById("time")
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

let milSec = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;
let xClick = 0;
let yClick = 0;
let tileWidth = 200;
let tileHeight = 200;
let speed = 100

if(window.screen.width < 600){
    canvas.height = 330;
    canvas.width = 330;
    tileWidth = 110;
    tileHeight = 110;
    c.font = "20px 'Luckiest Guy'";
    c.textAlign = "center";
    c.fillText('tap to see picture', 165, 145)
    c.fillText('your time starts when', 165, 175)
    c.fillText('you shuffle the cards', 165, 195)
} else{
    canvas.height = 600;
    canvas.width = 600;
    tileWidth = 200;
    tileHeight = 200;
    c.font = "30px 'Luckiest Guy'";
    c.textAlign = "center";
    c.fillText('tap to see picture', 300, 280)
    c.fillText('your time starts when', 300, 320)
    c.fillText('you shuffle the cards', 300, 350)
}

let santa = new Image();
santa.src = './images/tileSanta.jpg';

let base = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
]
let surroundingTiles = [
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4, 6],
    [1, 3, 5, 7],
    [2, 4, 8],
    [3, 7],
    [6, 4, 8],
    [7, 5]
]
let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8]

let imageTile = [
    [0 , 0],
    [200 , 0],
    [400 , 0],
    [0 , 200],
    [200 , 200],
    [400 , 200],
    [0 , 400],
    [200 , 400],
    [400 , 400]
]

function add() {
    milSec++;
    if(milSec >= 99){
    	milSec = 0;
      seconds++;
   		if (seconds >= 60) {
     		seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
        	hours++;
        }
    	}
    }
    
    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + ":" + (milSec > 9 ? milSec : "0" + milSec);

    timer();
}

function timer() {
    t = setTimeout(add, 10);
}

function gameLoop() {
    for(i = 0; i < base.length; i++){
        for(j = 0; j < base[i].length; j++){
            if(tiles[base[i][j]] != 8){
                c.drawImage(santa, imageTile[tiles[base[i][j]]][0], imageTile[tiles[base[i][j]]][1], 200, 200, j * tileWidth, i * tileHeight, tileWidth, tileHeight)
            } else{
                c.fillStyle = `rgb(255, 0, 0)`;
                c.fillRect(j*tileWidth, i*tileHeight, tileWidth, tileHeight)
            }
        }
    }
    console.log(totalInversions(tiles))
    if(totalInversions(tiles) == 0){
        clearTimeout(t);
        t = 0
        c.drawImage(santa, imageTile[imageTile.length -1][0], imageTile[imageTile.length -1][1], 200, 200, tileWidth * 2, tileHeight * 2, tileWidth, tileHeight)
    }
}

function shuffleArray() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    shuffleCheck()
    timer();
}

function totalInversions(arr) {
    var inversions = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) 
            inversions++;
        }
    }
    return inversions;
}

function shuffleCheck() {
    if(totalInversions(tiles) % 2 !== 0){
        if(tiles[0] == 8 || tiles[1] == 8){
            [tiles[tiles.length - 1], tiles[tiles.length - 2]] = [tiles[tiles.length - 2], tiles[tiles.length - 1]]
        } else{
            [tiles[0], tiles[1]] = [tiles[1], tiles[0]]
        }
    }
    clearTimeout(t);
    time.textContent = "00:00:00:00";
    milSec = 0; seconds = 0; minutes = 0; hours = 0;
    moves = 0
    t = setTimeout(add, 10);
    gameLoop()
}

canvas.addEventListener('click', function(e) {
    xClick = e.x - canvas.offsetLeft 
    yClick = e.y - canvas.offsetTop
    click()
})
canvas.addEventListener('touchstart', function(e){
    xClick = e.touches[0].clientX - e.target.getBoundingClientRect().left
    yClick = e.touches[0].clientY - e.target.getBoundingClientRect().top
    click()
})

function click() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    for(i = 0; i < base.length; i++){
        for(j = 0; j < base[i].length; j++){
            if(xClick > j*tileWidth && xClick < j*tileWidth + tileWidth && yClick > i*tileHeight && yClick < i*tileHeight + tileHeight){
                for(k = 0; k < surroundingTiles[base[i][j]].length; k++){
                    if(tiles[surroundingTiles[base[i][j]][k]] == 8){
                        [tiles[base[i][j]], tiles[surroundingTiles[base[i][j]][k]]] = [tiles[surroundingTiles[base[i][j]][k]], tiles[base[i][j]]]
                    }
                }
            }
        }
    }
    gameLoop()
}
