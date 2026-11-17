// Dynamic programming is actually a technique to store result of subprolem so you don't have to calculate it again


/**
 * @param {number} n
 * @return {number}
 */

 let dp = {}

var fib = function(n) {
    if(n<=1){
        return n
    }

    if(!dp[n]){
        dp[n] = fib(n-1) + fib(n-2)
    }

    return dp[n]
};


var minimumChanges = function(s, k) {
    let n = s.length;
    let str = s;

    let costMemo = Array.from(
        { length: n + 1 },
        () => Array(n + 1).fill(Infinity)
    );

    function getCost(i, j) {
        let len = j - i + 1;
        let minCost = Infinity;

        for (let d = 1; d < len; d++) {
            if (len % d !== 0)
                continue;

            let cost = 0;

            for (let group = 0; group < d; group++) {
                let l = i + group;
                let r = l + (len / d - 1) * d;

                while (l < r) {
                    if (str[l] !== str[r])
                        cost++;

                    l += d;
                    r -= d;
                }
            }

            minCost = Math.min(minCost, cost);
        }

        return minCost;
    }

    // Precompute costs
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            costMemo[i][j] = getCost(i, j);
        }
    }

    let memo = Array.from(
        { length: n + 1 },
        () => Array(k + 1).fill(Infinity)
    );

    memo[n][0] = 0;

    // Bottom-up DP
    for (let start = n; start >= 0; start--) {
        for (let pieces = 1; pieces <= k; pieces++) {
            if (start + 2 * pieces > n)
                continue;

            let result = Infinity;

            for (let end = start + 1; end < n; end++) {
                let remainCost = memo[end + 1][pieces - 1];

                if (remainCost === Infinity)
                    continue;

                result = Math.min(
                    result,
                    costMemo[start][end] + remainCost
                );
            }

            memo[start][pieces] = result;
        }
    }

    return memo[0][k];
};

/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function (n, costs) {
    let dp = new Array(n).fill(-1);

    function solve(i) {

        if (i === n) return 0;


        if (dp[i] !== -1) return dp[i];

        let ans = Infinity;


        if (i + 1 <= n) {
            ans = Math.min(
                ans,
                costs[i] + 1 ** 2 + solve(i + 1)
            );
        }


        if (i + 2 <= n) {
            ans = Math.min(
                ans,
                costs[i + 1] + 2 ** 2 + solve(i + 2)
            );
        }


        if (i + 3 <= n) {
            ans = Math.min(
                ans,
                costs[i + 2] + 3 ** 2 + solve(i + 3)
            );
        }

        return dp[i] = ans;
    }

    return solve(0);
};

// var fib = function(n) {
//     if(n<=1) return n;
//     return fib(n-1) + fib(n-2);
// };


// Bottom up => Tabulation | Approach


var fib = function(n) {
    let dp = [0,1]

    for(let i = 2; i<=n; i++){
        dp[i] = dp[i-1] + dp[i-2]
    }

    return dp[n]
};


// Climbing stairs


/**
 * @param {number} n
 * @return {number}
 */

var climbStairs = function(n) {
    
    let dp = [0,1,2]

    for(let i = 3; i<=n; i++){
        dp[i] = dp[i-1] + dp[i-2]
    }

    return dp[n]
     
};



// let dp = {}
// var climbStairs = function(n) {
    
//     if(n<=2) return n

//     if(!dp[n]){
//         dp[n] = climbStairs(n-1) + climbStairs(n-2)
//     }

//     return dp[n]  
// };



// var climbStairs = function(n) {
    
//     if(n===1||n===2||n===3) return n

//     let a = 1;
//     let b = 2;
//     let c = 0;
//     for(let i = 3; i<=n; i++){
//         c = a + b
//         a = b;
//         b = c
//     }

