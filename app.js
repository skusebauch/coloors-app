// Global selections and variables
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelectorAll(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");

//EventListeners

sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

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
    // add color to bg and h2
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    // check for contrast
    checkTextContrast(randomColor, hexText);
    // init colorize sliders
    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSliders(color, hue, brightness, saturation);
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

//// add slider color dynamically to the color
function colorizeSliders(color, hue, brightness, saturation) {
  // scale saturation
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);

  // scale brightness
  const midBright = color.set("hsl.l", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  // Update input colors
  saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(
    0
  )},${scaleSat(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(
    0
  )}, ${midBright}, ${scaleBright(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75), rgb(204,204,75), rgb(75,204,75), rgb(75,204,204), rgb(75,75,204), rgb(204,75,204), rgb(204,75,75))`;
}

function hslControls(event) {
  const index =
    event.target.getAttribute("data-hue") ||
    event.target.getAttribute("data-bright") ||
    event.target.getAttribute("data-sat");

  let slidersCurrentDiv = event.target.parentElement.querySelectorAll(
    'input[type="range"]'
  );
  const hue = slidersCurrentDiv[0];
  const brightness = slidersCurrentDiv[1];
  const saturation = slidersCurrentDiv[2];

  const bgColor = colorDivs[index].querySelector("h2").innerText;

  let color = chroma(bgColor)
    .set("hsl.h", hue.value)
    .set("hsl.l", brightness.value)
    .set("hsl.s", saturation.value);

  colorDivs[index].style.backgroundColor = color;
}

randomColors();
