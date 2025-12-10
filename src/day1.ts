import * as fs from "fs";
import * as path from "path";

const dataPath = path.join(__dirname, "data/day1.txt");
const data = fs.readFileSync(dataPath, "utf-8").split("\n").filter(line => line.trim() !== "");

let zeroes = 0;
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

let day2position = 50;
let day2zeroes = 0;

for (const line of data) {
    let lineZeroes = 0;
    const direction = line[0];
    const amount = parseInt(line.slice(1), 10);

    if (amount >= 100) {
        lineZeroes += Math.floor(amount / 100);
    }

    const amountToShift = amount % 100;

    if (direction === "R") {
        day2position += amountToShift;
    } else if (direction === "L") {
        day2position -= amountToShift;
    }

    if (day2position % 100 === 0) {
        lineZeroes++;
    }

    if (day2position < 0) {
        day2position += 100;
    } else if (day2position >= 100) {
        day2position -= 100;
    }

    day2zeroes += lineZeroes;
}

console.log({day2zeroes});