//     return c
// };

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(val) {

    if(val.length == 1) return val[0]

    let n = val.length;

    //let dp = [val[0], Math.max(val[0],val[1])]

    let a = val[0]
    let b = Math.max(a,val[1])

    for(let i = 2; i<n; i++){
        let temp = b
        b = Math.max(a+val[i], b)
        a = temp
    }

    return b
};


/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(val) {
    
    let n = val.length;
    if(n==1) return val[0]
    if(n==2) return Math.max(val[0],val[1])

    function helperRob(start, end){
        let p1 = val[start]
        let p2 = Math.max(p1, val[start+1])

        for(let i = start+2; i<=end; i++){
            let temp = p2;
            p2 = Math.max(p2, p1 + val[i])
            p1 = temp
        }

        return p2
    }

   return Math.max(helperRob(0, n-2), helperRob(1, n-1))
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    let n = coins.length;
    let dp = {}

    let fn = (remainingAmount)=>{

        if(remainingAmount === 0) return 0
        if(remainingAmount < 0) return -1

        if(remainingAmount in dp){
            return dp[remainingAmount]
        }

        let minCoins = Infinity
        for(let i = 0; i<n; i++){
            let res = fn(remainingAmount - coins[i])
            if(res != -1){
                minCoins = Math.min(1 + res, minCoins)
            }

        }
        dp[remainingAmount] = minCoins === Infinity ? -1 : minCoins
        return dp[remainingAmount]
    }

    return fn(amount)
};

// tabulation approach


var coinChange = function(coins, amount) {
    let n = coins.length;
    let dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for(let i = 1; i<=amount; i++){
        for(let j = 0; j<n; j++){
            let remaingAmount = i - coins[j]
            if(remaingAmount >= 0){
                dp[i] = Math.min(dp[i], 1 + dp[remaingAmount])
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount]
};


/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let n = s.length
    let dp = Array.from({ length: n }, () => Array(n).fill(null))
    let ans = 0
    for (let i = 0; i < n; i++) {
        dp[i][i] = true
        ans++
        if (i < n - 1 && s[i] === s[i + 1]) {
            dp[i][i + 1] = true
            ans++
        }
    }

    //
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1

            if (s[i] == s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true
                ans++
            }
        }
    }

    return ans
};

//

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    let dp = {}

    function fn(remS) {

        if (remS === "") return 1
        if (remS == "0") return 0

       // if(dp[remS]) return dp[remS]
       // if(remS in dp) return dp[remS]
        if(dp[remS] !== undefined) return dp[remS]

        let n = remS.length
        let ans = 0
        let oneDigit = remS.substring(n - 1)
        let twoDigit = remS.substring(n - 2)

        if(oneDigit != 0){
            ans+= fn(remS.substring(0, n - 1))
        }

        if(twoDigit >= 10 && twoDigit <= 26){
            ans+= fn(remS.substring(0, n - 2))
        }

        dp[remS] = ans

        return ans
    }

    return fn(s)
};


//


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(arr) {
    let n = arr.length;
    let maxProdSoFar = arr[0];
    let miniProdSoFar = arr[0];
    let totalProd = arr[0];

    for(let i = 1; i < n; i++){
        let maxProdCopy = maxProdSoFar;

        maxProdSoFar = Math.max(arr[i], maxProdSoFar * arr[i], miniProdSoFar * arr[i]);
        miniProdSoFar = Math.min(arr[i], maxProdCopy * arr[i], miniProdSoFar * arr[i]);

        totalProd = Math.max(totalProd, maxProdSoFar);
    }
    
    return totalProd;
};


var maxProduct = function(arr) {
    let n = arr.length;
    let ltr = rtl = 1
    let totalMaxProd = -Infinity

    for(let i = 0; i< n; i++){
        ltr = ltr * arr[i]
        rtl = rtl * arr[n-i-1]
        totalMaxProd = Math.max(ltr,rtl, totalMaxProd)
        if(ltr == 0) ltr = 1
        if(rtl == 0) rtl = 1
    }

    return totalMaxProd
};

