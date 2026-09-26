/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function(s) {
    
    let temp = 0;
    let resCount = 0

    for(let i = 0; i<s.length; i++){
        if(s[i]=="R"){
            temp++;
        }
        if(s[i]=="L"){
            temp--
        }

        if(temp==0){
            resCount++
        }
    }
    return resCount;
};

// Valid Palidrom

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.toLowerCase()
    let rev= "";
    let filteredString = ""

    for(let i = 0; i<s.length; i++){
        if(s[i].match(/[a-z0-9]/i)){
            filteredString += s[i];
            rev = s[i] + rev
        }
    }

    return rev === filteredString
};



/**
 * @param {string} num
 * @return {string}
 */
var largestOddNumber = function(num) {
    for(let i = num.length; i>=0; i--){
        if(parseInt(num[i-1])%2!==0){
            return num.slice(0,i)
        }
    }

    return ""
};


/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
   let x = 0;
   while(x<strs[0].length){
    let ch = strs[0][x]
    for(let i = 1; i < strs.length; i++){
        if(ch !== strs[i][x] || x ==strs[i].length){
            return strs[0].substring(0,x)
        }
    }
    x++
   }
   return strs[0]
};




let s = "success";
let map = {}


for(let i = 0; i< s.length ; i++){
    if(map[s[i]]){
        map[s[i]]++
        
    }else{
        map[s[i]] = 1;
    }
}

let maxVowel = 0;
let maxCons = 0;
let keys = Object.keys(map)
console.log(Object.keys(map))

for(let i = 0; i<keys.length; i++){
    if('aeiou'.includes(keys[i])){
        if(maxVowel < map[keys[i]]){
            maxVowel = map[keys[i]]
        }
    }else{
        if(maxCons < map[keys[i]]){
            maxCons = map[keys[i]]
        }
    }
    
}

// console.log(map)
// console.log(maxVowel)
// console.log(maxCons)



let string = 'abcde'
let length = string.length
console.log(string.length/2)

for(let i = 0; i<string.length/2; i++){
    
    let temp = string[i]
    string[i]=string[length-i-1]
    string[length-i-1] = temp;
}

console.log(string)

string[2] = "s"

console.log(string)


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false

    let map = {}
    for(let i = 0; i< s.length; i++){
        if(!map[s[i]]){
            map[s[i]] = 1;
        }else{
            map[s[i]]++
        }
    }

    for(let i = 0; i< t.length; i++){
        if(!map[t[i]] || map[t[i]]<0){
            return false
        }else{
            map[t[i]]--
        }
    }

    return true;
};



var groupAnagrams = function(strs) {
    let map = {}
    for(let i = 0; i<strs.length; i++){
        let curr = strs[i].split("").sort().join("");

        if(!map[curr]){
            map[curr] = [strs[i]]
        }else{
            map[curr].push(strs[i]);
        }
    }

    return Object.values(map)
};

strs = ["eat","tea","tan","ate","nat","bat"]

let result = groupAnagrams(strs)


console.log(result)

/**
 * @param {string} s
 * @return {number}
 */
var numSteps = function (s) {
    let operation = 0;
    let carry = 0;

    for(let i = s.length - 1; i>0; i--){
        if(((s[i] - "0") + carry) % 2 == 1 ){
            operation += 2;
            carry = 1
        }else{
            operation++
        }
    }

    return operation + carry;

};



// var numSteps = function (s) {
//     let operation = 0;

//     while (s.length > 1) {

//         if (s[s.length - 1] == "0") {
//             s = pop(s)
//         } else {
//             s = handleOdd(s)
//         }
        
//         operation++
//     }

//     return operation

// };

// function pop(s) {
//     return s.slice(0, s.length - 1)
// }

// function handleOdd(s) {
//     let tempS = s.split("")
//     let i = s.length - 1
//     while (i >= 0) {
//         if (tempS[i] == "1") {
//             tempS[i] = "0"
//         } else {
//             tempS[i] = "1"
//             break;
//         }
//         i--
//     }

//     if (i < 0) {
//         tempS.unshift("1")
//     }

//     return tempS.join("")
// }


// var numSteps = function (s) {
//     let n = BigInt("0b" + s)
//     let count = 0n;

