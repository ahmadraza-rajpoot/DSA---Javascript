/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function(costs) {
    costs.sort((a,b)=> (b[1]-b[0]) - (a[1]-a[0]) )

    let n = costs.length/2

    let ans = 0
    for(let i = 0; i<n; i++){

        ans += costs[i][0]

        ans += costs[n+i][1]
    }

    return ans;
};

//

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    g.sort((a,b)=>a-b)
    s.sort((a,b)=>a-b)

    let i = 0
    let j = 0
   
    while(i<g.length && j<s.length){
        
        if(g[i]<=s[j]){

            i++
        }
        
        j++
    }

    return i;
};

//

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    let n = intervals.length

    let result = []
    let i = 0

    // left
    while(i<n && intervals[i][1] < newInterval[0]){
        result.push(intervals[i])
        i++
    }

    //overlaping
    while(i<n && intervals[i][0] <= newInterval[1]){
        newInterval[0] = Math.min(newInterval[0], intervals[i][0])
        newInterval[1] = Math.max(newInterval[1], intervals[i][1])
        i++
    }
    result.push(newInterval)
    // end intervals
    while(i<n){
        result.push(intervals[i])
        i++
    }
    return result
};

/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {

    let result = []
    let start = Array(26).fill(-1)
    let end = Array(26).fill(-1)

    for(let i = 0; i< s.length; i++){
        let curr = s.charCodeAt(i) - 97
        
        if(start[curr] == -1){
            start[curr] = i
        }
        
        end[curr] = i
        
    }
    
    let partitionStart = partitionEnd = 0;
    
    for(let i = 0; i<s.length; i++){
        let curr = s.charCodeAt(i) - 97
        
        if(partitionEnd < start[curr]){
            result.push(partitionEnd - partitionStart + 1)
            partitionStart = partitionEnd = i
        }
        
        partitionEnd = Math.max(partitionEnd, end[curr])
    }
    
    if(partitionEnd - partitionStart + 1 > 0){
        result.push(partitionEnd - partitionStart + 1)
    }

    return result
};



// approach 1
// var partitionLabels = function (s) {

//     let i = 0;
//     let j = 1;
//     let result = []
//     let end = 0
//     while (i < s.length) {

//         if (s[i] == s[j]) {
//             end = j
//         }

//         j++
//         if (j > s.length - 1) {
//             result.push([i, end])
//             i++
//             j = 0
//         }
//     }

//     let ans = [result[0]]

//     for (let i = 1; i < result.length; i++) {
//         if (result[i][0] <= ans[ans.length - 1][1]) {
//             ans[ans.length - 1][1] = Math.max(ans[ans.length - 1][1], result[i][1])
//         } else {
//             ans.push(result[i])
//         }
//     }


//     let final = []

//     for (let i = 0; i < ans.length; i++) {
//         final.push((ans[i][1] - ans[i][0]) + 1)
//     }

//     return final
// };


/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(arr, n) {

    let charArray = new Array(26).fill(0)
    let maxFreq = 0
    
    for(let i = 0; i<arr.length; i++){

        let curr = arr[i].charCodeAt() - 65

        charArray[curr]++

        maxFreq = Math.max(maxFreq, charArray[curr])
    }
    
    let maxFreqCount = 0;
    for(let i = 0; i<26; i++){

        if(charArray[i] === maxFreq){
            maxFreqCount++
        }

    }
    
    let cycles = ((n+1) * (maxFreq - 1)) + maxFreqCount
    return Math.max(cycles, arr.length)
};