//

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    let dp = {}

    function canBreak(remainingStr) {

        if (remainingStr == "") return true

        if(dp[remainingStr] !== undefined) return dp[remainingStr]

        let res = false

        for (let i = 0; i < remainingStr.length; i++) {

            let word = remainingStr.slice(0, i + 1)

            if (wordDict.includes(word) && canBreak(remainingStr.slice(i + 1))){
                res = true
            }
            
        }

        return dp[remainingStr] = res

    }

    return canBreak(s)
};

//

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (arr) {
    let n = arr.length;
    let dp = new Array(n).fill(1);
    let lisLength = 1

    for (let i = 1; i < n; i++) {

        for (let j = 0; j < i; j++) {

            if(arr[j]<arr[i]){
                dp[i] = Math.max(dp[i], dp[j] + 1);
                lisLength = Math.max(dp[i], lisLength);
            }
            
        }
    }

    return lisLength;

};

//

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (arr) {

    let sum = arr.reduce((acc, curr) => acc + curr, 0) 

    if (sum % 2) return false

    sum = sum/2
    let dp = Array.from({length: sum+1}, ()=> Array(arr.length).fill(undefined))
    let fn = (remS, start) => {

        if (remS === 0) return true;

        if (remS < 0) return false;

        if(dp[remS][start] != undefined) return dp[remS][start]

        for (let i = start; i < arr.length; i++) {

            if (fn(remS - arr[i], i + 1)) {
                return dp[remS][start] = true
            }
        }

        return dp[remS][start] = false
    }


    return fn(sum, 0)
};

//

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {

    let n = coins.length;

    let dp = Array.from({length: amount + 1}, ()=> Array(n).fill(-1))

    let fn = (remS, start)=>{

        if(remS == 0) return 1
        if(remS < 0) return 0

        if(dp[remS][start] !== -1) return dp[remS][start]

        let combination = 0

        for(let i = start; i<n; i++){
            combination += fn(remS - coins[i], i)
        }

        return dp[remS][start] = combination

    }
    
    return fn(amount, 0)
};

//

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let farthest = 0;
    
    for(let i = 0; i<nums.length; i++){

        if(i>farthest) return false;

        farthest = Math.max(farthest, i+nums[i])
    }

    return true
};










// dp approach - TLE
// var canJump = function(nums) {
//     let end = nums.length - 1;
//     let dp = new Array(nums.length).fill(-1)

//     function bfs(start){
//         if(start == end) return true
//         if(dp[start] !== -1) return dp[start]

//         let ans = false;
//         for(let i = 1; i <= nums[start]; i++){
//             ans = ans || bfs(i+start)
//         }
       

//         return dp[start] = ans

//     }

//     return bfs(0)
// };

//

/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
var minCost = function (n, cuts) {
    let dp = {}
    function dfs(start, end) {
        if (start >= end) return 0;

        let key = start + "_" + end
        if(dp[key] !== undefined) return dp[key]
        let minCost = Infinity;
        for (let c of cuts) {

            if (c > start && c < end) {
                let currCost = (end - start) + dfs(start, c) + dfs(c, end);

                minCost = Math.min(minCost, currCost)
            }
        }

        return dp[key] = minCost == Infinity ? 0 : minCost
    }

    return dfs(0, n)

};

/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function(k, n) {
    let dp = new Array(k+1).fill(0)
    let moves = 0

    while(dp[k] < n){
        moves++
        for(let i = k; i>=1; i--){
            dp[i] = 1 + dp[i] + dp[i-1]
        }
    }

    return moves
};

// class Solution {
//     public char findKthBit(int n, int k) {
//         // Base case: if n is 1, the sequence is just "0"
//         if (n == 1) {
//             return '0';
//         }

//         // Length of the sequence at level n: 2^n - 1
//         int length = (1 << n) - 1;

