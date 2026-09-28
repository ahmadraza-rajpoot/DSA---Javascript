
    var MyStack = function() {
        this.stack = []
    };

    /** 
    * @param {number} x
    * @return {void}
    */
    MyStack.prototype.push = function(x) {
        this.stack.push(x)
    };

    /**
    * @return {number}
    */
    MyStack.prototype.pop = function() {
        return this.stack.pop()
    };

    /**
    * @return {number}
    */
    MyStack.prototype.top = function() {
        return this.stack[this.stack.length - 1]
    };

    /**
    * @return {boolean}
    */
    MyStack.prototype.empty = function() {
        let length = this.stack.length
        return length<1
        
    };

    /** 
    * Your MyStack object will be instantiated and called as such:
    * var obj = new MyStack()
    * obj.push(x)
    * var param_2 = obj.pop()
    * var param_3 = obj.top()
    * var param_4 = obj.empty()
    */

// let mystack = new MyStack();
// mystack.push(2)
// mystack.push(2)
// console.log(mystack.pop())
// console.log(mystack.pop())
// console.log(mystack.top())
// console.log(mystack.empty())



// Implementation of stack using one queue



    var MyStack = function() {
        this.q = []
    };

    /** 
    * @param {number} x
    * @return {void}
    */
    MyStack.prototype.push = function(x) {
        this.q.push(x)
    };

    /**
    * @return {number}
    */
    MyStack.prototype.pop = function() {
        let n  = this.q.length
        for(let i = 0; i<n-1; i++){
            this.q.push(this.q.shift())
        }
        return this.q.shift()
    };

    /**
    * @return {number}
    */
    MyStack.prototype.top = function() {
        let n = this.q.length
        
        for(let i = 0; i<n-1; i++){
            this.q.push(this.q.shift())
        }
        let lastEle = this.q[0];
        this.q.push(this.q.shift())
        

        return lastEle
    };

    /**
    * @return {boolean}
    */
    MyStack.prototype.empty = function() {
        let length = this.q.length
        return length<1
    };

    /** 
    * Your MyStack object will be instantiated and called as such:
    * var obj = new MyStack()
    * obj.push(x)
    * var param_2 = obj.pop()
    * var param_3 = obj.top()
    * var param_4 = obj.empty()
    */



var MyQueue = function() {
    this.s = []
    this.s2 = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.s.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if(this.s2.length === 0){
        while(this.s.length){
            this.s2.push(this.s.pop())
        }
    }

    return this.s2.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if(this.s2.length===0){
        while(this.s.length){
            this.s2.push(this.s.pop())
        }
    }

    return this.s2[this.s2.length - 1]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {

    return this.s.length==0 && this.s2.length==0;
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */


/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    let map = {
        "(":")",
        "{":"}",
        "[":"]"
    }

    for(let i = 0; i<s.length; i++){
        if(map[s[i]]){
            stack.push(s[i])
        }else{
            let top = stack.pop()
           if( !top || map[top] !== s[i] ){
            return false
           }
        }
    }
    
    return stack.length == 0
};

// let s = "([]{}){"
// console.log(isValid(s))


var MinStack = function() {
    this.stack = []
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    let ele = this.stack[this.stack.length-1]
  
    if(!ele){
        
        let element = {
            val: val,
            min: val
        }
        this.stack.push(element)

    }else{
        let min = val
        let element = {}

        if(min<ele.min){
            element.val = val,
            element.min = min
        }else{
            element.val = val,
            element.min = ele.min
        }

        this.stack.push(element)
    }
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
   let element = this.stack.pop()
   return element.val;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
   let element = this.stack[this.stack.length - 1];
    return element && element.val;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    let  element = this.stack[this.stack.length - 1]
    
    return element && element.min
};


var obj = new MinStack()

// obj.push(-2)
// obj.push(0)
// obj.push(-3)
// console.log(obj)
// console.log(obj.getMin())
// obj.pop()
// console.log(obj.top())
// console.log(obj.getMin())


//

/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function(s) {
    let level = 0
    let result = ""
    for(let i=0; i<s.length; i++){
        if(s[i]=="("){
            level++
            result += level>1?s[i]:""
            
        }else{
            result += level>1?s[i]:""
            level--
        }       
    }

  return  result
};

let digits = [1,9]

let n = digits.length - 1
let carry = 0;
let sum = 0;

for(let i = n; i>=0; i--){
    sum = digits[i] + 1

    if(sum>9){
        carry = 1;
        digits[i] = 0;
    }else{ 
        digits[i] = sum;
        carry = 0;

    }
}

if(carry==1){
    digits.unshift(1)
}







//


var repeatedNTimes = function(nums) {
    let n = nums.length/2
    let map = {}
    let curr = nums[0]

    for(let i =1; i<nums.length; i++){
        if(curr == nums[i]){
            return curr
        }else{
            curr = nums[i]
        }
    }
    
};

let num = [5,1,5,2,5,3,5,4]

console.log(repeatedNTimes(num))

let s = new Set()
let size = 0;

for(let i = 0; i<num.length; i++){
    
    if(size==s.size){
        return num[i]
    }else{
        size = s.size;
    }
    
}

//console.log(s)

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    let stack = [];
    let map = {
        "+":(a,b)=>a+b,
        "-":(a,b)=> b-a,
        "/":(a,b)=> Math.trunc(b/a),
        "*":(a,b)=> a * b,
        }
    for(let i = 0; i< tokens.length; i++){
        if(!map[tokens[i]]){
            stack.push(Number(tokens[i]))
        }else{
            let num1 = stack.pop();
            let num2 = stack.pop();
            let result = map[tokens[i]](num1,num2)
            stack.push(result)
        }
    }

    return stack.pop()
};



