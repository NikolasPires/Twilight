const btnResp1 = document.querySelector(`.resposta1`);
const btnResp2 = document.querySelector(`.resposta2`);
const btnResp3 = document.querySelector(`.resposta3`);
const moons = document.querySelector(`#pontos`);


const btnResp1Test2 = document.querySelector(`.resposta1Test2`);
const btnResp2Test2 = document.querySelector(`.resposta2Test2`);
const btnResp3Test2 = document.querySelector(`.resposta3Test2`);

const btnResp1Test3 = document.querySelector(`.resposta1Test3`);
const btnResp2Test3 = document.querySelector(`.resposta2Test3`);
const btnResp3Test3 = document.querySelector(`.resposta3Test3`);


const column = document.querySelector('.row');

let pontos = 0;
let pAcertou1 = false;
let pAcertou2 = false;
let pAcertou3 = false;


let dragAcertou1 = false;
let dragAcertou2 = false;
let dragAcertou3 = false;

moons.innerText = `Moons: ${pontos}🌙`;

// Teste 1 da Primeira estacao

btnResp1.addEventListener(`click`, () => {
    btnResp1.style.backgroundColor = `#044040`;
    btnResp1.style.color = '#F2F2F2';
    if(pAcertou1 == false){
      pontos++;
      moons.innerText = `Moons: ${pontos}🌙`;
      pAcertou1 = true;
    }
    
});

btnResp2.addEventListener(`click`, () => {
    btnResp2.style.backgroundColor = `#8C1F28`;
    btnResp2.style.color = '#F2F2F2';
});

btnResp3.addEventListener(`click`, () => {
    btnResp3.style.backgroundColor = `#8C1F28`;
    btnResp3.style.color = '#F2F2F2';
});


// Teste 2 da Primeira estacao


btnResp1Test2.addEventListener(`click`, () => {
    btnResp1Test2.style.backgroundColor = `#8C1F28`;
    btnResp1Test2.style.color = '#F2F2F2';
});

btnResp2Test2.addEventListener(`click`, () => {
    btnResp2Test2.style.backgroundColor = `#044040`;
    btnResp2Test2.style.color = '#F2F2F2';
    if(pAcertou2 == false){
      pontos++;
      moons.innerText = `Moons: ${pontos}🌙`;
      pAcertou2 = true;
    }
    
});

btnResp3Test2.addEventListener(`click`, () => {
    btnResp3Test2.style.backgroundColor = `#8C1F28`;
    btnResp3Test2.style.color = '#F2F2F2';
});

// Teste 3 da Primeira estacao

btnResp1Test3.addEventListener(`click`, () => {
    btnResp1Test3.style.backgroundColor = `#044040`;
    btnResp1Test3.style.color = '#F2F2F2';
    if(pAcertou3 == false){
      pontos++;
      moons.innerText = `Moons: ${pontos}🌙`;
      pAcertou3 = true;
    }
});

btnResp2Test3.addEventListener(`click`, () => {
    btnResp2Test3.style.backgroundColor = `#8C1F28`;
    btnResp2Test3.style.color = '#F2F2F2';
   
});

btnResp3Test3.addEventListener(`click`, () => {
    btnResp3Test3.style.backgroundColor = `#8C1F28`;
    btnResp3Test3.style.color = '#F2F2F2';
});


const columns = document.querySelectorAll(".column");
const imgs = document.querySelectorAll(`.imgDrag`);


document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
 
});

columns.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(item, e.clientY);
   
    
    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      item.prepend(dragging);
    }
  });
});