//         // If k is in the first half, recurse on the first half
//         if (k < Math.ceil(length / 2.0)) {
//             return findKthBit(n - 1, k);
//         } 
//         // If k is the middle bit, return '1'
//         else if (k == Math.ceil(length / 2.0)) {
//             return '1';
//         } 
//         // Otherwise, recurse on the mirrored second half
//         else {
//             char ch = findKthBit(n - 1, length - (k - 1)); // handle reversed
//             return (ch == '0') ? '1' : '0'; // handle flipped bit
//         }
//     }
// }

/**
 * @param {number[]} arr
 * @param {number} d
 * @return {number}
 */
var maxJumps = function (arr, d) {
    let n = arr.length;
    let t = new Array(n).fill(-1)
    let result = 1;

    for (let i = 0; i < n; i++) {
        result = Math.max(result, solve(arr, i, d, t))
    }

    return result
};

function solve(arr, i, d, t) {

    if(t[i] !== -1) return t[i]

    let result = 1
    //left side traversal
    for (let j = i - 1; j >= Math.max(0, i - d); j--) {

        if (arr[i] <= arr[j]) break;

        result = Math.max(result, 1 + solve(arr, j, d,t))
    }

    //right side traversal

    for (let j = i + 1; j <= Math.min(arr.length - 1, i + d); j++) {

        if (arr[i] <= arr[j]) break;

        result = Math.max(result, 1 + solve(arr, j, d,t))
    }

    return t[i] = result
}

var canReach = function(s, minJump, maxJump) {

    let n = s.length;
    let q = []
    q.push(0)

    let farthest = 0
    while(q.length){
        let index = q.shift()

        let start = Math.max(farthest+1, index+minJump)
        let end = Math.min(index+maxJump, n-1)

        for(let j = start; j<=end; j++){
            if(s[j] == "0" ){
                
                if(j == n-1) return true
                q.push(j)
            }
        }

        farthest = Math.max(farthest, end)
    }

    return false
};

/**
 * @param {number[]} nums
 * @return {number}
 */

 // I need to more understand it, I will do more practice on DP
var subsequencePairCount = function(nums) {
    const MOD = 1000000007;
    const n = nums.length;

    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: 201 }, () =>
            Array(201).fill(-1)
        )
    );

    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    function solve(i, first, second) {
        if (i === n) {

            const bothNonEmpty = first !== 0 && second !== 0;
            const gcdsMatch = first === second;
            return (bothNonEmpty && gcdsMatch) ? 1 : 0;
        }

        if (dp[i][first][second] !== -1) {
            return dp[i][first][second];
        }

    
        let skip = solve(i + 1, first, second);

    
        let take1 = solve(i + 1, gcd(first, nums[i]), second);

        let take2 = solve(i + 1, first, gcd(second, nums[i]));

        dp[i][first][second] = (skip + take1 + take2) % MOD;

        return dp[i][first][second];
    }

    return solve(0, 0, 0);
};
var stoneGameIII = function(stoneValue) {
    const n = stoneValue.length;
    const dp = new Array(n + 1).fill(-1);

    function solve(i) {
        if (i === n) return 0;

        if (dp[i] !== -1) return dp[i];

        dp[i] = stoneValue[i] - solve(i + 1);

        if (i + 1 < n) {
            dp[i] = Math.max(
                dp[i],
                stoneValue[i] + stoneValue[i + 1] - solve(i + 2)
            );
        }

        if (i + 2 < n) {
            dp[i] = Math.max(
                dp[i],
                stoneValue[i] + stoneValue[i + 1] + stoneValue[i + 2] - solve(i + 3)
            );
        }

        return dp[i];
    }

    const diff = solve(0);

    if (diff < 0) return "Bob";
    if (diff > 0) return "Alice";
    return "Tie";
};

/**
 * @param {number[]} piles
 * @return {number}
 */

