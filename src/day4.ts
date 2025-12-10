import * as fs from "fs";
import * as path from "path";

const dataPath = path.join(__dirname, "data/day4.txt");
const data = fs.readFileSync(dataPath, "utf-8").split("\n").filter(line => line.trim() !== "").map(line => line.split(''));

console.log(data);

let movable = 0;
for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
        const current = data[row][col];
        if (current !== '@') {
            continue;
        }

        if (numberOfAdjacent(data, row, col) < 4) {
            movable++;
        }
    }
}

function numberOfAdjacent(grid: string[][], row: number, col: number): number {
    let count = 0;
    const directions = [
        [-1, 0], // up
        [-1, -1], // up-left
        [-1, 1],  // up-right
        [1, -1],  // down-left
        [1, 1],   // down-right
        [1, 0],  // down
        [0, -1], // left
        [0, 1],  // right
    ];
    for (const [dRow, dCol] of directions) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[newRow].length) {
            if (grid[newRow][newCol] === '@') {
                count++;
            }
        }
    }
    return count;
}

console.log({movable});

let totalMovable = 0;
let thisRoundMovable = Infinity;
while (thisRoundMovable > 0) {
    thisRoundMovable = 0;
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            const current = data[row][col];
            if (current !== '@') {
                continue;
            }

            if (numberOfAdjacent(data, row, col) < 4) {
                thisRoundMovable++;
                data[row][col] = '.';
            }
        }
    }
    totalMovable += thisRoundMovable;
}

console.log({totalMovable});