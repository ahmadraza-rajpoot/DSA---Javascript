/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let result = []

    function backtrack(path, start){
        result.push([...path])
        for(let i = start; i<nums.length; i++){
            path.push(nums[i])
            backtrack(path, i+1)
            path.pop()
        }

    }
    backtrack([],0)
    
    return result;
};


// Combination

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  let result = []

  function backtrack(path, start){

    if(path.length == k){
        result.push([...path])
        return;
    }

    for(let i = start; i<=n; i++){
        path.push(i)
        backtrack(path, i+1)
        path.pop()
    }

  } 
  backtrack([],1) 

  return result;
};

// Permutation

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let n = nums.length;
    let result = []

    function backTrack(path){
        if(path.length === n){
            result.push([...path])
            return
        }

        for(let i = 0; i<nums.length; i++){
         
            if(!path.includes(nums[i])){
                path.push(nums[i])
                backTrack(path)
                path.pop()
            }
           
            
        }
    }
    backTrack([])

    return result;
};

//

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    let result = []
    nums.sort((a,b)=>a-b)

    function backtrack(path, start){

        result.push([...path])

        for(let i  = start; i<nums.length; i++){
            if( i > start && nums[i-1]===nums[i]) continue;

            path.push(nums[i])
            backtrack(path, i+1)
            path.pop()
        }
    }
    backtrack([],0)

    return result;
};


//

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(arr, target) {
    let result = []
    
    function backtrack(remainingSum, path, start){

        if(remainingSum === 0) result.push([...path])

        if(remainingSum <= 0 ) return;

        for(let i = start; i < arr.length; i++ ){
            path.push(arr[i])
            backtrack(remainingSum - arr[i], path, i)
            path.pop()

        }
    }

    backtrack(target, [], 0)

    return result;
};

//

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {

    let result = []

    function backtrack(remainingSum, path, start){

        if(path.length === k){
            if(remainingSum === 0) result.push([...path])
            return;
        }

        for(let i = start; i<=9; i++){
            path.push(i)
            backtrack(remainingSum - i, path, i+1)
            path.pop()
        }
    }

    backtrack(n, [], 1)

    return result
    
};


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(arr) {

    let result = []
    arr.sort((a,b)=>a-b)

    function backtrack(path, choices){

        if(path.length === arr.length){
            result.push([...path])
            return;
        }

        for(let i = 0; i<choices.length; i++){
            if(i>0 && choices[i]===choices[i-1]) continue;

            path.push(choices[i])
            backtrack(path, [...choices.slice(0,i), ...choices.slice(i+1)])
            path.pop()
        }

    }
    
    backtrack([], arr)

    return result;
    
};

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let result = false;

    let m = board.length;
    let n = board[0].length;

    function backtrack(x,y, nextIndex){
        
        if(nextIndex === word.length){
            result = true
        }

        let original = board[x][y]
        board[x][y] = "#"

        if( y<n-1 && board[x][y+1]===word[nextIndex]){
            backtrack(x,y+1, nextIndex+1)
        }

        if( y>0 && board[x][y-1]===word[nextIndex]){
            backtrack(x,y-1, nextIndex+1)
        }

        if( x < m-1 && board[x+1][y]===word[nextIndex]){
            backtrack(x+1,y, nextIndex+1)
        }

        if( x > 0 && board[x-1][y]===word[nextIndex]){
            backtrack(x-1,y, nextIndex+1)
        }

        board[x][y] = original


    }

    for(let i = 0; i<m; i++){
        for(let j = 0; j<n; j++){
            if(board[i][j]===word[0]){
                backtrack(i,j,1)
            }
        }
    }


    return result;
};

/**
 * @param {number} n
 * @return {string[][]}
 */

 // approach 2
var solveNQueens = function(n) {
    
    let result = []

    let board = [...Array(n)].map(()=>Array(n).fill("."))

    function backtrack(board, row, setCol, setDiag, setAntiDiag){

        if(row===n){
            result.push(transform(board))
        }
        
        for(let col = 0; col < n; col++){

            if(setCol.has(col) || setDiag.has(row-col)|| setAntiDiag.has(row+col)){
                continue;
            }

            board[row][col] = "Q"
            setCol.add(col)
            setDiag.add(row-col)
            setAntiDiag.add(row+col)
            
            backtrack(board, row+1, setCol, setDiag, setAntiDiag)

            board[row][col] = "."
            setCol.delete(col)
            setDiag.delete(row-col)
            setAntiDiag.delete(row+col)

        }
    }

    backtrack(board, 0, new Set(), new Set(), new Set())

    return result;
};

function transform(board){
    let newBoard = []
    for(let i = 0; i<board.length; i++){
        
        newBoard.push(board[i].join(""))
    }

    return newBoard
}





/// Approach #1
// var solveNQueens = function(n) {

//     let board = [...Array(n)].map(()=>Array(n).fill("."))

//     let result = []
    
//     function backtrack(board, row){
       
//         if(row>=n){
//           //  console.log(board)
//             let configBoard = []

//             for(let i = 0; i<board.length; i++){
//                 configBoard.push( [...board[i]].join("") )
//             }
//             result.push(configBoard)
          
//             return
//         }

//         for(let col = 0; col<n; col++){
            
//             if(isValid(board, row, col,n)){

//                 board[row][col] = "Q"

//                 backtrack(board, row+1)
                
//                 board[row][col] = "."

//             }
//         }
//     }

//     backtrack(board, 0)

//     return result
// };

// function isValid(board,row,col,n){
//     //upward attack
//     for(let i = row-1; i>=0; i--){
//         if(board[i][col] === "Q"){
//             return false
//         }
//     }
//     //right diagonal
//     for(let i = row-1, j = col+1; i>=0 && j<n; i--, j++ ){
//         if(board[i][j]=== "Q"){
//             return false
//         }
//     }
// left diagonal
//     for(let i = row-1, j = col-1; i>=0 && j>=0; i--, j--){
//         if(board[i][j]==="Q"){
//             return false
//         }
//     }

//     return true;

// }

/**
 * @param {number[]} digits
 * @return {number}
 */
var totalNumbers = function(digits) {
  let n = digits.length;
  let set = new Set();
  let visited = new Array(n).fill(false)

  subSet(0, [], digits, n, set, visited)
  
  return set.size;
};

function subSet(idx, arr, digits, n, set, visited){
    
    if(arr.length == 3){
        
        
        let num = Number(arr.join(""))
        
        set.add(num);

        return;
    }
    
    for(let i =0; i<n; i++){
        
        if(visited[i] == true) continue;
        if(arr.length == 0 && digits[i] == 0) continue;
        if(arr.length == 2 && digits[i] % 2 !== 0) continue;
        visited[i] = true;
        arr.push(digits[i]);
        subSet(i, arr, digits, n, set, visited);
        arr.pop();
        visited[i] = false
    }
}