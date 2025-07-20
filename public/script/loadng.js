let progress = 0;
const bar = document.getElementById("progress-bar");
const percentText = document.getElementById("percent");

setTimeout(() => {
  const interval = setInterval(() => {
    progress++;
    bar.style.width = progress + "%";
    percentText.textContent = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      window.location.href = "list.html";
    }
  }, 50);
}, 3000); 
