const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFolder = '../../../../../assets/imagens/nova'; // Path to the folder with your images
const outputFolder = '../../../../../assets/imagens/teste'; // Path to save trimmed images

// Ensure the output folder exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Function to trim and save images
async function processImages() {
  try {
    // Read all files in the input folder
    const files = fs.readdirSync(outputFolder);

    // Filter PNG files
    const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

    for (const file of pngFiles) {
      const inputFilePath = path.join(outputFolder, file);
      const outputFilePath = path.join(inputFolder, file);

      console.log(`Processing ${file}...`);

      // Load and process the image
      await sharp(inputFilePath)
        .trim() // Trims the edges with similar colors (like white space)
        .toFile(outputFilePath);

      console.log(`${file} trimmed and saved to ${outputFilePath}`);
    }

    console.log('All images processed successfully.');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the function
processImages();
