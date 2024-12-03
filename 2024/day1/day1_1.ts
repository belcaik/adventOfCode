import { readFileSync } from 'fs';

console.time('executionTime');

const inputPath: string = __dirname + '/input.txt';
const input = readFileSync(inputPath, 'utf-8');
const groupOne: number[] = [];
const groupTwo: number[] = [];
const differences: number[] = [];
const rows = input.split('\n');
const rowsLength = rows.length;

rows.forEach((row) => {
    const splittedRow = row.split('   ');
    let aux: number;
    aux = parseInt(splittedRow[0]);
    groupOne.push(aux);
    aux = parseInt(splittedRow[1]);
    groupTwo.push(aux);
});

groupOne.sort((a: number, b: number) => a - b);
groupTwo.sort((a: number, b: number) => a - b);

for (let i = 0; i < rowsLength; i++) {
    let absDiff = Math.abs(groupOne[i] - groupTwo[i]);
    differences.push(absDiff);
}

const sum = differences.reduce((a, b) => a + b, 0);

console.log(`La suma de las diferencias es ${sum}`);
console.timeEnd('executionTime');