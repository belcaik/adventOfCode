import { readFileSync } from 'fs';

const readAndSplitFile = (path: string): numberArray[] => {
    const input = readFileSync(path, 'utf-8');
    const rows = input.split('\n');
    const reports: numberArray[] = [];

    rows.forEach(row => {
        const reportString = row.split(' ');
        const report = reportString.map((num) => parseInt(num));
        reports.push(
            report
        );
    });
    return reports;
}
