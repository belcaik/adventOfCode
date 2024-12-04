console.log("=== Day 3 ===");
console.time("=== Execution Time ===");

import { readFileSync } from "fs";

const inputPath: string = `${__dirname}/input.txt`;

const challengeInput: string = readFileSync(inputPath, "utf8");

const cleanDontStatements = (input: string): string => {

    const dontRoutines = /(don't\(\))(.*?\s*?\S*?)*?(do\(\))/gim;

    const newTest = input.replace(dontRoutines, "");

    return newTest;
};



const getMulFromText = (mulText: string): string[] => {

    let mulTexts: string[] = [];

    const mulRegex = /mul\(\d+,\d+\)/g;
    const matches = mulText.match(mulRegex);

    if (matches) {
        matches.forEach((match: string) => {
            mulTexts.push(match);
        });
    }

    return mulTexts;
};


const mulOperation = (mulText: string): number => {

    const digitRegex = /\(\d+,\d+\)/g;
    const match = mulText.match(digitRegex);

    if (!match) throw new Error("No match found");

    const digitsText: string = match[0].replace("(", "").replace(")", "");

    let digits: number[] = digitsText.split(",").map((digit: string) => parseInt(digit));

    const product: number = digits[0] * digits[1];
    return product;
};



const matches: string[] = getMulFromText(challengeInput);

const mulResults: number[] = matches.map((mulText: string) => mulOperation(mulText));

const sum: number = mulResults.reduce((acc: number, curr: number) => acc + curr, 0);



console.log("=== Part 1 ===\n", "\tMatches:", matches?.length, "\n\tSum:", sum);

const cleanText: string = cleanDontStatements(challengeInput);

const cleanMatches: string[] = getMulFromText(cleanText);

const cleanMulResults: number[] = cleanMatches.map((mulText: string) => mulOperation(mulText));

const cleanSum: number = cleanMulResults.reduce((acc: number, curr: number) => acc + curr, 0);

console.log("=== Part 2 ===\n", "\tMatches:", cleanMatches?.length, "\n\tSum:", cleanSum);


console.timeEnd("=== Execution Time ===");