    
     let questionBlock=document.createElement('div');
     questionBlock.className='question__container';

   document.body.appendChild(questionBlock);
   let question='Yerevanjjjjjjjjjj';
   for (let i = 0; i < question.length; i++) {
    
        let questionLetterBlock=document.createElement('div');
          questionLetterBlock.className='question__container__item';
           questionBlock.appendChild(questionLetterBlock);
           questionLetterBlock.innerHTML="*";
   }
  



    let alphabet=document.createElement('div');
    let alphabetArray='abcdefghijklmnopqrstuvwxyz';

    alphabet.className='alphabet__container';
    document.body.appendChild(alphabet);   
    let answerQuestion={
        'yerevan':'What is the capital of Armenia?',
    }
  

for (let i = 0; i < alphabetArray.length; i++) {
        let alphabetBlock=document.createElement('div');
        alphabetBlock.className='alphabet__container__item';
        alphabet.appendChild(alphabetBlock);
        alphabetBlock.innerHTML=alphabetArray[i].toLocaleUpperCase();
         
    }
    let blocks = document.querySelectorAll(".alphabet__container__item");
    let blocks2=document.querySelectorAll(".question__container__item");
    blocks.forEach(element => { element.addEventListener("click",buttonClick)});

    const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
    question=question.toLocaleUpperCase();
    let count=0;
    let r;
 function buttonClick(event) {
     console.log('5655');
count++;
if (count>5) {
    count=0;
    let massage=document.createElement('div');
    massage.innerHTML='game over';
    document.body.appendChild(massage); 
    return;
    
}
     if (question.toLocaleUpperCase().includes(event.target.innerHTML)) {
     let ka=indexOfAll(Array.from(question),event.target.innerHTML.toLocaleUpperCase());
     if(ka){
         for ( j=0;   j<ka.length; j++) {
        blocks2[ka[j]].innerHTML=event.target.innerHTML.toLocaleUpperCase();
       
        blocks2[ka[j]].removeEventListener("click",buttonClick);
console.log( blocks2[ka[j]]);
       
      
         }
      
     }
     }
    
 }