//     while (n !== 1n) {
//         count++
//         if (n % 2n == 0n) {
//             n = n / 2n
//         } else {
//             n = n + 1n
//         }
//     }

//     return Number(count);
// };


/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function (word) {
    let setLower = new Set()
    let setUpper = new Set()

    for (let ch of word) {
        if(ch.toLowerCase() == ch){
            setLower.add(ch)
        }

        if(ch.toUpperCase() == ch){
            setUpper.add(ch)
        }
        
    }

    let count = 0
    for(let ch of setLower){
        if(setUpper.has(ch.toUpperCase())) count++
    }

    return count
};

var numberOfSpecialChars = function(word) {
    let lastSmall = new Array(26).fill(-1);
    let firstCapital = new Array(26).fill(-1);

    for (let i = 0; i < word.length; i++) {
        let ch = word[i];

        if (ch >= 'a' && ch <= 'z') {
            lastSmall[ch.charCodeAt(0) - 97] = i;
        } else {
            if (firstCapital[ch.charCodeAt(0) - 65] === -1) {
                firstCapital[ch.charCodeAt(0) - 65] = i;
            }
        }
    }

    let count = 0;

    for (let i = 0; i < 26; i++) {
        if (
            lastSmall[i] !== -1 &&
            firstCapital[i] !== -1 &&
            lastSmall[i] < firstCapital[i]
        ) {
            count++;
        }
    }

    return count;
};

var mapWordWeights = function(words, weights) {
    let map = {}
    for(let i =25; i>=0; i--){
        map[i] = String.fromCharCode((97+25)-i)
    }

    let result = ""

    for(let word of words){
        let weight = 0
        for(let i = 0; i<word.length; i++){
            let index = word[i].charCodeAt() - 97
            weight += weights[index]
        }
        let charIdx = weight % 26
        result += map[charIdx]
    }
    
    return result
};

/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function (s) {
    let n = s.length;
    let lastIdx = new Array(26).fill(-1);
    let used = new Array(26).fill(false);
    let stack = [];

    for (let i = 0; i < n; i++) {
        let idx = s[i].charCodeAt(0) - 97;
        lastIdx[idx] = i
    }

    for (let i = 0; i < n; i++) {
        let chIdx = s[i].charCodeAt(0) - 97


        if (used[chIdx] == true) continue;

        while (stack.length && stack[stack.length - 1].charCodeAt(0) - 97 > chIdx && lastIdx[stack[stack.length - 1].charCodeAt(0) - 97] > i) {
            used[stack[stack.length - 1].charCodeAt(0) - 97] = false;
            stack.pop()
        }

        stack.push(s[i])
        used[chIdx] = true
    }



    return stack.join("")
};


var smallestPalindrome = function(s) {
    let n = s.length;
    if(n == 1) return s;

    let alphaFreq = new Array(26).fill(0);

    for(let i =0; i<n; i++){
        let idx = s[i].charCodeAt(0) - 97
        alphaFreq[idx]++
    }

    let m = ""
    
    for(let i =0; i<26; i++){
        if(alphaFreq[i]%2 !== 0){
            m = String.fromCharCode(i+97);
           alphaFreq[i]--
            break;
        }
    }



    let lexAlpha = "";
    for(let i = 0; i<26; i++){
        if(alphaFreq[i] > 0){
            let ch = String.fromCharCode(i + 97)
            for(let j = 0; j<alphaFreq[i]; j++){
                lexAlpha+=ch
            }
        }
    }
   
    let s1 = ""
    let s2 = []
    let s1Try = true

    for(let i =0; i<n; i++){

        if(s1Try && lexAlpha[i] !== undefined){
            s1 += lexAlpha[i]
        }else{
            s2.push(lexAlpha[i]) 
        }

        s1Try = !s1Try
        
    }

    reverse(s2)

    let ans = m == ""? s1 + s2.join(""):s1 + m + s2.join("")

    return ans
};


function reverse(arr){
    let i =0; 
    let j = arr.length - 1;

    while(i<j){
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp;

        i++;
        j--;
    }
}

/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    let n = word.length;
    let result = 0;

    let add = 0;
    let count = 0;
    for(let i =0; i<n; i++){
        
        
        if(count == 8){
            add++;
            count = 0;
        }
        count++

        result += add + 1
    }

    return result;
};




