/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var twoSum = function(nums, target) {
  let map = {}

  for(let i = 0; i < nums.length; i++){
        map[nums[i]] = i
  }  
  
  for (let i = 0; i<nums.length; i++){
      let ans = target - nums[i]
      if(map[ans] && map[ans]!==i){
          return [i, map[ans]]
      }
  }
  
};

//


/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    
    let p1 = 0
    let p2 = numbers.length - 1;

    for(let i = 0; i<numbers.length; i++){
        if(numbers[p1]+numbers[p2]===target){
            return [++p1, ++p2]
        }else if(numbers[p1]+numbers[p2]>target){
            p2--
        }else{
            p1++
        }
    }
};


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    if(s.length==0 && t.length==0) return true
    let i = 0;
    let j = 0;

    while(j<t.length){
        if(s[i]===t[j]){
            i++
            j++
        }else{
            j++
        }

        if(i==s.length) return true
    }

    return false
};


// cann't work on any substring problem


/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
   
    let i = 0;
    let j = 0;

    while(i<haystack.length){
        
        if(haystack[i]==needle[j]){
            i++
            j++
        }else{
            if(j>0){
                j=0;
            }else{
                i++
            }
        }
        
        if(j==needle.length) {
                console.log(i-j)
                return i-j
            }
    }

    return -1

};

/// TWo pointer linked list intersection solution

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let pA = headA
    let pB = headB

    while(pA!=pB){
        pA = pA == null? headB: pA.next;
        pB = pB == null? headA: pB.next
    }

    return pA
};

// container with more water

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(arr) {
    let maxWater = 0;
    let i = 0;
    let j = arr.length - 1
    while(i<j){
        let currWater = Math.min(arr[i],arr[j]) * (j-i)
        maxWater = Math.max(currWater,maxWater)

        if(arr[i]<arr[j]){
            i++
        }else{
            j--
        }

    }

    return maxWater
};


// longest substring


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let p1 = 0;
    let p2 = 0;
    let map = new Map();
    let max = 0;

    while(p2<s.length){
        if(map.has(s[p2]) && map.get(s[p2])>= p1 ){
            p1 = map.get(s[p2]) + 1
        }

        let currMax = p2 - p1 + 1
        max = Math.max(currMax, max);
        map.set(s[p2], p2)
        p2++
    }

    return max
};


//

var characterReplacement = function(s, k) {
    let i = 0;
    let j = 0;
    let maxLen = 0;
    let map = {}
    map[s[0]] = 1
    
    
    while(j<s.length){
       
        if(isValid(map,k)){
            maxLen = Math.max(maxLen, j-i+1)
            j++
            (map[s[j]])?map[s[j]]+=1:map[s[j]] = 1
        }else{
            map[s[i]]--
            i++
        }

    }

    return maxLen
};

var isValid = function(map,k){
    let totalCount = 0;
    let max = 0;

    for(let i = 0; i<26;i++){
        let char = String.fromCharCode(i+65)
        if(map[char]){
            totalCount += map[char]
            max = Math.max(max, map[char])
        }
    }

    return totalCount - max <= k
}

///


/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    
    if(n===1||n===2||n===3) return n

    let a = 1;
    let b = 2;
    let c = 0;
    for(let i = 3; i<=n; i++){
        c = a + b
        a = b;
        b = c
    }

    return c
};

//

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(arr, k) {
    let i = 0;
    let j = 0;

    let q = []
    let res = []

    while(j<arr.length){

        while(q.length && arr[j]> q[q.length - 1]){
            q.pop()
        }
        
        q.push(arr[j])

        if(j>=k-1){
            res.push(q[0])

            arr[i]==q[0] && q.shift()
            i++
        }

        j++
    }

    return res
};


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var getCommon = function(nums1, nums2) {

    let i = 0;
    let j = 0;

    while(i < nums1.length && j < nums2.length){

        if(nums1[i] == nums2[j]) return nums2[j]
        else if(nums1[i] < nums2[j]){
            i++
        }else{
            j++
        }
    }

    return -1
};


var countValidSubstrings = function(s) {
    
    let n = s.length;
    let left = 0;
    let count = 0;

    for (let right = 0; right < n; right++) {

       
        if (
            right >= 2 &&
            s[right - 2] === 'a' &&
            s[right - 1] === 'b' &&
            s[right] === 'c'
        ) {
            left = right - 1;
        }

      
        count += right - left + 1;
    }

    return count;
};©leetcode
