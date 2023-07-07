import Algometer from "../base/algometer";

Algometer(()=>{
    let result: number;
    const k = 12;

    for(let i = 0; i < 80000; i++)
        for(let j = 0; j < 80000; j++)
                result = i * (j*j) + (k*k) - (j + k) - (i*i) * j;
})