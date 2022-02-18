console.log(`
Требования
1. Вёрстка +10
   реализован интерфейс игры +5
   в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10
3. Игра завершается, когда открыты все карточки +10
4. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10
5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10
6. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
   высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо - сделал свое оформление

   Итоговая оценка: 70 баллов (60 возможных). Большая просьба - не скрывайте свое имя. Вдруг возникнут вопросы, можно будет их обсудить.
   Связь со мною: телеграм @andrey1509.
   Благодарю за время, уделенное проверке моей работы. Успехов в обучении!
   
`);

const cards = document.querySelectorAll('.memory-game__card');
let moves = document.querySelector('.page__moves');
let hasFlippedCard = false;
let boardLocked = false;
let firstCard;
let secondCard;
let flippedCards = 0;

const flipCard = (event) => {
  if (boardLocked) {
    return;
  }

  const target = event.target.parentElement;

  if (target === firstCard) {
    return;
  }

  target.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = target;
  } else {
    hasFlippedCard = false;
    secondCard = target;
    checkCurrentCard();
  }
}

const checkCurrentCard = () => {
  const isEqual = (firstCard.dataset.card === secondCard.dataset.card);
  isEqual ? disableCards() : unflipCards();
}

const disableCards = () => {
  boardLocked = true;

  moves.textContent = Number(moves.textContent) + 1;
  flippedCards += 2;

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  setTimeout(() => {
    firstCard.childNodes[1].style = 'background-color: lightgreen;';
    secondCard.childNodes[1].style = 'background-color: lightgreen;';
  }, 300);

  setTimeout(() => {
    firstCard.childNodes[1].style = 'background-color: lightblue;';
    secondCard.childNodes[1].style = 'background-color: lightblue;';
    resetBoard();
  }, 1500);

  saveResult();
}

const unflipCards = () => {
  boardLocked = true;

  moves.textContent = Number(moves.textContent) + 1;

  setTimeout(() => {
    firstCard.childNodes[1].style = 'background-color: red;';
    secondCard.childNodes[1].style = 'background-color: red;';
  }, 300);

  setTimeout(() => {
    firstCard.childNodes[1].style = 'background-color: lightblue;';
    secondCard.childNodes[1].style = 'background-color: lightblue;';
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

const resetBoard = () => {
  [hasFlippedCard, boardLocked] = [false, false];
  [firstCard, secondCard] = [null, null];
}

const resetGame = () => {
  moves.textContent = 0;
  cards.forEach(card => {
    card.classList.remove('flip');
  });
  setTimeout(() => {
    startGame();
  }, 1000);
}

const saveResult = () => {
  if (flippedCards === 12) {
    let localStorageKey = Number(localStorage.getItem('localStorageKey'));
    localStorage.setItem(`game${++localStorageKey}`, moves.textContent);
    localStorage.setItem('localStorageKey', localStorageKey++);
    flippedCards = 0;
  }
}

const startGame = () => {
  cards.forEach(card => {
    card.addEventListener('click', flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
  });
}

document.querySelector('.page__reset').addEventListener('click', resetGame);

startGame();

// ====================== GAME RESULTS ==========================

const createLocalData = () => {
  const keysLocalStorage = [];
  for (let i = 0; i < localStorage.length; i++) {
    const myKey = localStorage.key(i);
    if (myKey.slice(0, 4) === 'game') {
      keysLocalStorage.push(myKey);
    }
  }
  return keysLocalStorage;
}

const createDOMElement = (array, elementDOM) => {
  for (let i = 0; i < array.length; i++) {
    let el = document.createElement('div');
    el.style = 'line-height: 25px;';
    el.textContent = `${array[i]} - ${localStorage.getItem(array[i])} moves`;
    elementDOM.appendChild(el);
  }
}

const resultsData = document.querySelector('.page__last-results');
const tableResults = document.querySelector('#table-results');

resultsData.addEventListener('click', () => {
  resultsData.classList.toggle('show');
  if (resultsData.classList.contains('show')) {
    const keysLocalStorage = createLocalData().sort((a, b) => a.slice(4) - b.slice(4));
    const keysToShow = keysLocalStorage.reverse().slice(0, 10);
    createDOMElement(keysToShow, tableResults);
  } else {
    tableResults.innerHTML = '';
  }
});

const records = document.querySelector('.page__records');
const tableRecords = document.querySelector('#table-records');

records.addEventListener('click', () => {
  records.classList.toggle('show');
  if (records.classList.contains('show')) {
    const keysLocalStorage = createLocalData();
    const objLocalData = {};

    for (let i = 0; i < keysLocalStorage.length; i++) {
      objLocalData[keysLocalStorage[i]] = localStorage.getItem(keysLocalStorage[i]);
    }

    const sortedObjLocalData = Object.keys(objLocalData).sort((a, b) => objLocalData[a] - objLocalData[b]);
    createDOMElement(sortedObjLocalData.slice(0, 10), tableRecords);
  } else {
    tableRecords.innerHTML = '';
  }
});

