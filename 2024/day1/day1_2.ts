import { readFileSync } from 'fs';

type similarity = {
    numberToCompare: number;
    timesItAppears: number;
    rate: number;
}

const inputPath: string = __dirname + '/input.txt';
const readAndSplitFile = (path: string) => {

    const input = readFileSync (path, 'utf-8');
    const rows = input.split('\n');

    rows.forEach((row) => {
        const splittedRow = row.split('   ');
        let aux: number;
        aux = parseInt(splittedRow[0]);
        groupOne.push(aux);
        aux = parseInt(splittedRow[1]);
        groupTwo.push(aux);
    });
}

console.time('executionTime');

const groupOne: number[] = [];
const groupTwo: number[] = [];
const similarities: similarity[] = [];

readAndSplitFile(inputPath);

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