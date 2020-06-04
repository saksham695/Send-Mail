"use-strict";

const fs = require("fs");
const fileName = process.argv[2];
const writeInFile = process.argv[3];

// if file name not provided
if (!fileName) {
  throw Error("A file to watch must be specified");
}

let readFile = fs.readFileSync(fileName).toString();
console.log(readFile);

if (writeInFile) {
  fs.appendFileSync(fileName, writeInFile);
}

// reading the file again to check , file has changed or not
let readFile = fs.readFileSync(fileName).toString();
console.log(readFile);
