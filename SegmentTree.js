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



function updateTree(idx, val, i, l , r){

  if(l == r){
    segmentTree[i] = val;
    return;
  }
  let mid = Math.floor((l + r)/ 2);

  if(idx <= mid){
    updateTree(idx, val, (2*i+1), l, mid )
  }else{
    updateTree(idx, val, (2*i+2), mid+1, r)
  }

  segmentTree[i] = segmentTree[2*i+1] + segmentTree[2*i+2]
}


updateTree(1, 10, 0, 0, n-1)



function searchTree(s, e, i, l, r){

  if(e < l || r < s){
    return 0;
  }

  if (s <= l && r <= e) {
    return segmentTree[i];
  }

  let mid = Math.floor((l + r)/2);

  return searchTree(s, e, i*2+1, l, mid) +  searchTree(s, e, i*2+2, mid+1, r);
}


let res = searchTree(1,3, 0, 0, n-1)