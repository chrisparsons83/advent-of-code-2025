import * as fs from "fs";
import * as path from "path";

const dataPath = path.join(__dirname, "data/day5.txt");
const boundaries: [number, number][] = [];
const entries: number[] = [];
fs.readFileSync(dataPath, "utf-8")
    .split("\n")
    .filter(line => line.trim() !== "").forEach(line => {
        if (line.includes("-")) {
            const [start, end] = line.split("-").map(Number);
            boundaries.push([start, end]);
        } else {
            entries.push(Number(line));
        }
    });

const result = entries.filter(
    entry => boundaries.some(([start, end]) => entry >= start && entry <= end)
).length;

console.log({result});

boundaries.sort((a, b) => a[0] - b[0]);
if (boundaries.length === 0) {
    console.log({ totalCovered: 0 });
} else {
    let [lowerBound, upperBound] = boundaries[0];
    let totalCovered = 0;
    for (let i = 1; i < boundaries.length; i++) {
        const [start, end] = boundaries[i];
        // if overlapping or contiguous ranges, merge them
        if (start <= upperBound + 1) {
            upperBound = Math.max(upperBound, end);
        } else {
            // If there's a gap, add the previous merged range's coverage
            totalCovered += upperBound - lowerBound + 1;
            lowerBound = start;
            upperBound = end;
        }
    }
    // add the final merged range
    totalCovered += upperBound - lowerBound + 1;
    console.log({ totalCovered });
}