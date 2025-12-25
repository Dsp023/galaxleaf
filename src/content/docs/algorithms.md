---
title: Algorithms
description: Recipes for computation.
category: Cross-Cutting
---

# Algorithms: Problem-Solving Patterns

## Sorting

### Quick Sort (O(n log n) average)
```javascript
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[arr.length - 1];
    const left = arr.filter(x => x < pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}
```

### Merge Sort (O(n log n) guaranteed)
```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i), right.slice(j));
}
```

## Searching

### Binary Search (O(log n))
```javascript
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}
```

### Depth-First Search
```javascript
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    
    for (const neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

### Breadth-First Search
```javascript
function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    
    while (queue.length) {
        const vertex = queue.shift();
        console.log(vertex);
        
        for (const neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

## Dynamic Programming

### Fibonacci (Memoization)
```javascript
function fib(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
```

### Longest Common Subsequence
```javascript
function lcs(s1, s2) {
    const dp = Array(s1.length + 1)
        .fill(null)
        .map(() => Array(s2.length + 1).fill(0));
    
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[s1.length][s2.length];
}
```

## Greedy Algorithms

### Coin Change (Greedy)
```javascript
function coinChange(amount, coins) {
    coins.sort((a, b) => b - a);  // Largest first
    let count = 0;
    
    for (const coin of coins) {
        count += Math.floor(amount / coin);
        amount %= coin;
    }
    
    return amount === 0 ? count : -1;
}
```

## Backtracking

### Generate Permutations
```javascript
function permutations(arr) {
    const result = [];
    
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
            current.pop();
        }
    }
    
    backtrack([], arr);
    return result;
}
```

## Graph Algorithms

### Dijkstra's Shortest Path
```javascript
function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = [[0, start]];  // [distance, node]
    
    for (const node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [dist, node] = pq.shift();
        
        if (visited.has(node)) continue;
        visited.add(node);
        
        for (const [neighbor, weight] of graph[node]) {
            const newDist = dist + weight;
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                pq.push([newDist, neighbor]);
            }
        }
    }
    
    return distances;
}
```

## Two Pointers Pattern

```javascript
// Remove duplicates from sorted array
function removeDuplicates(arr) {
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] !== arr[i]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return arr.slice(0, i + 1);
}

// Check palindrome
function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}
```

## Sliding Window

```javascript
// Max sum subarray of size k
function maxSum(arr, k) {
    let maxSum = 0, windowSum = 0;
    
    // First window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

## Problem-Solving Patterns

1. **Frequency Counter:** Use hash map to count occurrences
2. **Multiple Pointers:** Two indices moving through data
3. **Sliding Window:** Subset of contiguous data
4. **Divide & Conquer:** Break problem into smaller parts
5. **Dynamic Programming:** Overlapping subproblems + memoization
6. **Greedy:** Make locally optimal choice
7. **Backtracking:** Try all possibilities, undo bad choices

## Further Reading

- [LeetCode Patterns](https://seanprashad.com/leetcode-patterns/)
- [Algorithms Illuminated](http://www.algorithmsilluminated.org/)
- [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms)
