
let questionBlock = document.createElement('div');
let machResult = document.createElement('div');
let alphabet = document.createElement('div');
let questionBlockContainer=document.createElement('div');
let question = 'Yerevan'.toLocaleUpperCase();
let count = question.length;
let alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
let gameEnded = false;
let possibilityCount = 0;

const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

questionBlock.className = 'question__container';
document.body.appendChild(questionBlockContainer);
questionBlockContainer.className='question__block__container';
questionBlockContainer.appendChild(questionBlock);
machResult.classList='machResult';


for (let i = 0; i < question.length; i++) {
    let questionLetterBlock = document.createElement('div');
    questionLetterBlock.className = 'question__container__item';
    questionBlock.appendChild(questionLetterBlock);
    questionLetterBlock.innerHTML = "*";
}

alphabet.className = 'alphabet__container';
document.body.appendChild(alphabet);

for (let i = 0; i < alphabetArray.length; i++) {
    let alphabetBlock = document.createElement('div');
    alphabetBlock.className = 'alphabet__container__item';
    alphabet.appendChild(alphabetBlock);
    alphabetBlock.innerHTML = alphabetArray[i];
}

let alphabetLetterBlocks = document.querySelectorAll(".alphabet__container__item");
let questionLetterBlocks = document.querySelectorAll(".question__container__item");
alphabetLetterBlocks.forEach(element => { element.addEventListener("click", alphabetLetterBlocksClick) });

function alphabetLetterBlocksClick(event) {
    let ellement = event.target.innerHTML;

    if (question.includes(ellement)) {
        let firstIndex = question.indexOf(ellement);
        let lastIndex = question.lastIndexOf(ellement);

        if (firstIndex === lastIndex) {
            questionLetterBlocks[firstIndex].innerHTML = ellement;
            count--;
        }
        else {
            let indexesՕfSameLetters = indexOfAll(Array.from(question), ellement);
            for (let i = 0; i < indexesՕfSameLetters.length; i++) {
                let ell = indexesՕfSameLetters[i]
                questionLetterBlocks[ell].innerHTML = ellement;
            }
            count = count - indexesՕfSameLetters.length;
        }

        event.currentTarget.removeEventListener("click", alphabetLetterBlocksClick);
        event.target.classList.add('disabledCorrectLetter');
    }
    else {
        possibilityCount++;
        event.currentTarget.removeEventListener("click", alphabetLetterBlocksClick);
        event.target.classList.add('disabledIncorrectLetter');
    }

    if (count === 0) {
        machResult.innerHTML = 'YOU WON';
        document.body.appendChild(machResult);
        gameEnded = true;
    }

    if (possibilityCount >= 5) {
        possibilityCount = 0;
        machResult.innerHTML = 'GAME over!!! you lost';
        document.body.appendChild(machResult);
        gameEnded = true;
    }

    if (gameEnded) {
        for (let i = 0; i < alphabetLetterBlocks.length; i++) {
            alphabetLetterBlocks[i].removeEventListener("click", alphabetLetterBlocksClick);
        }
    }
}

