const density = "Ñ@#W$9876543210?!abc;:+=,._        ";

// ;
// "     _.,=+:;cba!?0123456789$W#@Ñ";

let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(100, 48);
  asciiDiv = createDiv();
}

// image(sample, 0, 0, width, height);
function draw() {
  video.loadPixels();
  let asciiImage = "";

  // every pixel: R G B A, each pixel is 4
  // alpha value = transparency, which we don't care about

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      // 4 = each pixel RGBA
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3; // Grey scale
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0)); // match the brightness to the density string
      const character = density.charAt(charIndex);
      // we want to have space
      if (character === " ") {
        asciiImage += "&nbsp;";
      } else asciiImage += character;
    }
    asciiImage += "<br/>";
  }
  asciiDiv.html(asciiImage);
}
