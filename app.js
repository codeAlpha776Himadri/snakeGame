import { update as updateSnake, draw as drawSnake, SNAKE_SPEED , getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood, score } from './food.js'
import { outsideGrid } from './grid.js'

// SNAKE_SPEED = 10 ;

const restrtBtn = document.querySelector('.restart-btn');

let lastRenderTime = 0
let gameOver = false
let gameOverBtn = false ;
const gameBoard = document.querySelector('.game-section')

function restartGame() {
    if(confirm('Do you want to Restart Game ??')) {
        window.location = '/snakeGame';
    }
}

restrtBtn.addEventListener('click', restartGame);

function main(currentTime) {
  if (gameOver) {
    if (confirm(`Your Score is ${score} . Press ok to restart.`)) {
      window.location = '/snakeGame'
    }
    return
  }


  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() ;
}
