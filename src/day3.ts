import * as fs from "fs";
import * as path from "path";

const dataPath = path.join(__dirname, "data/day3.txt");
const data = fs.readFileSync(dataPath, "utf-8").split("\n").filter(line => line.trim() !== "");

let total = 0;

for (const line of data) {
    const values = line.split('').map(num => parseInt(num, 10));
    const firstDigit = Math.max(...values.slice(0, -1));
    // Find the position of the firstDigit in the array
    const position = values.indexOf(firstDigit);
    // Find the largest number after the firstDigit
    const largestAfter = Math.max(...values.slice(position + 1));
    total += (10 * firstDigit) + largestAfter;
}

console.log({total})

let bigTotal = 0;
for (const line of data) {
    const values = line.split('').map(num => parseInt(num, 10));
    let largestNumber = 0;
    let largestNumberIndex = 0;
    for (let i = 0; i < 12; i++) {
        const largest = findLargestInRange(values, largestNumberIndex, values.length - (12 - i));
        largestNumberIndex = values.indexOf(largest, largestNumberIndex) + 1;
        largestNumber += largest * Math.pow(10, 11 - i);
    }
    bigTotal += largestNumber;
}

console.log({bigTotal});

// find the largest number in the array given between the two indices
function findLargestInRange(values: number[], start: number, end: number): number {
    return Math.max(...values.slice(start, end + 1));
}