imgs.forEach((item) => {
  item.addEventListener(`dragover`, (e) =>{
    //console.log(e.target.innerText);
    console.log(e.target.id)
    const dragging = document.querySelector(`.dragging`);
    console.log(dragging.id)
    if((e.target.id == `parcial`) && (dragging.id == `parcial`) && (dragAcertou1 == false)) {
      dragging.style.backgroundColor = `#044040`
      dragging.style.color = `white`;
      pontos++;
      moons.innerText = `Moons: ${pontos}🌙`;
      dragAcertou1 = true;

    }
    if((e.target.id == `penumbral`) && (dragging.id == `penumbral`) && (dragAcertou2 == false)) {
      dragging.style.backgroundColor = `#044040`
      dragging.style.color = `white`;
      pontos++;
      moons.innerText = `Moons: ${pontos}🌙`;
      dragAcertou2 = true;
    }
    if((e.target.id == `total`) && (dragging.id == `total`) && (dragAcertou3 == false)) {
      dragging.style.backgroundColor = `#044040`
      dragging.style.color = `white`;
      pontos++;
      moons.innerText = `Moons: ${pontos}🌙`;
      dragAcertou3 = true;
    }
    
  })
})


function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}


// word search

const words = ['PENUMBRA', 'ECLIPSE', 'ANULAR', 'SOLAR', 'LUA'];
const gridSize = 10;
let selectedLetters = [];

const wordSearchGame = document.getElementById('word-search-game');
const wordsContainer = document.createElement('div');
wordsContainer.classList.add('word');
wordSearchGame.appendChild(wordsContainer);

let wordGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

function generateWordGrid() {
    words.forEach(word => {
        let direction, row, col;
        do {
            direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            row = Math.floor(Math.random() * gridSize);
            col = Math.floor(Math.random() * gridSize);
        } while (!isWordPlaceable(word, direction, row, col));

        placeWord(word, direction, row, col);
    });

    fillEmptyCells();
    renderGrid();
}

function isWordPlaceable(word, direction, row, col) {
    if (direction === 'horizontal' && col + word.length <= gridSize) {
        for (let i = 0; i < word.length; i++) {
            if (wordGrid[row][col + i] !== '') {
                return false;
            }
        }
        return true;
    } else if (direction === 'vertical' && row + word.length <= gridSize) {
        for (let i = 0; i < word.length; i++) {
            if (wordGrid[row + i][col] !== '') {
                return false;
            }
        }
        return true;
    }
    return false;
}

function placeWord(word, direction, row, col) {
    if (direction === 'horizontal') {
        for (let i = 0; i < word.length; i++) {
            wordGrid[row][col + i] = word[i];
        }
    } else if (direction === 'vertical') {
        for (let i = 0; i < word.length; i++) {
            wordGrid[row + i][col] = word[i];
        }
    }
}

function fillEmptyCells() {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (wordGrid[row][col] === '') {
                const randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
                const randomLetter = uppercaseLetters[randomIndex];
                wordGrid[row][col] = randomLetter;
            }
        }
    }
}

function findSelectedWord(row, col) {
    const selectedLetter = wordGrid[row][col];
    const isSelected = selectedLetters.some(cell => cell.row === row && cell.col === col);

    if (!isSelected) {
        selectedLetters.push({ row, col });
    } else {
        selectedLetters = selectedLetters.filter(cell => !(cell.row === row && cell.col === col));
    }

    const selectedWord = selectedLetters.map(cell => wordGrid[cell.row][cell.col]).join('');
    if (words.includes(selectedWord)) {
        return selectedWord;
    }

    return null;
}

function renderGrid() {
    wordSearchGame.innerHTML = '';
    wordGrid.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerText = letter;
            wordSearchGame.appendChild(cell);

            cell.addEventListener('click', () => {
                const selectedWord = findSelectedWord(rowIndex, colIndex);
                if (selectedWord) {
                    highlightWord(selectedWord);
                    selectedLetters = [];
                }
            });
        });
    });

    words.forEach(word => {
        const wordElement = document.createElement('span');
        wordElement.innerText = word;
        wordsContainer.appendChild(wordElement);
    });
}

function highlightWord(word) {
    const wordElements = wordsContainer.getElementsByTagName('span');
    for (const wordElement of wordElements) {
        if (wordElement.innerText === word) {
            wordElement.classList.add('found');
        }
    }

    selectedLetters.forEach(cell => {
        const index = cell.row * gridSize + cell.col;
        const cellElement = document.querySelector('.cell:nth-child(' + (index + 1) + ')');
        cellElement.classList.add('selected');
    });
}

generateWordGrid();