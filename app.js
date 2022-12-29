const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ec403d', '#ce04b4', '#a9b92a', '#af3270', 'darkred', 'red']


let time = 0;
let score = 0;


// Listeners

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})


board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})




//Functions

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle();
    // timeEl.innerHTML = `00:${time}`
    setTime(time)
}


function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
    // timeEl.innerHTML = `00: ${current}`
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)


    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    // const color = getRandomColor();
    circle.style.background = getRandomColor()
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`


    board.append(circle);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}



function winTheGame() {
    const circle = document.querySelector('.circle')
    if (circle) {
        circle.click();
    }
}
// setInterval(winTheGame, 100)