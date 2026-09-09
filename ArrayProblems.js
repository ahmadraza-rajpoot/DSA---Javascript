// Leetcode problems


// 27. Remove Element
var removeElement = function(nums, val) {

    let x = 0;
    for(let i = 0; i< nums.length; i++){
        if(nums[i] != val){
            nums[x] = nums[i];
            x = x+1;
        }
    }
    
    return x
};

// Reverse String
var reverseString = function(s) {
    sCopy = [...s];
    x = 0;

    for(let i = s.length-1; i>=0; i--){
        s[x] = sCopy[i];
        x = x + 1;
    }

   // console.log(sCopy)
    return s;
};
 let s = ["h","e","l","l","o"]
let resultS = reverseString(s)

//console.log(resultS);



// let t = [1,2,3,4]
// let tt = [...t]

// t[0] = 0;

// console.log(t)
// console.log(tt)


let st = ["H","a","n","n","a","h"]

// let left = 0;
// let right = st.length - 1;
// let swap = null;

// while(left<right){
//     swap = st[left];
//     st[left] = st[right];
//     st[right] = swap;
//     left++;
//     right--
// }


var reverseString = function(s) {
    let left = 0;
    let right = s.length-1;

    while(left<right){
        let temp = s[left];
        s[left] = s[right]
        s[right] = temp;
        left++;
        right--;
    }

    return s;
};

//console.log(reverseString(st))


// Buy and sell slock


let p = [7,1,5,3,6,4]

let min = p[0];
let maxProfit = 0;

for(let i = 1; i<p.length; i++){
    if(p[i]-min > maxProfit){
        maxProfit = p[i]-min;
    }
    if(p[i]<min){
        min = p[i];
    }
}

//console.log(maxProfit)

let n = [2,5,6]
let n2 = [1,2,3]
let nums = []

let m = n.length;
let c = n2.length;

let p1 = 0;
let p2 = 0;

for(let i=0; i<m+c; i++){
   
    if(p2>=c || (n[p1]<n2[p2]&&p1<n.length)){
        nums[i] = n[p1];
        p1++;
    }else{
        nums[i] = n2[p2];
        p2++;
    }

}

console.log(nums)


// Move zero to the end

var moveZeroes = function(nums) {
    let digitIndex = 0;
    for(let i = 0; i< nums.length; i++){
        if(nums[i]!=0){
            nums[digitIndex] = nums[i];
            digitIndex++;
        }
    }

    for(let i = digitIndex; i<nums.length; i++){
        nums[i] = 0;
    }
};


// find the missing number

var missingNumber = function(nums) {
    let n = nums.length;
    let totalSum = n * (n+1) / 2
    let sumOfNums = 0;

    for(let i = 0; i<nums.length; i++){
        sumOfNums += nums[i];
    }

    return totalSum - sumOfNums
};

let xNum = [3,1,5,4,1,5,3]

let xor = 0;
for(let i = 0; i<xNum.length; i++){

    xor = xor ^ xNum[i]
    console.log(xNum)
    console.log(` xNum[i]=${xNum[i]}, Xor = ${xor}`)
}

console.log(xor);



/**
 * @param {number[]} nums
 * @return {number}
 */
 // Boyer Moore algorithm
var majorityElement = function(nums) {
    let count = 1;
    let maj = nums[0]

    for(let i =1; i<nums.length; i++){
        if(count===0){
           maj = nums[i]
           count = 1
        }else if(nums[i] == maj){
            count++
        }else{
            count--
        }
    }

    return maj
};


// BruteForce approach

// var majorityElement = function(nums) {
//     let n = Math.ceil(nums.length/2)
//     let map = {}
//     for(let i = 0; i<nums.length; i++){
//         if(!map[nums[i]]){
//             map[nums[i]] = 1
//         }else{
//             map[nums[i]]++
//         }

