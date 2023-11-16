'use strict';

/*
Functions
*/
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

function createBoard(mainElement, cellNumber) {
  const cells = Math.sqrt(cellNumber);

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= cellNumber; i++) {
    const myElement = myCreateElement('div', 'cell', i);
    myElement.classList.add(`cell-${cells}`);

    myElement.addEventListener('click', function () {
      console.log(myElement.innerHTML);
      myElement.classList.add('prova');
    });

    fragment.append(myElement);
  }
  mainElement.append(fragment);
}

function campoMinato() {
  resetGameFn();
  const board = document.querySelector('.board');
  let level = 3; //TODO: sarà determinato dall'utente con una select HTML (1,2,3)
  const cellNumber = setCellNumber(level);

  console.log(cellNumber);

  createBoard(board, cellNumber);
}

function resetGameFn() {
  const board = document.querySelector('.board');
  board.innerHTML = '';
}

/*
Game
*/

const startGame = document.getElementById('game-start');
const resetGame = document.getElementById('game-reset');
startGame.addEventListener('click', campoMinato);
resetGame.addEventListener('click', resetGameFn);
