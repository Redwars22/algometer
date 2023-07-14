import { IAlgometerFunction, IPerformanceData } from "./types";

function RenderTitle(title: string | null){
    if(title || title !== "")
        console.log(`⏰ Measuring execution time of the ${title} algorithm...`);
}

function InitAlgometer(){
    console.log("-------------------------------------");
    console.log("⏰️ WELCOME TO ALGOMETER");
    console.log("A tool developed by AndrewNation to measure the execution time of algorithms in milliseconds.");
    console.log("Official repo: https://github.com/Redwars22/algometer");
    console.log("-------------------------------------");
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
 * @param {string} title - The title to be shown in the Algometer window.
 * @param {IAlgometerFunction} func - The algorithm to measure.
 * @returns void
 */

export default function Algometer(title: string, func: IAlgometerFunction){
    const performanceData: IPerformanceData = {
        startTime: 0,
        endTime: 0,
        title: null
    }

    InitAlgometer();

    try {
        performanceData.title = title;
        performanceData.startTime = performance.now();
        RenderTitle(performanceData.title);
        func();
        performanceData.endTime = performance.now();
        LogPerformanceData(performanceData);
    } catch (err) {
        HandleError(err);
    }
}