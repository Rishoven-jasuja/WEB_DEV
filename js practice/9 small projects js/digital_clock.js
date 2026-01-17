const parent = document.getElementById("parent");

function updateClock() {
  const now = new Date();
  parent.textContent = now.toLocaleTimeString();
}

// run immediately
updateClock();

// update every 1 second
setInterval(updateClock, 1000);
