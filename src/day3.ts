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