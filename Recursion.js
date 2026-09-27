/*

Recursion => funtion calls it self to solve smaller part
of problem.

Parts of Recursion

1) Base case: Stop condition(where recursion stop)
2) recursive case: part of function need to be recursive

*/


// print n to 1 through recursion

function print(n){
    if(n<1) return;
  //  console.log(n);
    n = n-1;
    print(n)
}

// sum of all n numbers 

function sumOfn(n){
    if(n===0) return 0;
    return n + sumOfn(n-1)
}

//console.log(sumOfn(15))

// find the n is power of 2

function powerOfTwo(n){
   // console.log(n)
    if(n==1) {
        return true;
    }

    if(n<1) return false;

    
   return powerOfTwo(n/2)
}
let n = 4
//console.log(powerOfTwo(n))


// sum of all element in array

let arr = [2,3,4,7]

function sum(n){
    if(n===0) return arr[n];

    return arr[n] + sum(n-1);
}

//console.log(sum(arr.length-1))



// sum of all odd numbers in array

function sumOdd(n){
    if(arr[n]%2!=0){
        if(n===0) return arr[n];

        return arr[n] + sumOdd(n-1)
    }else{
        if(n===0) return arr[n];
        return sumOdd(n-1)
    }
}

//console.log(sumOdd(arr.length-1))


//let f = 3

function factorial(f){
    if(f==0)return 1;
    
    return f * factorial(f-1)
}

//console.log(factorial(f))

// Fibonacchi Series

let p = 0;
let s = 1;
let f = p + s;

for(let i = 1; i<=5; i++){
    f = p + s
    
    p = s;
    s = f;
    //console.log(f)
}

//console.log(f)


function fib(n){
    if(n<=1) return n;

    return fib(n-1) + fib(n-2);
}

console.log(fib(5))


var search = function(nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while(right>=left){
        let mid = Math.floor((left+right)/2);
        if(nums[mid]===target){
            return mid
        }else if(nums[mid]<target){
            left = mid + 1;
        }else{
            right = mid - 1
        }
    }
    
    return -1;
};


/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function(arr, start) {
   return solve(arr, start)
};

function solve(arr, i){
    if(i<0 || i>=arr.length || arr[i]<0) return false

    if(arr[i] == 0) return true

    arr[i] *= -1

    let a = solve(arr, i + arr[i])
    let b = solve(arr, i- arr[i])

    return a || b
}

/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function(arr) {
    let n = arr.length;
    let map = {}

    for(let i =0; i<n; i++){
        if(map[arr[i]] !== undefined){
            map[arr[i]].push(i)
        }else{
            map[arr[i]] = [i]
        }
    }

    let visited = new Array(n).fill(false)
    visited[0] = true
    let q = []
    q.push(0)
    let steps = 0

    while(q.length){
        let size = q.length

        while(size--){
            let temp = q.shift()

            if(temp == n-1) return steps

            let x = temp + 1;
            let y = temp - 1;

            if(x>=0 && x<n && visited[x] !== true){
                q.push(x)
                visited[x] = true 
            }

            if(y>=0 && y<n && visited[y] !== true){
                q.push(y)
                visited[y] = true
            }

            for(let j of map[arr[temp]]){
                if(visited[j] !== true){
                    q.push(j)
                    visited[j] = true
                }
            }

           map[arr[temp]] = []
        }
        steps++
    }

    return -1
};

function bString(s, n, prev){
  
    if(s.length == n){
        console.log(s)
        return
    }
    
    bString(s+"1", n, "1")
    
    if(prev !== "0"){
        bString(s+"0", n, "0")
    }

        
    
}
bString("",3,"1")

function bString(s, n, prev) {
    if (s.length === n) {
        console.log(s);
        return;
    }

    // always can place '1'
    bString(s + "1", n, "1");

    // place '0' only if previous is not '0'
    if (prev !== "0") {
        bString(s + "0", n, "0");
    }
}

bString("", 3, "1");




// bString("",3,2, 0)

// let dp

// function bString(s, n, k, count, prev) {
//     if (s.length === n) {
//         console.log(s);
//         return;
//     }
//     // always take 0
//     bString(s + "0", n, k, count, "0");

//     // take 1 only if:
//     // 1. prev is not '1'
//     // 2. count < k
//     if (prev !== "1" && count < k) {
//         bString(s + "1", n, k, count + 1, "1");
//     }
// }

// bString("", 3, 2, 0, "0");

/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {

    let n = s.length;

    function solve(i, s, n) {

        let str = ""

        while (i < n) {

            if (s[i] == "(") {

                let [j, newS] = solve(i + 1, s, n);
                i = j;
                str += newS

            } else if (s[i] == ")") {
                return [i + 1, rev(str)]
            } else {
                str += s[i];
                i++
            }
        }

        return str
    }

    return solve(0, s, n)
};

function rev(str) {
    let arr = str.split("");

    let i = 0;
    let j = arr.length - 1;

    while (i < j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp
        i++;
        j--;
    }

    return arr.join("")
}