// var minimumPushes = function(word) {
//     let result = 0;

//     let start = 2;
//     let add = 1


//     for(let c of word){
//         if(start>9){
//             start = 2
//             add++
//         }
        
//         result += add

//         start++

//     }
    

//     return result;
// };

/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    let freq = new Array(26).fill(0);

    for(let s of word){
        let idx = s.charCodeAt(0) - 97
        freq[idx]++
    }
    freq.sort((a,b) => b-a)
    console.log(freq)

    let ans = 0;
    let mul = 1;
    let count = 0;

    for(let i = 0; i<26; i++){

        if(freq[i] == 0) break;

        if(count == 8){
            mul++;
            count=0
        }
        count++
        ans += freq[i] * mul
    }

    return ans
    
};

/**
 * @param {string} s
 * @return {number}
 */
var countValidPrefixes = function(s) {
    let preS = "";
    let count = 0;
    for(let ch of s){
        preS += ch;

        if(isValid(preS)) count++
    }

    console.log(count);

    return count
};

function isValid(s){
    let zeroCount = 0;
    let oneCount = 0;

    for(let ch of s){
        if(ch == "0"){
            zeroCount++;
        }else{
            oneCount++;
        }
    }

    return Math.abs(zeroCount - oneCount) <= 1
}

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function(word1, word2) {
    let n = word1.length;
    let m = word2.length;

    let rightSideMatchChar = new Array(n).fill(0);

    let i = n-1;
    let j = m-1;
    let matchCount = 0;
    while(i>=0){
        if( j>=0 && word1[i] == word2[j]){
            matchCount++;
            j--;
        }

        rightSideMatchChar[i] = matchCount;
        i--;
    }

    let canChange = true;
    let result = [];
    i =0;
    j =0;

    while(i<n && j<m){
        
        if(word1[i] == word2[j]){
            result.push(i);
            j++;
        }else if(canChange && i+1 < n && rightSideMatchChar[i+1] >= m-j-1){
            result.push(i);
            j++;
            canChange = false;
        }

        i++;
    }
    
    return  j == m?  result : [];
};

var shortestBeautifulSubstring = function(s, k) {
    let n = s.length;

    let i = 0;
    let count = 0;

    let best = "";

    for (let j = 0; j < n; j++) {

        if (s[j] === "1") {
            count++;
        }

        
        while (count > k) {
            if (s[i] === "1") {
                count--;
            }
            i++;
        }


        if (count === k) {

            while (s[i] === "0") {
                i++;
            }

            let current = s.substring(i, j + 1);

            if (
                best === "" ||
                current.length < best.length ||
                (current.length === best.length && current < best)
            ) {
                best = current;
            }
        }
    }

    return best;
};


var findRepeatedDnaSequences = function(s) {
    let n = s.length;
    let K = 10;

    if(n <= K) return []


    let seen = new Set();
    let result = new Set();

    let map = {
        A:1,
        C:2,
        G:3,
        T:4
    }
    let x = K-1
    let currHash = 0
    for(let i = 0; i<K; i++){
        let ch = s[i];
        currHash += map[ch] * Math.pow(10,x-i)
    }

    seen.add(currHash)
    
    let i =0;
    let j = K

    while(j<n){
        let ch = s[i]
        currHash -= map[ch] * Math.pow(10, x);
        currHash *= 10;
        currHash += map[s[j]];

        if(seen.has(currHash)){
           
            let seq = s.substring(i+1, j+1)
            result.add(seq)
        }

        seen.add(currHash);
        i++;
        j++
    }

    return Array.from(result)
};

/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function (s, knowledge) {
    let n = s.length;
    let map = {};

    for (let info of knowledge) {

        map[info[0]] = info[1]
    }

    let i = 0;
    let result = ""
    while (i < n) {

        let ch = s[i];

        if(ch === "("){
            let [idx, value] = getValue(i+1, s, map)
           
            result += value;
            i=idx
        }else{
            result += ch;
            i++
        }
       
    }

    return result
};

function getValue(i, s, map){
    let key = ""
    while(s[i] !== ")"){
        key += s[i];
        i++
    }
    let val = map[key];

    if(val == undefined) return [i+1, "?"]

    return [i+1, val]
    
}
