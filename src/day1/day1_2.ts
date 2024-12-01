import { readFileSync } from 'fs';

console.time('executionTime');

type similarity = {
    numberToCompare: number;
    timesItAppears: number;
    rate: number;
}

const inputPath: string = __dirname + '/input.txt';
const input = readFileSync(inputPath, 'utf-8');
const groupOne: number[] = [];
const groupTwo: number[] = [];
const rows = input.split('\n');
const rowsLength = rows.length;
const similarities: similarity[] = [];

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


groupOne.forEach((num: number) => {
    let timesItAppears = 0;

    groupTwo.forEach((num2: number) => {
        if (num === num2) {
            timesItAppears++;
        }
    });

    let match: similarity = {
        numberToCompare: num,
        timesItAppears: timesItAppears,
        rate: num * timesItAppears
    }

    similarities.push(match);

});

let endScore: number = 0;
similarities.forEach((similarity: similarity) => {

    endScore += similarity.rate;
});


console.log(`========= the end score is:`, endScore, '========='
);

console.timeEnd('executionTime');