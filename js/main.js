'use strict';

/*************
 * Functions
 ************/

//utilities
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function myCreateElement(tag, className, content) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.append(content);

  return element;
}

function setCellNumber(level) {
  let cellNumber;
  switch (level) {
    case 2:
      cellNumber = 81; //9*9 = 9^2
      break;

    case 3:
      cellNumber = 49; //7*7 = 7^2
      break;

    case 1:
    default:
      cellNumber = 100; //10*10 = 10^2
      break;
  }

  return cellNumber;
}

/*
CreateBoard: crea la board di giorno
*/
function createBoard(mainElement, cellNumber) {
  const cells = Math.sqrt(cellNumber);
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= cellNumber; i++) {
    const myElement = myCreateElement('div', 'cell', i);
    myElement.classList.add(`cell-${cells}`);
    fragment.append(myElement);
  }

  mainElement.append(fragment);
}

/*
generateBombs: genera le bombe del gioco
*/
function generateBombs(num, numLimit) {
  const bombs = [];
  while (bombs.length < num) {
    const currentNumber = getRndInteger(1, numLimit);

    if (!bombs.includes(currentNumber)) {
      bombs.push(currentNumber);
    }
  }

  return bombs;
}

/*
generateBombs: genera le bombe del gioco
*/

function gameLogic(board, cellNumber) {
  const score = [];
  let play = true;
  const bombNumber = 16;
  const bombs = generateBombs(bombNumber, cellNumber);
  const message = document.querySelector('.game-status');
  board.addEventListener('click', function (event) {
    if (!event.target.classList.contains('cell')) return;
    if (!play) return;

    const currentElement = event.target;
    const cellValue = parseInt(currentElement.innerHTML);

    if (bombs.includes(cellValue)) {
      //ho calpestato una bomba
      console.log('ho calpestato una bomba');
      currentElement.style.backgroundColor = 'red';
      message.innerHTML = `Hai calpelstato una bomba: ${score.length}`;
      play = false;
    } else {
      console.log('sono stato fortunato');
      currentElement.style.backgroundColor = 'blue';

      if (!score.includes(cellValue)) {
        score.push(cellValue);
      }

      message.innerHTML = `Sono stato fortunato: ${score.length}`;

      if (score.length === cellNumber - bombs.length) {
        message.innerHTML = `Hai vinto: ${score.length}`;
      }
    }
  });
}

/*************
 * Game Core
 ************/

function campoMinato() {
  resetGameFn();

  const board = document.querySelector('.board');
  const level = parseInt(document.getElementById('select-level').value);

  const cellNumber = setCellNumber(level);

  //crea l'area di gioco
  createBoard(board, cellNumber);
  gameLogic(board, cellNumber);
}

function resetGameFn() {
  const board = document.querySelector('.board');
  board.innerHTML = '';
}

/*************
 * Game Executions
 ************/

const startGame = document.getElementById('game-start');
const resetGame = document.getElementById('game-reset');
startGame.addEventListener('click', campoMinato);
resetGame.addEventListener('click', resetGameFn);
