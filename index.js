const fs = require('fs');
//!block code in synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about avocodo:\n ${textIn}.\nCreated on${Date.now()}`
fs.writeFileSync('./txt/output.txt',textOut);
console.log('File written');