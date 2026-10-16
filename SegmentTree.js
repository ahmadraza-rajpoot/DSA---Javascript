/*
Segment tree is useful for

    Efficient query of range/interval
    Efficient updationg of range/interval

*/


let nums = [1,4,8,3];
let n = nums.length;
let segmentTree = Array(n * 2).fill(-1)

function buildTree(i, l, r){

  if(l === r){
    segmentTree[i] = nums[r];
    return;
  }
  
  let mid = Math.floor((l + r) / 2)
  buildTree(2*i+1, l, mid);
  buildTree(2*i+2, mid+1, r);

  segmentTree[i] = segmentTree[2*i+1] + segmentTree[2*i+2]
}

buildTree(0, 0, n-1)
console.log(segmentTree)