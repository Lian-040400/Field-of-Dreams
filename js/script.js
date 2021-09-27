const startGameContainer = document.querySelector('.start__game__container');


const machResult = document.createElement('div');
const startGameAgainButton=document.createElement('button');
const startButton = document.querySelector('.start__button');
const container = document.getElementById('absolute-container');
const answer = 'Yerevan'.toUpperCase();
let count = 5;
const gameEnded = false;
const possibilityCount = 0;


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
    answerBlockContainer.className='answer__block__container';
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
    startPageContainer.classList='startPageStyleAfterStart';
    startGameContainer.classList="startGameStyleAfterStart";
    createAnswerSection()
    createAlphabet();
    
    let alphabetLetterBlocks = document.querySelectorAll(".alphabet__container__item");
    alphabetLetterBlocks.forEach(element => { element.addEventListener("click", alphabetLetterBlocksClick) });
}

startButton.addEventListener('click', startGame);



function alphabetLetterBlocksClick(event) {
    let selectedSymbool = event.target.innerHTML;
    let thereIs=false;
    const answerLetterBlocks = document.querySelectorAll(".answer__container__item");
    for(let i = 0; i < answer.length; i++) {
        if(answer[i] === selectedSymbool) {
            thereIs=true;
            answerLetterBlocks[i].innerHTML = selectedSymbool;
             
        }
       
    }
    if(thereIs){
        event.target.classList.add('disabledCorrectLetter'); 
    }
    else{
      
        count--;
         event.target.classList.add('disabledIncorrectLetter');
    }
    if(count===0){
        machResult.innerHTML = 'GAME over!!! you lost';
        machResult.classList.add('lostResultStyle');
        startGameContainer.style.opacity = 0.3;
        container.appendChild(machResult);
        const confetti = new ConfettiGenerator(confettyFactory(false));
        confetti.render();
    }
       

    // const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
    // if (answer.includes(ellement)) {
    //     let firstIndex = answer.indexOf(ellement);
    //     let lastIndex = answer.lastIndexOf(ellement);

    //     if (firstIndex === lastIndex) {
    //         answerLetterBlocks[firstIndex].innerHTML = ellement;
    //         count--;
    //     }
    //     else {
    //         let indexesՕfSameLetters = indexOfAll(Array.from(answer), ellement);
    //         for (let i = 0; i < indexesՕfSameLetters.length; i++) {
    //             let ell = indexesՕfSameLetters[i]
    //             answerLetterBlocks[ell].innerHTML = ellement;
    //         }
    //         count = count - indexesՕfSameLetters.length;
    //     }

    //     event.currentTarget.removeEventListener("click", alphabetLetterBlocksClick);
    //     event.target.classList.add('disabledCorrectLetter');
    // }
    // else {
    //     possibilityCount++;
    //     event.currentTarget.removeEventListener("click", alphabetLetterBlocksClick);
    //     event.target.classList.add('disabledIncorrectLetter');
    // }

    // if (count === 0) {
    //   
    // }

    // if (possibilityCount >= 5) {
    //     possibilityCount = 0;
    //     machResult.innerHTML = 'GAME over!!! you lost';
    //     machResult.classList.add('lostResultStyle');
    //     startGameContainer.style.opacity = 0.3;
    //     container.appendChild(machResult);
    //     const confetti = new ConfettiGenerator(confettyFactory(false));
    //     confetti.render();
    //     gameEnded = true;
    // }

    // if (gameEnded) {
    //     for (let i = 0; i < alphabetLetterBlocks.length; i++) {
    //         alphabetLetterBlocks[i].removeEventListener("click", alphabetLetterBlocksClick);
    //     }
    // }
    
}


function confettyFactory(state) {
    const props = {
        target: 'my-canvas',
        max: 10,
        size: 12,
     };
    if(state) {
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
