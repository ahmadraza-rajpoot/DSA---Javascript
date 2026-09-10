// PreOrderTraversal

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {

    let result = []

    function preTraversal(curr){
        if(!curr) return;
        result.push(curr.val)
        preTraversal(curr.left)
        preTraversal(curr.right)
    }    
    preTraversal(root)

    return result
};


// Iterative approach
var preorderTraversal = function(root) {
    if(!root) return []

    let stack = [root]
    let result = []

    while(stack.length){
        let curr = stack.pop()
        
        result.push(curr.val)

        curr.right && stack.push(curr.right)
        curr.left && stack.push(curr.left)
    }

    return result;
};
// Inorder traversal


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

 // Iterative approach
var inorderTraversal = function(root) {
    let stack = []
    let result = []
    let curr = root

    while(curr || stack.length){
        while(curr){
            stack.push(curr)
            curr = curr.left;
        }
        curr = stack.pop()
        result.push(curr.val)
        curr = curr.right
    }

    return result;
};


// Recursive Approach

// var inorderTraversal = function(root) {
//     let result = []

//     function traversal(curr){
//         if(!curr) return
//         traversal(curr.left)
//         result.push(curr.val)
//         traversal(curr.right)
//     }

//     traversal(root)

//     return result
// };




 // Iterative approach using one stack
var postorderTraversal = function(root) {
    let stack = []
    let result = []
    let curr = root
    let lastVisited = null;

    while(curr || stack.length){

        while(curr){
            stack.push(curr)
            curr = curr.left;
        }

        let peak = stack[stack.length-1]

        if(peak.right && peak.right != lastVisited){
            curr = peak.right
        }else{
            result.push(peak.val);
            lastVisited = stack.pop()
        }
    }

    return result;
    
};

// Level order traversal


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return [];

    let q = [root]
    let result = []

    while(q.length){
        let levelRes = []
        let level = q.length;

        for(let i = 0; i<level; i++){
            let curr = q.shift()
            curr.left && q.push(curr.left)
            curr.right && q.push(curr.right)
            levelRes.push(curr.val)
        }

        result.push(levelRes)
    }

    return result;
};


// Daily quest

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minBitwiseArray = function(nums) {
    let result = []

    for(let i = 0; i<nums.length; i++){

        let found = false
        for(let x = 0; x<nums[i]; x++){
            if((x | x+1) == nums[i]){
                result.push(x)
                found = true;
                break;
            }
        }

        if(found===false){
            result.push(-1)
        }
    }

    return result
};


// maximum depth of binary tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 // top to bottom approach
var maxDepth = function(root) {
    if(!root) return 0;

    let leftTree = maxDepth(root.left);
    let rightTree = maxDepth(root.right);

    return 1 + Math.max(leftTree,rightTree)
};




// top to bottom approach
// var maxDepth = function(root) {

//     if(!root) return 0;
    
//     let maxDepth = 0;
//     function traversal(curr, depth){

//         if(!curr) return;

//         maxDepth = Math.max(maxDepth, depth)

//         traversal(curr.left, depth+1)
//         traversal(curr.right, depth+1)

//     }

//     traversal(root,1)

//     return maxDepth
// };

// 

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    
    function isMirror(left, right){
        if(!left && !right) return true;
        if(!left || !right) return false;

        return (left.val===right.val) &&
                isMirror(left.left, right.right) &&
                isMirror(left.right, right.left) 
    }
    
    return isMirror(root.left, root.right)
};


///


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    let ans = true;
    function CalculateHeight(curr){
        if(!curr) return 0;
        let leftHeight = CalculateHeight(curr.left);
        let rightHeight = CalculateHeight(curr.right);

        if(Math.abs(leftHeight - rightHeight) > 1){
            ans = ans && false
        }

        return 1 + Math.max(leftHeight, rightHeight)
    }

    CalculateHeight(root)

    return ans;
};

//

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if(!root) return []
    let result = []
    function traverse(node,level){
        if(!result[level]) result[level] = []
        if(level%2==0){
            result[level].push(node.val)
        }else{
            result[level].unshift(node.val)
        }
        
        node.left && traverse(node.left, level+1);
        node.right && traverse(node.right, level+1);
    }
    traverse(root,0)
    
    return result;
};




// Iterative approach;

// var zigzagLevelOrder = function(root) {
//     if(!root) return []
//     let ans = [];
//     let level = 0;
//     let q = [root];

//     while(q.length){
//         let levelArr = [];
//         let levelSize = q.length;

