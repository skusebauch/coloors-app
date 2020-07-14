// Global selections and variables
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelectorAll(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");

// Functions

// generate color
function generateHex() {
  // using chroma-js
  const hexColor = chroma.random();
  return hexColor;
  // if we would make it manually
  //const letters = "0123456789ABCDEF";
  //let hash = "#";
  //for (let i = 0; i < 6; i++) {
  //  hash += letters[Math.floor(Math.random() * 16)];
  //}
  //return hash;
}

// generate dynamic h2 and background color to picked color
function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    checkTextContrast(randomColor, hexText);
  });
}

// check the contras and decide whether font color white/ black
function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

randomColors();
