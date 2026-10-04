let text = document.getElementById("cText");
let points = document.getElementById("points");
let rect = document.getElementById("cRect");
let badges = document.getElementById("badges");

const threeinrow = /(.)\1{2}/;

function generateRandomHexCode() {
  const digits = '0123456789ABCDEF';
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
    hexCode += digits[Math.floor(Math.random() * 16)];
  }
  return hexCode;
}

function generate() {
    localStorage.setItem("generated", true);
    var color = generateRandomHexCode()
    text.innerHTML = color;
    rect.style.backgroundColor = color;
    rect.animate(
        [
            {
                transform: "scale(1.08)",
            },
            {
                transform: "scale(1)",
            },
        ],
        {
            duration: 250,
            easing: "ease-out",
        }
    );
    renderBadges(text.textContent, badges, points)
}
