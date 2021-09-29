const startGameContainer = document.querySelector('.start__game__container');
const machResult = document.createElement('div');
const tryAgain = document.createElement('div');
const startGameAgainButton = document.createElement('button');
const startButton = document.querySelector('.start__button');
const container = document.getElementById('absolute-container');
const questionSection = document.getElementById('question');
let chance = 5;
let rightAnswerCount = 0;
let answer;

machResult.className = 'machResult';
tryAgain.classList="tryAgain";
tryAgain.innerHTML='Try Again';

fetch('http://localhost:3000/questions')
  .then(response => response.json())
  .then(questions => {
    const indexOfQuestion = Math.floor(Math.random() * questions.length);
    answer = questions[indexOfQuestion].answer.toUpperCase();
    questionSection.innerText = questions[indexOfQuestion].question;
    createAnswerSection();
  })
  .catch((error)=>{
      document.body.innerHTML = `<h1 style='color: red'>Somethins is wrong !!!</h1>`
  })

function createAlphabet() {
    const alphabet = document.createElement('div');
    for (let i = 65; i <= 90; i++) {
        const alphabetBlock = document.createElement('div');
        alphabetBlock.className = 'alphabet__container__item';
        alphabetBlock.innerHTML = String.fromCharCode(i);
        alphabet.appendChild(alphabetBlock);
    }
    alphabet.className = 'alphabet__container';
    startGameContainer.appendChild(alphabet);
}

function createAnswerSection() {
    const answerBlockContainer = document.createElement('div');
    const answerBlock = document.createElement('div');
    answerBlock.className = 'answer__container';
    answerBlockContainer.className = 'answer__block__container';
    answerBlockContainer.appendChild(answerBlock);
    for (let i = 0; i < answer.length; i++) {
        let answerLetterBlock = document.createElement('div');
        answerLetterBlock.className = 'answer__container__item';
        answerLetterBlock.innerHTML = "*";
        answerBlock.appendChild(answerLetterBlock);
    }
    startGameContainer.appendChild(answerBlockContainer);
}

function startGame() {
    const startPageContainer = document.querySelector('.start__page__container');
    startPageContainer.classList = 'startPageStyleAfterStart';
    startGameContainer.classList = "startGameStyleAfterStart";
    createAlphabet();
    let alphabetLetterBlocks = document.querySelectorAll(".alphabet__container__item");
    alphabetLetterBlocks.forEach(element => { element.addEventListener("click", alphabetLetterBlocksClick) });
}

function alphabetLetterBlocksClick(event) {
    const answerLetterBlocks = document.querySelectorAll(".answer__container__item");
    const selectedSymbool = event.target.innerHTML;
    let thereIs = false;
    event.currentTarget.removeEventListener("click", alphabetLetterBlocksClick);

    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === selectedSymbool) {
            thereIs = true;
            answerLetterBlocks[i].innerHTML = selectedSymbool;
            rightAnswerCount++;
            event.target.classList.add('disabledCorrectLetter');
        }
    }
    if (!thereIs) {
        chance--;
        event.target.classList.add('disabledIncorrectLetter');
    }
    if (chance === 0) {
        machResult.innerHTML = 'GAME over!!! you lost';
        machResult.classList.add('lostResultStyle');
        checkLoseOrWin();
    }
    if (rightAnswerCount === answer.length) {
        machResult.innerHTML = ' you won!!';
        machResult.classList.add('wonResultStyle');
        checkLoseOrWin();
    }
}

function checkLoseOrWin() {
    startGameContainer.style.opacity = 0.3;
    container.appendChild(machResult);
    container.appendChild(tryAgain);
    const confetti = new ConfettiGenerator(confettyFactory(!!chance));
    confetti.render();
    disabledAlphabetAllLetters();
}

function disabledAlphabetAllLetters() {
    const alphabetLetterBlocks = document.querySelectorAll(".alphabet__container__item");
    for (let i = 0; i < alphabetLetterBlocks.length; i++) {
        alphabetLetterBlocks[i].removeEventListener("click", alphabetLetterBlocksClick);
    }
}

function startAgain() {
    window.location.reload(true); 
}

function confettyFactory(state) {
    const props = {
        target: 'my-canvas',
        max: 10,
        size: 12,
    };
    if (state) {
        return {
            ...props,
            props: [
                "circle",
                "square",
                { "type": "svg", "src": "img/1.jpg" },
            ]
        };
    } else {
        return {
            ...props,
            props: [
                { "type": "svg", "src": "img/2.jpg" }
            ]
        };
    }

}

startButton.addEventListener('click', startGame);
tryAgain.addEventListener('click',startAgain );