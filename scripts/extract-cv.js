const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const filePath = path.join(__dirname, '..', 'CV_file', 'Nathan Luis Alvares - MSc AI - Available September 2025 CV.pdf');

if (!fs.existsSync(filePath)) {
  console.error('PDF not found at', filePath);
  process.exit(2);
}

const dataBuffer = fs.readFileSync(filePath);

pdf(dataBuffer).then(function(data) {
  // data.text is the extracted text
  console.log(data.text);
}).catch(err => {
  console.error('Error parsing PDF:', err);
  process.exit(1);
});