var stoneGameII = function(piles) {

    const n = piles.length;

    const t = Array.from(
        { length: 2 },
        () => Array.from(
            { length: n + 1 },
            () => new Array(n + 1).fill(-1)
        )
    );

    function solveForAlice(person, i, M) {

        if (i >= n) {
            return 0;
        }

        if (t[person][i][M] !== -1) {
            return t[person][i][M];
        }

        let result;

        if (person === 1) {
            
            result = -Infinity;
        } else {
            
            result = Infinity;
        }

        let stones = 0;

        for (let x = 1; x <= Math.min(2 * M, n - i); x++) {

            stones += piles[i + x - 1];

            if (person === 1) {
                // Alice's turn
                result = Math.max(
                    result,
                    stones + solveForAlice(
                        0,
                        i + x,
                        Math.max(M, x)
                    )
                );

            } else {
                // Bob's turn
                result = Math.min(
                    result,
                    solveForAlice(
                        1,
                        i + x,
                        Math.max(M, x)
                    )
                );
            }
        }

        t[person][i][M] = result;

        return result;
    }

    return solveForAlice(1, 0, 1);
};


/**
 * @param {number} n
 * @return {boolean}
 */

var winnerSquareGame = function(n) {

    const dp = new Array(n + 1).fill(false);


    for (let i = 1; i <= n; i++) {

        for (let j = 1; j * j <= i; j++) {

            const remaining = i - j * j;

            if (dp[remaining] === false) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};

/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */


var minOperations = function(nums, x, k) {
    const n = nums.length;

    // Coordinate compression
    const sorted = [...new Set([...nums].sort((a, b) => a - b))];
    const m = sorted.length;

    const index = new Map();
    for (let i = 0; i < m; i++) {
        index.set(sorted[i], i + 1);
    }

    
    class Fenwick {
        constructor(size) {
            this.size = size;
            this.tree = new Float64Array(size + 1);
        }

        add(i, val) {
            while (i <= this.size) {
                this.tree[i] += val;
                i += i & -i;
            }
        }

        
        sum(i) {
            let result = 0;

            while (i > 0) {
                result += this.tree[i];
                i -= i & -i;
            }

            return result;
        }

        
        kth(k) {
            let idx = 0;
            let bit = 1;

            while (bit * 2 <= this.size) {
                bit *= 2;
            }

            for (; bit > 0; bit >>= 1) {
                const next = idx + bit;

                if (next <= this.size && this.tree[next] < k) {
                    idx = next;
                    k -= this.tree[next];
                }
            }

            return idx + 1;
        }
    }

    const countBIT = new Fenwick(m);
    const sumBIT = new Fenwick(m);

    let totalSum = 0;

    
    function add(val, delta) {
        const pos = index.get(val);

        countBIT.add(pos, delta);
        sumBIT.add(pos, val * delta);
        totalSum += val * delta;
    }

    
    function getCost() {
        const medianPos = countBIT.kth(Math.floor((x + 1) / 2));
        const median = sorted[medianPos - 1];

        const leftCount = countBIT.sum(medianPos);
        const leftSum = sumBIT.sum(medianPos);

        const rightCount = x - leftCount;
        const rightSum = totalSum - leftSum;

        const leftCost = median * leftCount - leftSum;
        const rightCost = rightSum - median * rightCount;

        return leftCost + rightCost;
    }

    
    const costs = [];

    for (let i = 0; i < x; i++) {
        add(nums[i], 1);
    }

    costs.push(getCost());

    for (let i = x; i < n; i++) {
        add(nums[i - x], -1);
        add(nums[i], 1);

        costs.push(getCost());
    }

    
    let prev = new Float64Array(n + 1);
    const INF = Number.MAX_SAFE_INTEGER;

    for (let j = 1; j <= k; j++) {
        const curr = new Float64Array(n + 1);
        curr.fill(INF);

        for (let i = 1; i <= n; i++) {
            
            curr[i] = curr[i - 1];

        
            if (i >= x && prev[i - x] !== INF) {
                const cost = prev[i - x] + costs[i - x];

                curr[i] = Math.min(curr[i], cost);
            }
        }

        prev = curr;
    }

    return prev[n];
};
