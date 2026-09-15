/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
    let l = 1;
    let r = n;

    while(l<=r){
        let m = l + Math.floor(((r-l)/2))
        let res = guess(m)
        if(res===0){
            return m
        }else if(res === -1){
            r = m-1;
        }else{
            l = m+1;
        }
    }
};


///

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let l = 1;
        let r = n;
        while(l<r){
            let m = l + Math.floor((r-l)/2)
            let isBad = isBadVersion(m)

            if(!isBad){
                l = m+1
            }else{
                r = m
            }
        }
        
        return r
    };
};

///

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let l = 0;
    let r = nums.length - 1;

    while(l<r){
        let m = l + Math.floor((r-l)/2)

        if(nums[m]< nums[m+1]){
            l = m+1;
        }else{
            r = m;
        }
    }

    return r
};


///

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(arr) {
    
    let l = 0;
    let r = arr.length - 1;

    while(l<=r){
        if(arr[l]<=arr[r]){
            return arr[l]
        }

        let m = l + Math.floor((r-l)/2)

        if(arr[m]<arr[m-1]){
            return arr[m]
        }

        if(arr[l]>arr[m]){
            r = m-1; 
        }else{
            l = m+1
        }
    }
};

//



/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function(arr) {
    let l = 0;
    let r = arr.length - 1;

    while(l<r){
        let m = l + Math.ceil((r-l)/2)

        if(arr[m-1]>arr[m]){
            r = m-1
        }else{
            l=m
        }
    }

    return l
};

//

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function(arr, k, x) {

    let l = 0; 
    let r = arr.length - 1;

    while(l<r){
        let m = l + Math.floor((r-l)/2);
        if((arr[m+k]-x) < (x-arr[m])){
            l = m+1;
        }else{
            r = m
        }
    }    

   return arr.slice(l, l+k)
};


// Binary Search Implementation


class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

   

class BST{
    constructor(){
        this.root = null;
    }


    isEmpty(){
        return this.root === null
    }

    insertNode(val){
        let node = new Node(val)
        if(this.root == null){
            this.root = node;
            return;
        }

        this.#addChild(this.root, node)
    }

    #addChild(root, node){
        if(root.val > node.val){

            if(root.left == null){
                root.left = node;
                
            }else{
                this.#addChild(root.left, node)
            }

        }else{
            
            if(root.right == null){
                root.right = node;
            }else{
                this.#addChild(root.right, node)
            }

        }
    }

    preOrder(){
        function traversal(root){
            if(root == null) return;

            console.log(root.val);
            traversal(root.left);
            traversal(root.right)
        }

        traversal(this.root)
    }
}

const bst = new BST();

bst.insertNode(3);
bst.insertNode(2);
bst.insertNode(10);
bst.insertNode(30);
