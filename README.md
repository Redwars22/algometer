# Algometer
![algometer](https://andrewnationdev.vercel.app/img/algometer.png)
Algometer is a CLI tool to measure the execution time of JavaScript/TypeScript algorithms.

## Features
- It gives you the execution time of a function in milliseconds.
- You can call it from anywhere in your code by importing the `Algometer` function and passing an arrow function containing the algorithm as its argument. Please be sure to run that file with Node, or else Algometer might not work.
- It works with both pure JavaScript and TypeScript.

Example:
```tsx
import Algometer from "../base/algometer";

Algometer(()=>{
    let result: number;
    const k = 12;

    for(let i = 0; i < 80000; i++)
        for(let j = 0; j < 80000; j++)
                result = i * (j*j) + (k*k) - (j + k) - (i*i) * j;
})
```

## Source code and download
Algometer can be installed with `npm i andrew-algometer`. You can also view its source code in its official GitHub repository right [here](https://github.com/Redwars22/algometer).