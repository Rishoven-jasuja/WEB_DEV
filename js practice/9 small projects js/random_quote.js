const quotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Dream big and dare to fail.",
  "Believe you can and you're halfway there.",
  "Your time is limited, so don’t waste it living someone else’s life.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Success doesn’t come to you, you go to it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Little things make big days.",
  "It always seems impossible until it’s done.",
  "Start where you are. Use what you have. Do what you can.",
  "Failure is the opportunity to begin again more intelligently.",
  "Work hard in silence, let success make the noise.",
  "Discipline is the bridge between goals and accomplishment.",
  "Consistency is what transforms average into excellence.",
  "Your future is created by what you do today, not tomorrow."
];

const btn=document.getElementById("btn");
const quote=document.querySelector("h1");
btn.addEventListener("click",()=>{
    const randomquote=quotes[Math.floor(Math.random()*20)];
    quote.textContent=randomquote;
})