function findNextGreater(arr){
 
    let n = arr.length - 1;
    let stack = [arr[n]];
    let map = {}
    map[arr[n]] = -1
    
    for(let i = n-1; i>=0; i--){
        let top = stack[stack.length - 1]
        if(arr[i]<top){
            map[arr[i]] = top;
            
        }else{
            for(let j = 0; j<stack.length; j++){
                let top = stack[stack.length - 1]
                
                if(arr[i]<top){
                    map[arr[i]] = top;
                    stack.push(arr[i])
                    break;
                }else{
                    if(stack.length === 0){
                        map[arr[i]] = -1;
                    }else{
                        stack.pop()
                    }
                    
                }
            }
            

        }
    }

    return map;
}

let arr = [17,5,0,3,4,9,2,6,8]

console.log(findNextGreater(arr))


/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

var dailyTemperatures = function(temperatures) {
    let stack = []
    let n = temperatures.length - 1
    let result = new Array(n+1).fill(0)
    stack.push(n)
    
    for(let i = n-1; i>=0; i--){
        while(stack.length){
            let top = stack[stack.length-1]
            if(temperatures[i]<temperatures[top]){
                
                let dayCount = top - i
                result[i] = dayCount
                break;
            }else{
                stack.pop()
            }
        }

        stack.push(i)
        
    }
    
    return result;
};

function merge(arr1,arr2){
let result = []

let p1 = 0;
let p2 = 0;

for(let i = 0; i<arr1.length + arr2.length; i++){
    if( p2>=arr2.length ||  (arr1[p1]>arr2[p2] && p1<arr1.length)){
        result.push(arr1[p1]);
        p1++
    }else{
        result.push(arr2[p2])
        p2++
    }
}

return result;
}
let k1 = [3]
let k2 = [1,2]
console.log(merge(k1,k2))


function mergeSort(nums){
    if(nums.length<=1) return nums
    
    let mid = nums.length/2
    let left = mergeSort(nums.slice(0,mid));
    let right = mergeSort(nums.slice(mid))
    
    return merge(left,right)
}


let n1 = [1,2,3]
let nums =String(n1)

//console.log(mergeSort(nums))

/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function(s) {
    let n = s.length;
    let set = new Set();
    set.add("(")
    set.add(")")

    let stack = [];
    let max = 0;
    for(let i =0; i<n; i++){

        if(!set.has(s[i])) continue;

        if(s[i] == "("){
            stack.push("(")
        }else{
            max = Math.max(max, stack.length);
            stack.pop()
        }
    }

    return max;
};