class Node{
  constructor(val=null){
    this.val = val;
    this.left = null;
    this.right = null;
  }
}


class BST{
  
  constructor(){
    this.root = null
  }

  add(val){
    let node = new Node(val)

    if(this.root == null){
      this.root = node
      return
    }
    
    function solve(root, node){

      if(node.val < root.val){
         if(root.left === null){
           root.left = node
         }else{
           solve(root.left, node)
         }
      }else{

        if(root.right == null){
          root.right = node
        }else{
          solve(root.right, node)
        }
      }
        
    }

    solve(this.root, node)
    
  }

  
}


const bst = new BST()
bst.add(1)
bst.add(2)
bst.add(3)

console.log(bst)