var maximumSaleItems = function (items, budget) {
    const n = items.length;

    const freq = Array(n + 1).fill(0);
    let cheapestPrice = Infinity;

    for (const [factor, price] of items) {
        freq[factor]++;
        cheapestPrice = Math.min(cheapestPrice, price);
    }

    const factorSum = Array(n + 1).fill(0);

    for (let f = 1; f <= n; f++) {
        for (let k = f; k <= n; k += f) {
            factorSum[f] += freq[k];
        }
    }

    const units = [];

    for (const [factor, price] of items) {
        const count = factorSum[factor] - 1;

        if (count > 0 && price < 2 * cheapestPrice) {
            units.push([price, count]);
        }
    }

    units.sort((a, b) => a[0] - b[0]);

    let result = 0;

    for (const [price, factorCount] of units) {
        const k = Math.min(factorCount, Math.floor(budget / price));

        budget -= k * price;
        result += 2 * k;
    }

    result += Math.floor(budget / cheapestPrice);

    return result;
};

//

/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function(trips, capacity) {
    let loc = new Array(1001).fill(0)

    for(let i = 0; i < trips.length; i++){
       let [numPassengers, from, to] = trips[i]
       loc[from] += numPassengers
       loc[to] -= numPassengers
    }
    let usedCapacity = 0;

    for(let i = 0; i<1001; i++){

        usedCapacity += loc[i]

        if(usedCapacity > capacity){
            return false;
        }
    }

    return true
};


//



/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let totalGain = 0;
    let currGain = 0;
    let ans = 0;

    for(let i = 0; i< gas.length; i++){
        let gain = gas[i] - cost[i]

        currGain += gain;
        totalGain += gain;

        if(currGain < 0){
            ans = i+1;
            currGain = 0;
        }
    }

    return totalGain < 0? -1: ans
};


var maximumSaleItems = function (items, budget) {
    const n = items.length;

    const benefits = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j && items[j][0] % items[i][0] === 0) {
                benefits[i]++;
            }
        }
    }

    const NEG_INF = -Infinity;
    let dp = Array(budget + 1).fill(NEG_INF);
    dp[0] = 0;

    for (let i = 0; i < n; i++) {
        const price = items[i][1];
        const benefit = benefits[i];

        if (price > budget) continue;

        const next = dp.slice();

        for (let r = 0; r < price && r <= budget; r++) {
            let best = NEG_INF;
            let t = 0;

            for (let cost = r; cost <= budget; cost += price, t++) {

                if (t >= 1) {
                    const previousCost = cost - price;

                    if (dp[previousCost] !== NEG_INF) {
                        best = Math.max(best, dp[previousCost] - (t - 1));
                    }
                }

                if (best !== NEG_INF) {
                    next[cost] = Math.max(
                        next[cost],
                        benefit + t + best
                    );
                }
            }
        }

        dp = next;
    }

    return Math.max(...dp);
};

//

/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (arr) {
    let n = arr.length;
    let ans = n
    let i = 1;

    while (i < n) {

        if (i < n && arr[i] == arr[i - 1]) {
            i++
            continue
        }

        let up = 0;
        while (i < n && arr[i] > arr[i - 1]) {
            up++
            ans += up
            i++
        }

        let down = 0;
        while (i < n && arr[i] < arr[i - 1]) {
            down++
            ans += down

            i++
        }
        ans = ans - Math.min(up, down)
    }

    return ans
};




















// var candy = function(arr) {
//     let n = arr.length;

//     let ltr = new Array(n).fill(1)

//     for(let i = 1; i< n; i++){
//         if(arr[i]>arr[i-1]){
//             ltr[i] = ltr[i-1] + 1
//         }
//     }

//     let rtl = new Array(n).fill(1)

//     for(let i = n-2; i>=0; i--){
//         if(arr[i]>arr[i+1]){
//             rtl[i] = rtl[i+1] + 1
//         }
//     }

//     let ans = 0;

//     for(let i =0; i<n; i++){
//         ans = ans + Math.max(ltr[i], rtl[i])
//     }

//     return ans
// };


/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let farthest = currEnd = jumps = 0;

    for(let i =0; i<nums.length - 1; i++){
        farthest = Math.max(farthest, i + nums[i])

        if(i == currEnd){
            currEnd = farthest;
            jumps++;
        }
    }

    return jumps;
};

