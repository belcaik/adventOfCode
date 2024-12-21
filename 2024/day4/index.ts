console.log('================ DAY 4 ==================');
console.time("*********\nEXECUTION TIME:");

import { readFileSync } from 'fs';

const readAndSplitFile = (path: string): string => {
    const input = readFileSync(path, 'utf-8');
    const rows = input.split('\n');
    const reports: string[] = [];

    console.log('rows:', rows);
    return 'ok';
}


const inputPath: string = __dirname + '/input.txt';

const input = readAndSplitFile(inputPath);

const rows = input.split('\n');

console.log('rows:', rows);