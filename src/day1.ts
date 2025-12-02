import * as fs from "fs";
import * as path from "path";

const dataPath = path.join(__dirname, "data/day1.txt");
const data = fs.readFileSync(dataPath, "utf-8").split("\n").filter(line => line.trim() !== "");

let zeroes = 0;
let extraZeroes = 0;
let start = 50;

for (const line of data) {
    const direction = line[0];
    const amount = parseInt(line.slice(1), 10);

    if (direction === "R") {
        start += amount;
    } else if (direction === "L") {
        start -= amount;
    }

    if (start % 100 === 0) {
        zeroes++;
    }
}

console.log({zeroes});