//         if(map[nums[i]]>=n){
//             return nums[i]
//         }
//     }
// };


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let n = nums.length;
    if(n<3) return []
    nums.sort((a,b) => a-b)
    let result = []



    for(let i = 0; i<n-2; i++){
        if(i>0 && nums[i] == nums[i-1]){
            continue;
        }

        let n1 = nums[i]
        let target = -n1

        twoSum(nums, target, i+1, n-1, result)

    }

    return result
};

function twoSum(nums, target, i, j, result){
    

    while(i<j){
        if(nums[i]+nums[j] > target){
            j--
        } else if(nums[i]+nums[j] < target){
            i++
        }else{
            while(nums[i]===nums[i+1]) i++;
            while(nums[j]===nums[j-1]) j--;

            result.push([ -target, nums[i], nums[j] ])
            i++;
            j--;
        }
    }
}

//

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    let n = nums.length;
    nums.sort((a,b)=> a-b)

    let closest = Infinity

    for(let k = 0; k<=n-3; k++){
        let i = k+1;
        let j = n-1;

        while(i<j){
            let sum = nums[k] + nums[i] + nums[j]

            if(Math.abs(target - sum) < Math.abs(target - closest)){
                closest = sum
            }

            if(sum < target){
                i++
            }else{
                j--
            }
        }
    }

    return closest
};


