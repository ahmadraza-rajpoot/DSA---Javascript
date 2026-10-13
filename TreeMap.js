
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
    this.size = 0;
  }

  put(key, val){
    let node = new Node(key, val);
    
    if(this.root == null){
      this.root = node;
      this.size++
      return
    }
    let isAdded = true;
    function add(root, node){

      if(node.key == root.key){
        root.val = node.val
        isAdded = false;
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

    if(isAdded === true){
      this.size++
    }
  }

    remove(key){
    
    if(this.root === null){
      return;
    }

    if(this.root.key === key){
      this.root = helper(this.root);
      this.size--;
      return;
    }
    
    let dummy = this.root;
    while(this.root !== null){
      
      if(this.root.key > key){
        
        if(this.root.left !== null && this.root.left.key === key){
          this.root.left = helper(this.root.left);
          this.size--;
          break;
        }else{
          this.root = this.root.left
        }
      }else{

        if(this.root.right !== null && this.root.right.key === key){
          this.root.right = helper(this.root.right);
          this.size--;
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



  firstKey(){

    let curr = this.root;
    
    if(curr === null) return null;

    while(curr.left !== null){
   
      curr = curr.left;
    }

    return curr.key
    
  }

  lastKey(){

    let curr = this.root;

    if(curr === null) return null;

    while(curr.right !== null){
    
      curr = curr.right;
    }

    return curr.key;
  }

  floorKey(key){

    let minKey = null;

    function traverse(curr, key){
      if(curr === null){
        return;
      }

      if(key < curr.key){
        traverse(curr.left, key)
      }else{
        minKey = curr.key;
        traverse(curr.right, key)
      }
    }

    traverse(this.root, key)

    return minKey
  }

  ceilKey(key){
    let maxKey = null;

    function traverse(curr, key){
      if(curr === null) return;

      if(key > curr.key){
        traverse(curr.right, key)
      }else{
        maxKey = curr.key;
        traverse(curr.left, key)
      }
    }

    traverse(this.root, key)

    return maxKey;
  }

  getSize(){
    return this.size;
  }

  clear(){
    this.size = 0;
    this.root = null;
  }

  isEmpty(){
    return this.size === 0
  }

  traverse(fn){

    function inOrder(root){
      if(root === null) return;
      inOrder(root.left);
      fn(root.key, root.val)
      inOrder(root.right)
    }

    
   inOrder(this.root)

  }

}


const treeMap = new TreeMap()
