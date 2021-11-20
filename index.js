const normal = ['#9F0F17', '#094A8F', '#CCA707', '#00A74A']
const bright = ['#ff4c4c', '#1c8cff', '#fed93f', '#13ff7c']

const display = document.getElementById('display')
const onButton = document.getElementById('onoff')
const startButton = document.getElementById('start')
const strictButton = document.getElementById('strict')
//const indicator = document.getElementById('indicator')

const red = document.getElementById('red')
const blue = document.getElementById('blue')
const yellow = document.getElementById('yellow')
const green = document.getElementById('green')

let playerOrder = []
let order = []

let flash
let turn
let good
let compTurn
let intervalId

let noise = false;
let on = false;
let win;

var oncount = 0

function toggle(){
    oncount += 1
    if (oncount % 2 != 0) {
        on = true
        onButton.classList.add('switchon')
        display.classList.add('dispon')
        display.innerHTML = "--"
    }
    else {
        on = false;
        playerOrder = []
        order = []
        noise = false
        clearInterval(intervalId)
        display.classList.remove('dispon')
        onButton.classList.remove('switchon')
        display.innerHTML = "--"
    }
}

onButton.addEventListener('click', event => {
    toggle();
})

startButton.addEventListener('click', event => {
    if (on || win) {
        play();
    }
})

function play() {
    win = false
    order = []
    playerOrder = []
    flash = 0
    intervalId = 0
    turn = 1
    display.innerHTML = "01"
    good = true
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1)
    }
    console.log(order)
    compTurn = true

    intervalId = setInterval(gameTurn, 800)
}

function gameTurn() {
    on = false

    if (flash == turn) {
        clearInterval(intervalId)
        compTurn = false
        clearColor()
        on = true
    }

    if (compTurn) {
        clearColor()
        setTimeout(() => {
            noise = true
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++
        }, 200)
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById('clip1')
        audio.play()
    }
    noise = true
    red.style.backgroundColor = bright[0]
}

function two() {
    if (noise) {
        let audio = document.getElementById('clip2')
        audio.play()
    }
    noise = true
    blue.style.backgroundColor = bright[1]
}
function three() {
    if (noise) {
        let audio = document.getElementById('clip3')
        audio.play()
    }
    noise = true
    yellow.style.backgroundColor = bright[2]
}
function four() {
    if (noise) {
        let audio = document.getElementById('clip4')
        audio.play()
    }
    noise = true
    green.style.backgroundColor = bright[3]
}

function clearColor() {
    red.style.backgroundColor = normal[0]
    blue.style.backgroundColor = normal[1]
    yellow.style.backgroundColor = normal[2]
    green.style.backgroundColor = normal[3]
}

function flashColor() {
    red.style.backgroundColor = bright[0]
    blue.style.backgroundColor = bright[1]
    yellow.style.backgroundColor = bright[2]
    green.style.backgroundColor = bright[3]
}

function switchOn(index) {
    if (on) {
        playerOrder.push(index)
        check()
        switch (index) {
            case 1: one(); break;
            case 2: two(); break;
            case 3: three(); break;
            case 4: four(); break;
        }
        if (!win) {
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
}

document.addEventListener('keyup', (event) => {
    console.log("chuchu" );
    if (event.key == 'ArrowUp') {
        switchOn(1);
    }
    if (event.key == 'Enter') {
        play();
    }
    if (event.key == 'ArrowRight') {
        switchOn(2);
    }
    if (event.key == 'ArrowDown') {
        switchOn(3);
    }
    if (event.key == 'ArrowLeft') {
        switchOn(4);
    }
    if (event.keyCode == 32) {
        toggle();
    }
    if (event.keyCode == 70) {
        document.getElementById("instructions").play();
    }
});


red.addEventListener('click', event => {
    switchOn(1);
})

blue.addEventListener('click', event => {
    switchOn(2);
})

yellow.addEventListener('click', event => {
    switchOn(3);
})

green.addEventListener('click', event => {
    switchOn(4);
})

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;

    if (playerOrder.length == 20 && good) {
        winGame();
    }

    if (good == false) {
        flashColor();
        document.getElementById("hiddenBeep").play();
        display.innerHTML = "NO!";
        setTimeout(() => {
            display.innerHTML = (turn < 10 ? '0' + turn : turn);
            clearColor();
            play();
        }, 800);

        noise = false;
    }

    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        display.innerHTML = (turn < 10 ? '0' + turn : turn);
        intervalId = setInterval(gameTurn, 800);
    }

}

function winGame() {
    flashColor();
    display.innerHTML = "WIN!";
    on = false;
    win = true;
}