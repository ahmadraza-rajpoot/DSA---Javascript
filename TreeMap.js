
class Node{
  constructor(key=null, val=null){
    this.key = key;
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class TreeMap{

  constructor(){
    this.root = null;
  }

  put(key, val){
    let node = new Node(key, val);

    if(this.root == null){
      this.root = node;
      return
    }

    function add(root, node){

      if(node.key == root.key){
        root.val = node.val
      }
      else if(node.key < root.key){
        if(root.left == null){
          root.left = node;
        }else{
          add(root.left, node)
        }
      }else{

        if(root.right == null){
          root.right = node;
        }else{
          add(root.right, node)
        }

      } 
    }

    add(this.root, node);
  }

  get(key){

    function traverse(root){

      if(root === null) return undefined;
      
      if(root.key === key){
        return root.val;
      } 
      else if(key < root.key){
       return traverse(root.left)
      }else{
        return traverse(root.right)
      }
      
    }

    return traverse(this.root)
  }

  has(key){
    function traverse(root){
      if(root === null) return false;

      if(root.key === key ){
        return true;
      }else if (key < root.key){
        return traverse(root.left)
      }else{
        return traverse(root.right)
      }
    }

    return traverse(this.root)
  }

  remove(key){
    
    if(this.root == null){
      return;
    }

    if(this.root.key === key){
      this.root = helper(this.root);
      return;
    }
    
    let dummy = this.root;
    while(this.root !== null){
      
      if(this.root.key > key){
        
        if(this.root.left !== null && this.root.left.key === key){
          this.root.left = helper(this.root.left)
          break;
        }else{
          this.root = this.root.left
        }
      }else{

        if(this.root.right !== null && this.root.right.key === key){
          this.root.right = helper(this.root.right)
          break;
        }else{
          this.root = this.root.right
        }
      }
    }
   
    this.root = dummy;
    

    function helper(root){
      if(root.left === null){
        return root.right;
        
      }else if(root.right === null){
        return root.left
      }

      let rightChild = root.right;
      let lastRightChild = findLastRightChild(root.left);
      
      lastRightChild.right = rightChild
      return root.left;
    }

    function findLastRightChild(root){
      if(root.right === null){
        return root
      }

      return findLastRightChild(root.right)
    }
  }

  traverse(){

    function inOrder(root){
      if(root == null) return;
      inOrder(root.left);
      console.log(root.key, root.val)
      inOrder(root.right)
    }

    
   inOrder(this.root)

  }

}


const treeMap = new TreeMap()

treeMap.put(1,"one")
treeMap.put(0, "zero")
treeMap.put(2, "Two")
treeMap.put(1,"again")
treeMap.put(5,"working")


treeMap.traverse()

console.log('________________')
treeMap.remove(0)
treeMap.traverse()
