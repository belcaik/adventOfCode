console.log('================ DAY 4 ==================');
console.time("*********\nEXECUTION TIME:");

import { readFileSync } from 'fs';

const readAndTokenizeFile = (path: string): string[][] => {
    const input = readFileSync(path, 'utf-8');

    const rows = input.split('\n');

    const tokenizedRows = rows.map(char => char.split(''));
    return tokenizedRows;
}
type Direction = [number, number];

const directions: Direction[] = [
  [0, 1],   // Horizontal right
  [0, -1],  // Horizontal left
  [1, 0],   // Vertical down
  [-1, 0],  // vertical up
  [1, 1],   // diagonal down right
  [1, -1],  // diagonal down left
  [-1, 1],  // diagonal up right
  [-1, -1], // diagonal up left
];

function countOccurrences(grid: string[][], word: string): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const wordLength = word.length;
  let count = 0;

  const isValid = (x: number, y: number) => 
    x >= 0 && x < rows && y >= 0 && y < cols;

  function searchFrom(x: number, y: number, dir: Direction): boolean {
    for (let i = 0; i < wordLength; i++) {
      const nx = x + dir[0] * i;
      const ny = y + dir[1] * i;
      if (!isValid(nx, ny) || grid[nx][ny] !== word[i]) {
        return false;
      }
    }
    return true;
  }

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y] === word[0]) { // only search if first letter matches
        for (const dir of directions) {
          if (searchFrom(x, y, dir)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}
const countMasX = (grid: string[][]): number => {
  let masCount = 0;
  const rowsLength = grid.length;
  const colsLength = grid[0].length;

  const isValid = (x: number, y: number) => x >= 0 && x < rowsLength && y >= 0 && y < colsLength;

  function isXMAS(centerX: number, centerY: number): boolean {
    const positions1: [number, number, string][] = [
      [centerX - 1, centerY - 1, 'M'], // up left
      [centerX, centerY, 'A'],         // center
      [centerX + 1, centerY + 1, 'S'], // down right
      [centerX - 1, centerY + 1, 'M'], // up right
      [centerX + 1, centerY - 1, 'S'], // down left
    ];

    const positions2: [number, number, string][] = [
      [centerX - 1, centerY - 1, 'S'], // up left
      [centerX, centerY, 'A'],         // center
      [centerX + 1, centerY + 1, 'M'], // down right
      [centerX - 1, centerY + 1, 'S'], // up right
      [centerX + 1, centerY - 1, 'M'], // down left
    ];

    const positions3: [number, number, string][] = [
      [centerX - 1, centerY - 1, 'S'], // up left
      [centerX, centerY, 'A'],         // center
      [centerX + 1, centerY + 1, 'M'], // down right
      [centerX - 1, centerY + 1, 'M'], // up right
      [centerX + 1, centerY - 1, 'S'], // down left
    ];

    const positions4: [number, number, string][] = [
      [centerX - 1, centerY - 1, 'M'], // up left
      [centerX, centerY, 'A'],         // center
      [centerX + 1, centerY + 1, 'S'], // down right
      [centerX - 1, centerY + 1, 'S'], // up right
      [centerX + 1, centerY - 1, 'M'], // down left
    ];

    return positions1.every(([x, y, char]) => isValid(x, y) && grid[x][y] === char) ||
           positions2.every(([x, y, char]) => isValid(x, y) && grid[x][y] === char) ||
           positions3.every(([x, y, char]) => isValid(x, y) && grid[x][y] === char) ||
           positions4.every(([x, y, char]) => isValid(x, y) && grid[x][y] === char);
  }

  for (let x = 0; x < rowsLength; x++) {
    for (let y = 0; y < colsLength; y++) {
      if (grid[x][y] === 'A' && isXMAS(x, y)) {
        masCount++;
      }
    }
  }
  return masCount;
}

const inputPath: string = __dirname + '/input.txt'; // Update to use the correct input file

const tokenizedRows = readAndTokenizeFile(inputPath);

const xmasCount = countOccurrences(tokenizedRows, 'XMAS');

const masInX = countMasX(tokenizedRows);

console.log('===== PART 1 =====\n', 'XMAS word count: ', xmasCount);

console.log('===== PART 2 =====\n', 'MASX word count: ', masInX);

console.timeEnd("*********\nEXECUTION TIME:");