//         for(let i =0; i<levelSize; i++){
//             let curr = q.shift()
//             if(level%2==0){
//                 levelArr.push(curr.val)
//             }else{
//                 levelArr.unshift(curr.val)
//             }

//             curr.left && q.push(curr.left)
//             curr.right && q.push(curr.right)
//         }

//         ans.push(levelArr);
//         level++
//     }

//     return ans;
// };



//

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let LCA = null;

    function traversal(curr){
        let count = 0;
        if(!curr) return 0;

        let leftTree = traversal(curr.left);
        let rightTree = traversal(curr.right);

        if(curr.val == q.val || curr.val == p.val){
            ++count;
        }

        count = count + leftTree + rightTree;

        if(count == 2 && !LCA){
            LCA = curr
        }

        return count;

    }
    traversal(root)

    return LCA
};

//
 // level order traversal with recursion (classic)
var levelOrder = function(root) {
    if(!root) return []
    let result = []

    function traverse(queue){
        if(queue.length===0) return;
       // if(!result[level]) result[level] = []
        let nextQueue = []
        for(let node of queue){
            result.push(node.val)
            node.left && nextQueue.push(node.left)
            node.right && nextQueue.push(node.right)
        }
        
        traverse(nextQueue)
    }

    traverse([root])

    console.log(result)
    return [[]]
};


//

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if(!root) return []
    let result = []
    let q = [root]
    function traverse(que){

       if(que.length==0) return;

       let nextQueue = []

       for(let i = 0; i<que.length; i++){
            let node = que[i]
            i==0 && result.push(node.val)

            node.right && nextQueue.push(node.right)
            node.left && nextQueue.push(node.left)       
       }

       traverse(nextQueue) 
    }
    traverse(q)
    return result
};

//

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function(root) {
    if(!root) return root;

    function traverse(curr){

        if(curr.left)
            curr.left.next = curr.right

        if(curr.right && curr.next)
            curr.right.next = curr.next.left

        curr.left && traverse(curr.left)
        curr.right && traverse(curr.right)
    }
    traverse(root)

    return root;
};

//

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
    let maxSum = -Infinity;

    function traverse(curr){

        if(!curr) return 0;
        let leftSum = Math.max(0, traverse(curr.left))
        let rightSum = Math.max(0, traverse(curr.right))

        let currMax = curr.val + leftSum + rightSum
        maxSum = Math.max(currMax, maxSum)

        return curr.val + Math.max(leftSum, rightSum)
    }

    traverse(root)

    return maxSum;
    
};

// Binary Search Tree


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {

    let ans = null

    function traverse(curr){
        if(curr.val === val){
            ans = curr
           
        } else if(curr.val < val){
            curr.right && traverse(curr.right)
        }
        else{
            curr.left && traverse(curr.left)
        }
        
    }
    traverse(root)
    

    return ans
    
};


//

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let ans = null
    let count = k

    function traverse(curr){
       
            if(ans != null) return;

           curr.left && traverse(curr.left)

            count--
            if(count == 0){
                ans = curr.val
            }
            
           curr.right && traverse(curr.right)
        
    }
    traverse(root)
    
    return ans
};

//

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if(p.val < root.val && q.val < root.val){
        return lowestCommonAncestor(root.left, p, q)
    }else if( p.val > root.val && q.val > root.val){
        return lowestCommonAncestor(root.right, p, q)
    }else{
        return root
    }
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function (nodes) {
    let treeNodes = new Map()
    let childSet = new Set()

    for (let node of nodes) {
        let [p, c, isLeft] = node

        if (!treeNodes.has(p)) {
            treeNodes.set(p, new TreeNode(p))
        }

        if (!treeNodes.has(c)) {
            treeNodes.set(c, new TreeNode(c))
        }

        let parent = treeNodes.get(p)
        let child = treeNodes.get(c)

        if (isLeft == 1) {
            parent.left = child
        } else {
            parent.right = child
        }

        childSet.add(child.val)
    }
    let root = null
    for(let node of nodes){
        if(!childSet.has(node[0])){
            root = treeNodes.get(node[0])
            break;
        }
    }
    
    return root
};


var averageOfSubtree = function(root) {
    let result = 0;

    function postOrder(root){
        if(!root) return [0,0];

        let leftSide = postOrder(root.left);
        let rightSide = postOrder(root.right);

        let totalSum = leftSide[0] + rightSide[0] + root.val;
        let totalCount = leftSide[1] + rightSide[1] + 1;

        let avg = Math.floor(totalSum/totalCount)

        if(avg == root.val){
            result++
        } 

        return [totalSum, totalCount]
    }


    postOrder(root)

    return result;
};