import { IAlgometerFunction, IPerformanceData } from "./types";

function InitAlgometer(){
    console.log("-------------------------------------");
    console.log("⏰️ WELCOME TO ALGOMETER");
    console.log("A tool developed by AndrewNation to measure the execution time of algorithms in milliseconds.");
    console.log("Official repo: https://github.com/Redwars22/algometer");
    console.log("-------------------------------------");
    console.log("Starting measurement...");
}

function LogPerformanceData(data: IPerformanceData){
    const elapsedTime = (data.endTime - data.startTime).toFixed(1)
    console.log("⏳️ Elapsed Time: ", elapsedTime, "ms")
}

function HandleError(err: string){
    console.log("⚠️ EXECUTION PROBLEM: A problem with your algorithm caused Algometer to fail.")
}

/**
 * Measures the performance of a provided function using Algometer.
 * @param {IAlgometerFunction} func - The algorithm to measure.
 * @returns void
 */

export default function Algometer(func: IAlgometerFunction){
    const performanceData: IPerformanceData = {
        startTime: 0,
        endTime: 0
    }

    InitAlgometer();

    try {
        performanceData.startTime = performance.now();
        func();
        performanceData.endTime = performance.now();
        LogPerformanceData(performanceData);
    } catch (err) {
        HandleError(err);
    }
}