"use strict";

const search = document.querySelector("#search");
const wordInput = document.querySelector("#input-word");
const result = document.querySelector(".result");


const showResult = function(input){

    result.innerHTML = "";

    const resultHeader = `
<div class="result-header f-between">
    <span id="word" class="text-primary">${input.word.charAt(0).toUpperCase() + input.word.slice(1)}</span>
    <button id="audio-btn" class="btn-transparent">Phonetic:   <i class="fa-solid fa-play"></i></button>
</div>
`;
////////////////////////
   
    let Meaning = ``;

    input.meanings.forEach((value,i) => {
        const html = `
        <p class="meaning-header">
        <span class="meaninng-number">${i+1}.</span>
        <span class="meaninng-type">${value.partOfSpeech}</span>
        </p>

        <p>Definition: <span class="definition">${value.definitions[0].definition}</span></p>
        `
        Meaning += html;
    });

    const meaningsContainer = 
`<div class="meanings f-between-column">
    <div class="meaning">

        ${Meaning}

    </div>
</div>`

    const finalResultHtml = resultHeader + meaningsContainer;

    result.insertAdjacentHTML("beforeend",finalResultHtml);

    const audioBtn = document.querySelector("#audio-btn");

    audioBtn.addEventListener("click",function(){
        let audio = new Audio(`${input.phonetics[0].audio}`);
        audio.play();
    })

}

search.addEventListener("click",async function(e){
    e.preventDefault();

    const input = wordInput.value.toLowerCase();

    try{
        const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)

        if(!result.ok) throw new Error("bi gariplik var");

        const data = await result.json();
               
        const word = data[0];
        
        showResult(word);

    }
    catch(err){
        //displaying error
        result.innerHTML = 
        `<div class="error-showcase f-center">
            <p class="error-message text-danger">Word can not found, try again </p>
        </div>`
    }

});


