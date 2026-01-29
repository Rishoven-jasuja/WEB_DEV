const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result=document.querySelector('.result');
const sound=document.querySelector('#sound');
const btn=document.querySelector('.btn');
btn.addEventListener("click",()=>{
    let inputword=document.querySelector('.input').value;
   

   
  fetch(`${url}${inputword}`)
.then(response => response.json())
.then(data => {
    console.log(data);

    result.innerHTML = `
        <div class="word">
            <h3>${inputword}</h3>
            <button class="speaker">
                <i class="fa-solid fa-volume-low"></i>
            </button>
        </div>

        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetics[0]?.text || ""}</p>
        </div>

        <div class="meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </div>

        <div class="examples">
            ${data[0].meanings[0].definitions[0].example || ""}
        </div>
    `;

    let audioSrc = data[0].phonetics.find(p => p.audio)?.audio;
    const speaker = document.querySelector(".speaker");

    if (audioSrc) {
        sound.src = audioSrc;
        speaker.addEventListener("click", () => sound.play());
    } else {
        speaker.style.display = "none";
    }
})
.catch(() => {
    result.innerHTML = `<h3 id="error" >No Match found</h3>`;
});

        let audioSrc = data[0].phonetics.find(p => p.audio)?.audio;
const speaker=document.querySelector(".speaker");
if(audioSrc){
    sound.src = audioSrc;
    speaker.addEventListener("click",()=>{
        sound.play();
    })

}
else{
    speaker.style.display="none";
}


    });




    


