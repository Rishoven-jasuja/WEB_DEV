function computerplay(){
    const choices=["👊 Rock","🤚 Paper","✌️Scissor"];
    const randomchoice=Math.floor(Math.random()*choices.length);
    return choices[randomchoice];

}

function resetChoiceBox(box) {
  box.classList.remove("rock", "paper", "scissor");
}



const parent=document.getElementById('parent');
const result=document.getElementById('result');
const score=document.getElementById('score');
let compscore=0;
let userscore=0;


const userChoiceBox = document.getElementById('user-choice');
const computerChoiceBox = document.getElementById('computer-choice');



parent.addEventListener('click',(e)=>{

  if(e.target.tagName=="DIV"){

  
    let userans=e.target.textContent;
    let compans=computerplay();
    console.log(userans,compans);
    userChoiceBox.textContent = userans;
computerChoiceBox.textContent = compans;

    if(userans===compans){
        result.textContent="result : Game tied";
        score.textContent=`overall score: user: ${userscore} and computer: ${compscore} `;
    }
    else if (
  (userans == "👊 Rock" && compans == "✌️ Scissor") ||
  (userans == "🤚 Paper" && compans == "👊 Rock") ||
  (userans == "✌️ Scissor" && compans == "🤚 Paper")
) { userscore++;
  result.textContent = `Result: You win! ${userans} beats ${compans}`;
  score.textContent=`overall score: user: ${userscore} and computer: ${compscore} `;
}

else{
    compscore++;
    result.textContent = ` Result: computer win! ${compans} beats ${userans}`;
    score.textContent=`overall score: user: ${userscore} and computer: ${compscore} `;
}


// ans display
resetChoiceBox(userChoiceBox);
resetChoiceBox(computerChoiceBox);

userChoiceBox.textContent = userans;
computerChoiceBox.textContent = compans;

if (userans.includes("Rock")) {
  userChoiceBox.classList.add("rock");
} else if (userans.includes("Paper")) {
  userChoiceBox.classList.add("paper");
} else {
  userChoiceBox.classList.add("scissor");
}

if (compans.includes("Rock")) {
  computerChoiceBox.classList.add("rock");
} else if (compans.includes("Paper")) {
  computerChoiceBox.classList.add("paper");
} else {
  computerChoiceBox.classList.add("scissor");
}

  }
})

