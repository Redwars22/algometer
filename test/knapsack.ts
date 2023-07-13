import Algometer from "../base/algometer";

interface Item {
    weight: number;
    value: number;
  }
  
  function knapsack(items: Item[], capacity: number): number {
    const n = items.length;
    const dp: number[][] = [];
  
    // Initialize DP table
    for (let i = 0; i <= n; i++) {
      dp[i] = [];
      for (let j = 0; j <= capacity; j++) {
        dp[i][j] = 0;
      }
    }
  
    // Populate DP table
    for (let i = 1; i <= n; i++) {
      const { weight, value } = items[i - 1];
      for (let j = 0; j <= capacity; j++) {
        if (weight > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], value + dp[i - 1][j - weight]);
        }
      }
    }
  
    // Return the maximum value
    return dp[n][capacity];
  }
  
  // Example usage:
  const items: Item[] = [
    { weight: 2, value: 3 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 },
    { weight: 5, value: 8 },
    { weight: 9, value: 10 },
  ];
  const capacity = 15;
  
  const maxValue = knapsack(items, capacity);

  Algometer(()=> console.log(maxValue));