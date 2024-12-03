import { readFileSync } from 'fs';
type numberArray = Array<number>;
const inputPath: string = __dirname + '/input.txt';
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

const isReportSafe = (report: numberArray): boolean | [boolean,number]=> {
    let isSafe = true;
    let failIdx = undefined;
    const isAllDecreasing = report[0] > report[1];
    const isAllIncreasing = report[0] < report[1];
    report.every((num, idx) => {
        const nextNum = report[idx + 1];
        if (isNaN(nextNum)) return false; 
        const diff = num - nextNum;
        if (diff === 0) { isSafe = false; failIdx=idx; return false; }
        const isIncreasingDiffSafe = (diff < 0 && diff >= -3);
        const isDecreasingDiffSafe = (diff > 0 && diff <= 3);
        if (isAllDecreasing && isDecreasingDiffSafe) return true;
        if (isAllIncreasing && isIncreasingDiffSafe) return true;
        isSafe = false;
        failIdx=idx;
        return false;
    });

    return failIdx === undefined ? isSafe : [isSafe,failIdx];
};

const checkIfSafeRemovingOne = (report: numberArray): boolean => {

 
    let isSafe: boolean | [boolean,number] = isReportSafe(report);
    let failIdx = 0;

    if (!Array.isArray(isSafe)&&isSafe) return true; 

    if (Array.isArray(isSafe)) failIdx = isSafe[1];
    
    console.log("\n=======\nREPORT: ", report);
    console.log("FAIL IDX: ", failIdx, "VALUE: ", report[failIdx], "NEXT VALUE: ", report[failIdx+1]);
    let reportCopy = [...report];

    reportCopy.splice(failIdx, 1);

    console.log("REPORT COPY: ", reportCopy);

    isSafe = isReportSafe(reportCopy);
    if (!Array.isArray(isSafe)&&isSafe) return true;

    console.log("IS SAFE: ", isSafe);
    reportCopy = [];
    reportCopy = [...report];

    reportCopy.splice(failIdx+1, 1);
    isSafe = isReportSafe(reportCopy);

    if (!Array.isArray(isSafe)&&isSafe) return true;

    if (failIdx === 0) return false; // nothing to do here, it's over

    
    reportCopy = [];
    reportCopy = [...report];

    reportCopy.splice(failIdx-1, 1);
    isSafe = isReportSafe(reportCopy);

    if (!Array.isArray(isSafe)&&isSafe) return true;


    console.log("IS SAFE: ", isSafe);
    return false;



};

// PART 1
console.time("*********\nEXECUTION TIME");
const reports = readAndSplitFile(inputPath);
let safeReports = reports.filter((report) => !Array.isArray(isReportSafe(report)));
console.log("================ PART 1 ================");
console.log("QUANTITY OF SAFE REPORTS: ", safeReports.length);
console.log("TOTAL REPORTS: ", reports.length);
console.timeEnd("*********\nEXECUTION TIME");

// PART 2
console.time("*********\nEXECUTION TIME");

safeReports = reports.filter((report) => checkIfSafeRemovingOne(report));
console.log("================ PART 2 ================");
console.log("QUANTITY OF SAFE REPORTS: ", safeReports.length);
console.log("TOTAL REPORTS: ", reports.length);
console.timeEnd("*********\nEXECUTION TIME");


