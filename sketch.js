// This p5.js sketch creates a static poster-like composition
// with an interactive element for the halo, reflecting the original image's mood.

let primaryBgColor; // The light beige/off-white background color
let darkColor;      // The deep black/dark gray for text and blocks
let accentColor1;   // Start color for the gradient bar (brown-orange)
let accentColor2;   // End color for the gradient bar (teal-green)

function setup() {
  // Create the canvas with an aspect ratio similar to the original image
  createCanvas(600, 900);
  
  // Define the color palette
  primaryBgColor = color(240, 230, 210); // Light beige/off-white
  darkColor = color(20, 20, 20);         // Near black
  accentColor1 = color(100, 70, 40);     // Dark brown-orange for gradient start
  accentColor2 = color(40, 90, 80);      // Desaturated teal-green for gradient end
  
  // Set default rectangle drawing mode to CORNER (top-left is origin)
  rectMode(CORNER);
  // Set default text alignment to LEFT
  textAlign(LEFT, TOP); 
  // Initialize noise detail for better control over noise texture
  noiseDetail(8, 0.6); 
}

function draw() {
  background(primaryBgColor); // Set the background color
  noStroke(); // Disable drawing outlines by default

  // --- TOP SECTION ELEMENTS ---

  // Top Bar Texts
  fill(darkColor);
  textSize(10);
  text("MATERIAL NUMMER", 50, 40);
  textAlign(CENTER, TOP); // Center align for the dots
  text("...", width / 2, 40);
  textAlign(RIGHT, TOP);  // Right align for the code
  text("409624 YA02", width - 50, 40);
  textAlign(LEFT, TOP); // Reset text alignment for subsequent elements

  // Small Top Image Blocks (abstract representations as per constraints)
  
  // Block for "Two Faces"
  fill(darkColor);
  rect(50, 70, 70, 50);
  fill(primaryBgColor); // Use background color for abstract shapes inside
  ellipse(65, 95, 10, 15); // Left "face"
  ellipse(95, 95, 10, 15); // Right "face"
  arc(80, 105, 30, 20, 0, PI, CHORD); // Simple arc for bodies/connection

  // Block for "Cloudy Abstract"
  fill(darkColor);
  rect(300, 70, 80, 50);
  // Add subtle, shifting "cloud" shapes using noise
  for (let i = 0; i < 5; i++) {
    let x = 300 + noise(frameCount * 0.01 + i * 10) * 80;
    let y = 70 + noise(frameCount * 0.01 + i * 20) * 50;
    let s = noise(frameCount * 0.01 + i * 30) * 15 + 5;
    fill(primaryBgColor, 70); // Semi-transparent for cloud effect
    ellipse(x, y, s, s);
  }

  // Block for "People working at desk"
  fill(darkColor);
  rect(400, 70, 150, 50);
  fill(primaryBgColor);
  rect(410, 100, 25, 15); // Desk 1
  ellipse(420, 95, 10, 10); // Person 1 head
  rect(440, 95, 25, 15); // Desk 2
  ellipse(450, 90, 10, 10); // Person 2 head
  rect(470, 100, 25, 15); // Desk 3 (simplified)


  // --- MIDDLE SECTION ELEMENTS ---

  // Gradient Bar
  let gradX = 50;
  let gradY = 190;
  let gradW = 250;
  let gradH = 30;
  for (let i = 0; i < gradW; i++) {
    let inter = map(i, 0, gradW, 0, 1); // Interpolation factor
    let c = lerpColor(accentColor1, accentColor2, inter); // Lerp between colors
    stroke(c);
    line(gradX + i, gradY, gradX + i, gradY + gradH); // Draw vertical line for each pixel of gradient
  }
  noStroke(); // Disable stroke after drawing gradient

  // Boxed Text ("ALLT SOM DET VAR...")
  fill(darkColor);
  textSize(10);
  textLeading(12); // Set line height for multi-line text
  let boxedText = "Γ ALLT SO M DE ┐\n  OM DET V A R   \n└ SKUL L E AN N  ┘";
  // Text is drawn within a bounding box, aligned left
  text(boxedText, 350, 195, 200, 100);

  // Large Textured Rectangle (using Perlin noise for subtle visual texture)
  let noiseRectX = 50;
  let noiseRectY = 270;
  let noiseRectW = 500;
  let noiseRectH = 120;
  fill(darkColor);
  rect(noiseRectX, noiseRectY, noiseRectW, noiseRectH); // Base dark rectangle
  
  // Overlay subtle noise dots/grains
  for (let i = 0; i < noiseRectW; i += 3) {
    for (let j = 0; j < noiseRectH; j += 3) {
      // Use noise to get a random-like value, and map it to alpha
      // Adding frameCount creates subtle animation/movement of the texture
      let alphaVal = map(noise(i * 0.005 + frameCount * 0.001, j * 0.005 + frameCount * 0.001), 0, 1, 0, 50);
      fill(primaryBgColor, alphaVal); // Use background color with varying transparency
      rect(noiseRectX + i, noiseRectY + j, 3, 3); // Draw small rectangles
    }
  }

  // Main Text Block
  fill(darkColor);
  textSize(16);
  textLeading(20);
  let mainText = "ALLT SOM OM DET VAR\nSKULLE LÄMNA SJÖNG DET\nDET BERODDE PÅ SANNIN\nOM DET VAR EN LÖGN\nDEM";
  text(mainText, 100, 440, 400, 150);

  // Barbed Wire (procedural drawing)
  stroke(darkColor);
  strokeWeight(1);
  let wireY = 600;
  line(50, wireY, width - 50, wireY); // Main horizontal wire
  let barbSpacing = 30; // Spacing between barbs
  for (let x = 70; x < width - 70; x += barbSpacing) {
    // Draw two diagonal lines for each barb
    line(x, wireY - 5, x + 5, wireY + 5);
    line(x, wireY + 5, x + 5, wireY - 5);
  }
  noStroke(); // Reset stroke

  // Large "UTELÄMNANDE" Text
  fill(darkColor);
  textSize(50);
  textStyle(BOLD); // Make the text bold
  text("UTELÄMNANDE", 50, 660);
  textStyle(NORMAL); // Reset text style to normal

  // --- BOTTOM SECTION ELEMENTS ---

  // Small Text Block (bottom left)
  fill(darkColor);
  textSize(14);
  textLeading(18);
  let smallText = "SANT.\nDU FANNS\nTROTS ATT\nDET SAKNAR\nDET.";
  text(smallText, 50, 750);

  // Computer Setup Image Block (abstract representation)
  fill(darkColor);
  rect(50, 830, 200, 100);
  // Simple shapes inside to suggest a computer setup
  fill(primaryBgColor);
  rect(60, 850, 50, 40); // Monitor
  rect(120, 880, 80, 15); // Keyboard
  ellipse(125, 875, 10, 8); // Mouse

  // Halo Figure Image Block (main subject, also dark)
  let haloFigureX = 280;
  let haloFigureY = 740;
  let haloFigureW = 270;
  let haloFigureH = 200;
  fill(darkColor);
  rect(haloFigureX, haloFigureY, haloFigureW, haloFigureH);

  // Small grid/pattern in top right of halo figure box (abstract)
  fill(primaryBgColor, 50); // Semi-transparent dots
  for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++) {
      rect(haloFigureX + haloFigureW - 60 + i*10, haloFigureY + 10 + j*10, 8, 8);
    }
  }

  // --- INTERACTIVE HALO ELEMENT ---
  // The halo's brightness, thickness, and slight vertical position are controlled by mouseY
  let haloCenterX = haloFigureX + haloFigureW / 2;
  let haloBaseY = haloFigureY + haloFigureH / 2 - 30; // Position above the "head" in the dark block
  let haloRadius = 40; // Base radius of the halo

  // Map mouseY to control halo properties:
  // Moving mouse down (higher Y value) increases alpha (brighter) and stroke weight (thicker)
  let glowAlpha = map(mouseY, 0, height, 50, 255);   // Transparency of the halo
  let glowWeight = map(mouseY, 0, height, 1, 8);    // Thickness of the halo line
  let haloOffsetY = map(mouseY, 0, height, -20, 20); // Slight vertical offset based on mouse

  stroke(255, 200, 0, glowAlpha); // Golden-yellow color for halo with dynamic alpha
  strokeWeight(glowWeight);      // Dynamic stroke weight
  noFill();                      // Halo is an outline
  // Draw an ellipse for the halo, slightly elliptical as in the reference image
  ellipse(haloCenterX, haloBaseY + haloOffsetY, haloRadius * 2, haloRadius * 1.2); 
  noStroke(); // Reset stroke for other elements

  // --- BOTTOM BAR ELEMENTS ---

  // Bottom left text "A O V X"
  fill(darkColor);
  textSize(10);
  text("A O V X", 50, height - 30); 

  // "VARNING" Button (rounded rectangle)
  let warningButtonX = width - 120;
  let warningButtonY = height - 45;
  let warningButtonW = 70;
  let warningButtonH = 25;
  fill(darkColor);
  rect(warningButtonX, warningButtonY, warningButtonW, warningButtonH, 5); // Rounded corners
  fill(primaryBgColor);
  textAlign(CENTER, CENTER); // Center text within the button
  text("VARNING", warningButtonX + warningButtonW / 2, warningButtonY + warningButtonH / 2);
}