/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(arr) {
    let l = 0;
    let r = arr.length - 1

    while(l<r){
        let m = Math.floor(l + (r-l)/2)

        if(arr[m]>arr[r]){
            l = m+1
        }else{
            r = m
        }
    }

    return arr[r]
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// var findMin = function(nums) {
//     let l = 0;
//     let r = nums.length - 1

//     while(l<r){
//         while(l<r && nums[l] == nums[l+1]) l++;
//         while(l<r && nums[r] == nums[r-1]) r--;

//         let mid = Math.floor(l + (r - l) /2)

//         if(nums[mid] > nums[r]){
//             l = mid + 1
//         }else{
//             r = mid
//         }
//     }

//     return nums[r]
// };


var findMin = function(nums) {
    let l = 0;
    let r = nums.length - 1;

    while(l < r){
        let mid = Math.floor(l + (r - l) / 2);

        if(nums[mid] > nums[r]){
            l = mid + 1;
        }
        else if(nums[mid] < nums[r]){
            r = mid;
        }
        else{
            r--;
        }
    }

    return nums[l];
};

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var findThePrefixCommonArray = function(A, B) {
   let n = A.length
   let map = {}
   let count = 0
   let result = []

   for(let i = 0; i<n; i++){
        if(map[A[i]] == undefined){
            map[A[i]] = 1
        }else{
            map[A[i]]++
        }

        if(map[A[i]] == 2) count++

        if(map[B[i]] == undefined){
            map[B[i]] = 1
        }else{
            map[B[i]]++
        }

        if(map[B[i]] == 2) count++

        result.push(count)
   }
    
    return result
};





var findThePrefixCommonArray = function(A, B) {
    let result = []
    for(let n = 0; n<A.length; n++){
        let count  = findCommonCount(A,B, n)
    
        result.push(count)
    }
    
    return result
};

function findCommonCount(a, b,n){

    let count = 0
    for(let i = 0; i<=n; i++){
        for(let j =0; j<=n; j++){

            if(a[i] == b[j]){
                count++
            } 

        }
    }

    return count
}


/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function(arr1, arr2) {
    let set = new Set()

    for(let num of arr1){
        
        while(!set.has(num) && num > 0){
            set.add(num)
            num = Math.floor(num/10)
        }
    }

    let result = 0
    
    for(let num of arr2){

        while(num>0){
            if(set.has(num)){
            
                let len = Math.ceil(Math.log10(num+1))
            
                result = Math.max(result, len)
            }
            num = Math.floor(num/10)
        }
    }


    return result
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function(nums) {
    let n = nums.length

    let peak = 0

    for(let i =0; i<n; i++){
        if(nums[i] > nums[(i+1)%n]) peak++
    }

    if(peak > 1) return false

    return true

};



// var check = function(nums) {
//     let isSorted = checkSortedArray(nums, 0)
//     if(isSorted) return true
//     const minIdx = findPivot(nums)
//     console.log(minIdx)
//     return checkSortedArray(nums, minIdx)

// };


// function findPivot(nums){
//     let l = 0;
//     let r = nums.length - 1

//     while(l<r){

//         // while(nums[l] == nums[l+1]){
//         //     l++
//         // }

//         // while(nums[r] == nums[r-1]){
//         //     r--
//         // }
        
//         let m = Math.floor(l + (r-l)/2)

//         if(nums[m] > nums[r]){
//             l = m + 1
//         }else{
//             r = m
//         }
//     }

//     return r
// }

// function findMinIdx(nums){
//     let min = Infinity
//     let idx = 0

//     for(let i = 0; i<nums.length; i++){
//         if(nums[i]<min){
//             min = nums[i]
//             idx = i
//         }
//     }

//     return idx
// }

// function checkSortedArray(nums, pivot){
//     let n = nums.length
    
//     for(let i =0; i<n-1; i++){
//         let idx = (pivot + i) % n
//         let nextIdx = (pivot + i+1) % n

//         if(nums[idx]>nums[nextIdx]){
//             return false
//         }
//     }

//     return true
// }




/**
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function(nums) {
    let min = Infinity

    for(let num of nums){
        let currSum = 0
        while(num>0){
            let lastDigit = num%10
            currSum+=lastDigit
            num = Math.floor(num/10)
        }

        min = Math.min(currSum, min)
    }

    return min
};

// var longestCommonPrefix = function(arr1, arr2) {
//     let n = arr1.length;
//     let m = arr2.length;
//     let maxCount = 0
//     for(let i =0; i<n; i++){
//         for(let j=0; j<m; j++){

//            let count = getPrefixCount(arr1[i], arr2[j])
           
//            maxCount = Math.max(maxCount, count)
//         }  
//     }

//     return maxCount
// };


// function getPrefixCount(num1, num2) {
//     let numStr1 = num1.toString();
//     let numStr2 = num2.toString();

//     let i = 0;
//     let j = 0;
//     let prefixCount = 0;

//     while (i < numStr1.length && j < numStr2.length) {
//         if (numStr1[i] == numStr2[j]) {
//             prefixCount++;
//         } else {
//             break;
//         }

//         i++;
//         j++;
//     }

//     return prefixCount;
// }

// function getPrefixCount(num1, num2){

//     let l1 = getLength(num1)
//     let l2 = getLength(num2)
    

//     if(l1 > l2){
//         let diff = l1 - l2

//         for(let i =0; i<diff; i++){
//             num1 = Math.floor(num1/10)
//         }
//     }else if(l1<l2){
//         let diff = l2 - l1
//         for(let i =0; i<diff; i++){
//             num2 = Math.floor(num2/10)
//         }
//     }

    

//     while(num1>0 && num2>0){
//         if(num1 == num2){
//             return getLength(num1)
//         }
//         num1 = Math.floor(num1/10)
//         num2 = Math.floor(num2/10)
//     }
    
//     return 0
// }

// function getLength(num){
//     num = Math.abs(num)

//     if(num == 0) return 1

//     let length = 0

//     while(num>0){
//         length++
//         num = Math.floor(num/10)

//     }

//     return length
// }



// Segment tree 


/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var getResults = function(queries) {
    const n = 50000;
    const segmentTree = new Array(4 * n).fill(0);

    function updateSegTree(idx, val, i, l, r) {
        if (l === r) {
            segmentTree[i] = val;
            return;
        }

        const mid = l + Math.floor((r - l) / 2);

        if (idx <= mid) {
            updateSegTree(idx, val, 2 * i + 1, l, mid);
        } else {
            updateSegTree(idx, val, 2 * i + 2, mid + 1, r);
        }

        segmentTree[i] = Math.max(
            segmentTree[2 * i + 1],
            segmentTree[2 * i + 2]
        );
    }

    function querySegTree(start, end, i, l, r) {
        if (l > end || r < start) {
            return 0;
        }

        if (l >= start && r <= end) {
            return segmentTree[i];
        }

        const mid = l + Math.floor((r - l) / 2);

        return Math.max(
            querySegTree(start, end, 2 * i + 1, l, mid),
            querySegTree(start, end, 2 * i + 2, mid + 1, r)
        );
    }

    const obstacles = [0];
    const result = [];

    function upperBound(arr, target) {
        let left = 0;
        let right = arr.length;

        while (left < right) {
            const mid = left + Math.floor((right - left) / 2);

            if (arr[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }

    for (const query of queries) {
        if (query[0] === 1) {
            const x = query[1];

            const idx = upperBound(obstacles, x);

            const nxt = idx < obstacles.length ? obstacles[idx] : -1;
            const pre = obstacles[idx - 1];

            updateSegTree(x, x - pre, 0, 0, n - 1);

            if (nxt !== -1) {
                updateSegTree(nxt, nxt - x, 0, 0, n - 1);
            }

            obstacles.splice(idx, 0, x);
        } else {
            const x = query[1];
            const sz = query[2];

            const idx = upperBound(obstacles, x);
            const pre = obstacles[idx - 1];

            const maxGap = querySegTree(0, pre, 0, 0, n - 1);
            const best = Math.max(maxGap, x - pre);

            result.push(best >= sz);
        }
    }

    return result;
};


/**
 * @param {number} mass
 * @param {number[]} asteroids
 * @return {boolean}
 */
var asteroidsDestroyed = function(mass, asteroids) {
    asteroids.sort((a,b) => a-b)

    for(let ast of asteroids){
        if(mass>=ast){
            mass += ast
        }else{
            return false
        }
    }

    return true
};


/**
 * @param {number[]} cost
 * @return {number}
 */
// var minimumCost = function(cost) {

//     cost.sort((a,b)=>b-a)
    
//     let minCost = 0

//     for(let i =0; i<cost.length; i++){
//         if(i%3 !== 2){
//             minCost += cost[i]
//         }
//     }

//     return minCost

// };



var minimumCost = function(cost) {

    cost.sort((a,b)=>b-a)

    let minCost = 0
    let freeI = 2

    for(let i =0; i<cost.length; i++){
        if(i==freeI){
            freeI +=3
            continue;
        } 
        minCost+=cost[i]
    }

    return minCost
};

/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    let n = landStartTime.length
    let m = waterStartTime.length;

    let result = Infinity
    for(let i = 0; i<n; i++){
        for(let j =0; j<m; j++){
            let landFinishTime = landStartTime[i] + landDuration[i]
            let finish = Math.max(landFinishTime, waterStartTime[j]) + waterDuration[j]
            result = Math.min(finish, result)
        }
    }
    
    for(let i = 0; i<m; i++){
        for(let j =0; j<n; j++){
            let waterFinish = waterStartTime[i] + waterDuration[i]
            let finish = Math.max(waterFinish, landStartTime[j]) + landDuration[j]
            
            result = Math.min(finish, result)
        }
    }


    return result
};

/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function (landStartTime, landDuration, waterStartTime, waterDuration) {

    let bestLandFinish = Infinity
    let bestWaterFinish = Infinity
    let answer = Infinity

    for (let i = 0; i < landStartTime.length; i++) {
        bestLandFinish = Math.min(bestLandFinish, landStartTime[i] + landDuration[i])
    }

    for (let i = 0; i < waterStartTime.length; i++) {
        let curr = Math.max(bestLandFinish, waterStartTime[i] ) + waterDuration[i]
        answer = Math.min(answer, curr)
    }

    for (let i = 0; i < waterStartTime.length; i++) {
        bestWaterFinish = Math.min(bestWaterFinish, waterStartTime[i] + waterDuration[i])
    }

    for (let i = 0; i < landStartTime.length; i++) {
        let curr = Math.max(bestWaterFinish, landStartTime[i]) + landDuration[i]
        answer = Math.min(answer, curr)
    }

    return answer

};

/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function (num1, num2) {

    let total = 0
    for (let num = num1; num <= num2; num++) {

        if (num < 100) continue;

        total += countWaviness(num)
    }

    return total
};

function countWaviness(num) {

    let numStr = String(num)
    let count = 0
    for (let i = 1; i < numStr.length - 1; i++) {
        //peak
        if (numStr[i] > numStr[i - 1] && numStr[i] > numStr[i + 1]) {
            count++

        }//valley
        else if (numStr[i] < numStr[i - 1] && numStr[i] < numStr[i + 1]) {
            count++
        }
    }

    return count
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function(nums) {
    let n = nums.length
    let leftSum = new Array(n)
    let rightSum = new Array(n)
    leftSum[0] = 0
    rightSum[n-1] = 0

    for(let i =1; i<n; i++){
        leftSum[i] = nums[i-1] + leftSum[i-1]
        rightSum[n-i-1] = nums[n-i] + rightSum[n-i]
      
    }

    let result = new Array(n)

    for(let i =0; i<n; i++){
        result[i] = Math.abs(leftSum[i] - rightSum[i])
    }

    return result
};
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxTotalValue = function (nums, k) {
    
    let max = -Infinity
    let min = Infinity

    for (let num of nums) {
        max = Math.max(max, num)
        min = Math.min(min, num)
    }

    return k * (max - min)
};

///

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function(arr) {
    let n = arr.length;
    let map = {};

    for(let i =0; i<n; i++){
        if(map[arr[i]] == undefined){
             map[arr[i]] = [i]
        }else{
            map[arr[i]].push(i)
        }
           
    }

    arr.sort((a,b) => a-b);
    let result = new Array(n).fill(-1)
    let rank = 1;

    for(let i =0; i<n; i++){
        if(i>0 && arr[i] == arr[i-1]) continue;

        for(let index of map[arr[i]]){
           
            result[index] = rank
        }

        rank++
    }
    


    return result
};


var sequentialDigits = function(low, high) {
    let q = []
    for(let i = 1; i<9; i++){
        q.push(i)
    }

    let result = [];

    while(q.length){
        let num = q.shift();

        if(num >= low && num<=high ){
            result.push(num);
        }

        let lastDigit = num % 10;
        
        if(lastDigit + 1 >=10) continue;

        num = (num * 10) + lastDigit+1;

        if(num <= high){
            q.push(num)
        }
    }

    return result;
}; 

/**
 * @param {number} n
 * @return {number}
 */

 var gcdOfOddEvenSums = function(n) {
    
    // n^2, n^2 + n => n * (n, n+1) and GCD of n, n+1 alsways be 1
    return n
};




// var gcdOfOddEvenSums = function(n) {
    
//     let oddSum = n*n;
//     let evenSum = (n*n) + n;

//     return GCD(oddSum, evenSum)
// };


// function GCD(a,b){
//     if(b == 0) return a;

//     return GCD(b, a%b)
// }




// var gcdOfOddEvenSums = function(n) {
    
//     let oddSum = 0;
//     let evenSum = 0;

//     for(let i = 1; i<=n+n; i++){
//         if(i%2==0){
//             evenSum += i
//         }else{
//             oddSum += i
//         }
//     }

//     return GCD(oddSum, evenSum)
// };


// function GCD(a,b){
//     if(b == 0) return a;

//     return GCD(b, a%b)
// }

/**
 * @param {number[]} nums
 * @return {number}
 */
var gcdSum = function (nums) {
    let n = nums.length;
    let prefixGcd = [];

    let mx = 0;

    for (let i = 0; i < n; i++) {
        mx = Math.max(mx, nums[i]);

        let gcd = GCD(mx, nums[i]);

        prefixGcd.push(gcd);
    }

    prefixGcd.sort((a, b) => a - b);

    let sum = 0;

    let i = 0;
    let j = n - 1;

    while (i < j) {
        sum += GCD(prefixGcd[i], prefixGcd[j]);
        i++;
        j--;
    }

    return sum
};


function GCD(a, b) {
    if (b == 0) return a;

    return GCD(b, a % b)
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function(nums) {
    
    let min = Infinity;
    let max = 0;

    for(let i = 0; i< nums.length; i++){
        min = Math.min(min, nums[i]);
        max = Math.max(max, nums[i]);
    }

    return GCD(min, max)
};


function GCD(a,b){
    if(b == 0)return a;

    return GCD(b, a%b)
}

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function(grid, k) {

    let n = grid.length;
    let m = grid[0].length;

    for(let i=0; i<k; i++){
        shift(grid, n, m)
    }

    return grid
};

function shift(grid, n, m){

    let temp = grid[0][0]

    for(let i =0; i<n; i++){
        let j = i == 0? 1:0
        for(j; j<m; j++){
            
            let currTemp = grid[i][j];
            grid[i][j] = temp;
            temp = currTemp;
           
        }
    }
  
    grid[0][0] = temp;

   
}
var maximumProduct = function(nums) {
    let max1 = -Infinity;
    let max2 = -Infinity;
    let max3 = -Infinity;

    let min1 = Infinity;
    let min2 = Infinity;

    for(let num of nums){
        if(num>max1){
            max3 = max2;
            max2 = max1;
            max1 = num
        }else if (num > max2){
            max3 = max2;
            max2 = num;
        }else if (num > max3){
            max3 = num;
        }

        if(num < min1){
            min2 = min1;
            min1 = num;
        }else if (num < min2){
            min2 = num;
        }
    }

    let ans = Math.max(max1 * max2 * max3, max1 * min1 * min2);

    return ans;
};

var smallestNumber = function(n, t) {
    
  while(true){
    let num = n
    let product = 1;
    while(num>0){
        let digit = num%10;
        num = Math.floor(num/10);
        product *= digit;
    }

    if(product%t == 0) return n;

    n++

  }  
};
/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */

var smallestNumber = function (num, t) {
    let temp = t;
    for (let i = 2; i <= 9; i++) {
        while (temp % i === 0) {
            temp /= i;
        }
    }
    if (temp > 1) {
        return "-1";
    }

    const n = num.length;
    const rem = new Array(n + 1);
    rem[0] = t;
    let pos = n - 1;

    const numArr = num.split("");
    for (let i = 0; i < n; i++) {
        if (numArr[i] === "0") {
            pos = i;
            break;
        }
        rem[i + 1] = Math.floor(rem[i] / gcd(rem[i], parseInt(numArr[i])));
    }

    if (rem[n] === 1) {
        return num;
    }

    for (let i = pos; i >= 0; i--) {
        while (true) {
            numArr[i] = String.fromCharCode(numArr[i].charCodeAt(0) + 1);
            if (numArr[i] > "9") {
                break;
            }

            let tNow = Math.floor(rem[i] / gcd(rem[i], parseInt(numArr[i])));
            let k = 9;

            for (let j = n - 1; j > i; j--) {
                while (tNow % k !== 0) {
                    k--;
                }
                tNow = Math.floor(tNow / k);
                numArr[j] = String.fromCharCode("0".charCodeAt(0) + k);
            }

            if (tNow === 1) {
                return numArr.join("");
            }
        }
    }

    let ans = [];
    let originalT = t;
    for (let i = 9; i > 1; i--) {
        while (originalT % i === 0) {
            ans.push(String.fromCharCode("0".charCodeAt(0) + i));
            originalT = Math.floor(originalT / i);
        }
    }

    const padding = Math.max(n + 1 - ans.length, 0);
    for (let i = 0; i < padding; i++) {
        ans.push("1");
    }

    return ans.reverse().join("");
};

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}


var missingInteger = function(nums) {
    let n = nums.length;
    let set = new Set(nums);
    
    let currPrefix = nums[0];

    for(let i =1; i<n; i++){
        if(nums[i] == (nums[i-1] + 1)){
            currPrefix += nums[i]
        }else{
            break;
        }
    }

    while(set.has(currPrefix)){
        currPrefix++
    }

    return currPrefix
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function(nums) {
    
    let currMinSub = nums[0];
    let minSub = nums[0];
    let currMaxSub = nums[0];
    let maxSub = nums[0];

    for(let i =1; i<nums.length; i++){

        currMinSub =  Math.min(nums[i], currMinSub + nums[i]);
        minSub = Math.min(currMinSub, minSub);

        currMaxSub = Math.max(nums[i], currMaxSub + nums[i]);
        maxSub = Math.max(currMaxSub, maxSub)
    }

    return Math.max(Math.abs(minSub), maxSub)
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function(nums, k) {
    let n = nums.length;
    if(n == k){
        let max = -1;

        nums.map((num)=>{
            max = Math.max(num, max)
        })

        return max
    }
    let map = {}
    for(let i =0; i<=n-k; i++){
        for(let j = i; j<i+k; j++){
            if(map[nums[j]] === undefined) map[nums[j]] = 0

            map[nums[j]]++
        }
    }

    let ans = -1

    for(let key in map){
        
        
        if(map[key] == 1){
        
            ans = Math.max(ans, Number(key) )
        }
    }

    return ans
};

/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {

    let map = {};
    let seats = [[2, 3, 4, 5], [4, 5, 6, 7], [6, 7, 8, 9]];

    for(let revSeat of reservedSeats){
        let row = revSeat[0];
        let seat = revSeat[1];

        if(map[row] == undefined) map[row] = new Set();

        map[row].add(seat)
    }

    let result = (n - Object.keys(map).length) * 2;

    for(let key in map){
        let row = key;
        let revSeats = map[key];
        
        function has(ele) { 
            return !revSeats.has(ele)
        } 

        let groupA = has(2) && has(3) && has(4) && has(5);
        let groupB = has(4) && has(5) && has(6) && has(7);
        let groupC = has(6) && has(7) && has(8) && has(9);
        
        if(groupA && groupC){
            result += 2;
        }else if (groupA || groupB || groupC){
            result += 1;
        }
    }

   return result;
};

/**
 * @param {number} n
 * @return {boolean}
 */
var checkDivisibility = function(n) {
    let nCopy = n
    let sum = 0;
    let product = 1;

    while(nCopy>0){
        let dig = nCopy%10;
        sum += dig;
        product *= dig;
        nCopy = Math.floor(nCopy/10)
    }

    let totalSum = sum + product
    
    if((n % totalSum) === 0 ) return true;

    return false

};

/**
 * @param {string} num
 * @return {boolean}
 */
/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    let n = num.length;

    let leftKnownSum = 0;
    let rightKnownSum = 0;

    let leftQnMarkCount = 0;
    let rightQnMarkCount = 0;

    for (let i = 0; i < n; i++) {

        if (num[i] === '?') {

            if (i < n / 2) {
                leftQnMarkCount++;
            } else {
                rightQnMarkCount++;
            }

        } else {

            if (i < n / 2) {
                leftKnownSum += Number(num[i]);
            } else {
                rightKnownSum += Number(num[i]);
            }

        }
    }

    let totalQnMarks = leftQnMarkCount + rightQnMarkCount;

    
    if (totalQnMarks % 2 === 1) {
        return true;
    }

    let LEFT = 2 * leftKnownSum + 9 * leftQnMarkCount;
    let RIGHT = 2 * rightKnownSum + 9 * rightQnMarkCount;

    
    if (LEFT === RIGHT) {
        return false;
    }

    return true;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingMultiple = function(nums, k) {
    let set = new Set(nums);

    let multiple = k;

    while(set.has(multiple)){
        multiple += k
    }

    return multiple
};

/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {
    let n = nums.length;
    
    let sortedArr = [...nums];
    
    sortedArr.sort((a,b) => b - a)
    
    let group = 0;
    let listMap = {};
    listMap[group] = [sortedArr[0]];

    let groupMap = {};
    groupMap[sortedArr[0]] = group;

    for(let i = 1; i<n; i++){
        if(Math.abs(sortedArr[i] - sortedArr[i-1]) > limit){
            group++;
        }

        if(listMap[group] == undefined) listMap[group] = []
        
        listMap[group].push(sortedArr[i])
        groupMap[sortedArr[i]] = group;
    }

    let answer = new Array(n).fill(-1);

    for(let i = 0; i<n; i++){
        let num = nums[i];

        let groupNo = groupMap[num];

        let elem = listMap[groupNo].pop();

        answer[i] = elem
    }

    return answer
};


/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeletions = function(nums) {
    let n = nums.length;

    let minIdx = -1;
    let min = Infinity
    let max = -Infinity;
    let maxIdx = -1;

    for(let i =0; i<n; i++){
        if(nums[i] < min){
            min = nums[i];
            minIdx = i;
        }

        if(nums[i] > max){
            max = nums[i];
            maxIdx = i;
        }
    }

    let leftSide = Math.min(maxIdx, minIdx);
    let rightSide = Math.max(maxIdx, minIdx);

    let diffEnd = (leftSide+1) + (n - rightSide);
    let left = rightSide + 1;
    let right = n-leftSide;

    return Math.min(diffEnd, left, right)
};


var uniformArray = function(nums1) {
    let n = nums1.length;

    let oddCount = 0;
    let evenCount = 0;
    let minOdd = Infinity;

    for(let num of nums1){
        if(num % 2 == 0){
            evenCount++
        }else{
            oddCount++
            minOdd = Math.min(num, minOdd)
        }
    }

    if(evenCount == n || oddCount == n) return true;


    for(let num of nums1){
        if(num % 2 == 0){
            if(num < minOdd) return false;
        }
    }

    return true;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function(nums, k) {
    let n  = nums.length;

    let maxArr = new Array(n);
    maxArr[0] = nums[0];

    for(let i = 1; i<n; i++){
        maxArr[i] = Math.max(maxArr[i-1], nums[i])
    }

    let minArr = new Array(n);
    minArr[n-1] = nums[n-1];

    for(let i = n-2; i>=0; i--){
        minArr[i] = Math.min(minArr[i+1], nums[i])
    }

    let minIdx = -1;

    for(let i =0; i<n; i++){

        if(maxArr[i] - minArr[i] <= k){
            minIdx = i;
            break;
        }
    }

    return minIdx;
};

let i = 0;
let j = 0;
let sum = 0;

while (j < nums.length) {
    sum += nums[j];

    while (sum >= target) {
        let s = j - i + 1;
        size.push(s);

        sum -= nums[i];
        i++;
    }

    j++;
}

// var countCommas = function(n) {

//     let prefix = [];

//     let max = 999999;
//     let min = 999;
//     prefix[0] = (max - min)
    
//     max = genNext(max)
//     min = genNext(min)
//     let idx = 1;
//     for(let i =2; i<5; i++){
        
//         prefix[idx] = ((max - min) * i) + prefix[idx-1] ;

//         max = genNext(max)
//         min = genNext(min)
//         idx++
//     }

//     let digitCount = countDigit(n)
    
    
//     if(n<999) return 0;

//     if(digitCount == 16){
//         return ((n - 999999999999999) * 5) + prefix[3]
//     }

//     if(digitCount > 12){
//         return ((n - 999999999999) * 4) + prefix[2]
//     }

//     if(digitCount > 9){
//         return ((n - 999999999) * 3) + prefix[1]
//     }

//     if(digitCount > 6){
//         return ((n - 999999) * 2) + prefix[0];
//     }

//     return ((n - 999))
// };

// function genNext(n){

//     for(let i = 0; i<3; i++){
//         n = (n * 10) + 9
//     }

//     return n
// }

// function countDigit(n){
//     let count = 0;

//     while(n>0){
//         n = Math.floor(n/10)
//         count++
//     }

//     return count
// }