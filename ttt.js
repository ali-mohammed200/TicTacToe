let playing = false;

function play() {
    playing = !playing;
    if (playing === true){
        Play.textContent = 'Stop'
        select();
    }
    else if (playing === false){
        stop();
    }   
    // console.log(playing);
    return playing;
}

let turn = 0;
let boardrows = [[tl,tp,tr],[left,middle,right],[bl,bottom,br]]
let boardcols = [[tl,left,bl],[tp,middle,bottom],[tr,right,br]]
let fullboard = [tl,tp,tr,left,middle,right,bl,bottom,br]

function select() {
    if (playing){
        for (let spot of fullboard){
            // console.log(spot.id);
            spot.addEventListener('click', fill)
        }
    }
}
function fill() {
    let val;
    turn % 2 === 0 ? val = 'X' : val = 'O';
    this.textContent = val;
    this.style.color = 'white';
    this.removeEventListener('click', fill);
    fullboard = fullboard.filter(s => s !== this)
    turn++;
    
    console.log(turn);
    if (turn > 4){
       let checker = check();
       if (checker === true){
           victory();
       }
       else if (turn === 9){play()}
    }
}
let victoryRow;
function check() {
    let row1 = boardrows[0];
    let row2 = boardrows[1];
    let row3 = boardrows[2];
    let col1 = boardcols[0];
    let col2 = boardcols[1];
    let col3 = boardcols[2];
    let cross1 = [tl, middle, br];
    let cross2 = [tr, middle, bl];
    
    let toBeChecked = [row1,row2,row3,col1,col2,col3,cross1,cross2]

    for (let item of toBeChecked){
        let result = (item[0].textContent === item[1].textContent && item[1].textContent === item[2].textContent)
        if (result === true){
            victoryRow = item;
            return true;
        }
        
    }  
    return false;
}

function victory() {
    for (let item of victoryRow){
        item.style.color = 'green'
    }
    play();

}
function stop(ms = 1000) {
    for (let item of fullboard){
        item.removeEventListener('click', fill)
    }
    fullboard = [tl, tp, tr, left, middle, right, bl, bottom, br]
    turn = 0;
    let i = 1;
    setTimeout(() => {
        for (let item of fullboard) {
            item.textContent = `${i}`;
            item.style.color = 'black'
            i++;
            
        }   
    }, ms);
    setTimeout(play,ms);
    let winner;
    if(victoryRow !== undefined){
        winner = victoryRow[0].textContent
    
        victoryRow = undefined;
        let loser;
        winner === 'X' ? loser = 'O' : loser = 'X';
        let winnerScore = document.getElementById(winner);
        let loserScore = document.getElementById(loser)
        let winnerLetter = document.getElementById(winner.toLowerCase())
        let loserLetter = document.getElementById(loser.toLowerCase())
        winnerScore.textContent = String(Number(winnerScore.textContent) + 1)
        if (Number(winnerScore.textContent) > Number(loserScore.textContent)){
        winnerLetter.style.color = 'green'
        }
        else if (Number(winnerScore.textContent) < Number(loserScore.textContent)){
        loserLetter.style.color = 'green'
        }
        else if (Number(winnerScore.textContent) == Number(loserScore.textContent)){
        winnerLetter.style.color = 'white';
        loserLetter.style.color = 'white';
        }
    }
    
}
function reset() {
    stop(0);
    x.style.color = 'white';
    o.style.color = 'white';
    O.textContent = '0';
    X.textContent = '0';
    playing = false;
    Play.textContent = 'Start'
    
}