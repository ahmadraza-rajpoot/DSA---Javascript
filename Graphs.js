/*
Graphs are data structures that represent relationship or connection between objects

*/



/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    if(!node) return null;

    let q = [node];
    let cloneNode = new Node(node.val)
    let visited = new Map()
    visited.set(node, cloneNode)

    while(q.length){
        let curr = q.shift()

        for(n of curr.neighbors){
            if(!visited.has(n)){
                q.push(n)
                visited.set(n, new Node(n.val))
            }

            let currClone = visited.get(curr)
            currClone.neighbors.push(visited.get(n))
        }
    }

    return cloneNode
};

// DFS

/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    if(!node) return null;

    let stack = [node];
    let cloneNode = new Node(node.val);
    let visited = new Map();
    visited.set(node, cloneNode)

    while(stack.length){
        let curr = stack.pop()
        for(let n of curr.neighbors){

            if(!visited.has(n)){
                stack.push(n)
                visited.set(n, new Node(n.val))
            }

            let currClone = visited.get(curr)
            currClone.neighbors.push(visited.get(n))
        }
    }

    return cloneNode;
};
//

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function(n, edges, source, destination) {
    if(n == 1) return true
    let map = {};

    for(let [x,y] of edges){
        if(!map[x]) map[x] = [];
        if(!map[y]) map[y] = [];
        map[x].push(y);
        map[y].push(x);
    }

    let q = [source];
    let visited = new Set();
    visited.add(source)

    while(q.length){
        let curr = q.shift()

        if(curr === destination) return true

        for(let neighbor of map[curr]){
            if(!visited.has(neighbor)){
                q.push(neighbor);
                visited.add(neighbor)
            }
        }
    }

    return false;
};


 // Recursive DFS
var validPath = function(n, edges, source, destination) {
    if(n == 1) return true
    let map = {};

    for(let [x,y] of edges){
        if(!map[x]) map[x] = [];
        if(!map[y]) map[y] = [];
        map[x].push(y);
        map[y].push(x);
    }

    let visited = new Set();

    function DFS(curr){
        visited.add(curr);
        if(curr == destination) return true;

        for(let neighbor of map[curr]){
            if(!visited.has(neighbor)){

               if(DFS(neighbor)) return true;
                
            }
        }

        return false;

    }

    return DFS(source)
    
};


//

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {

    let graph = {};

    for(let [from, to] of tickets){
        if(!graph[from]) graph[from] = [];
        graph[from].push(to);
    }

    for(let path in graph){
        graph[path].sort();
    }

    let path = []; 

    function dfs(curr){

        let destinations = graph[curr] || []

        while(destinations.length){
            let neighbor = graph[curr].shift();
            dfs(neighbor)
        }

        path.unshift(curr)
    }

    dfs("JFK");

    return path
    
};

//


function topologicalSortKahn(n, graph) {
  // your solution here
  let indegree = new Array(n).fill(0)

  for (let i = 0; i < n; i++) { 
    for (let node of graph[i]) { 
      indegree[node]++
    }
  }

  let q = [];
  let ans = [];

  for (let i = 0; i < indegree.length; i++) { 
    if (indegree[i] == 0) { 
      q.push(i)
    }
  }

  ///

  while (q.length) { 
    let curr = q.shift();
    ans.push(curr)

    for (let neighbor of graph[curr]) {
      indegree[neighbor]--;
      if (indegree[neighbor] == 0) {
        q.push(neighbor);
      }
    }
  }
  console.log(ans)
  if (ans.length !== n) return "Cycle detected — Topological Sort not possible";
return ans
}

module.exports = { topologicalSortKahn };


// shortest path distantance in unweighted graph - BFS

// function shortestDistance(graph, src) {
//   // your solution here
//   let n = graph.length;
//   let distArr = new Array(n).fill(Infinity);
//   distArr[src] = 0;
//   let q = [src];
  

//   while (q.length) {
//     let curr = q.shift();

//     for (let neighbor of graph[curr]) {
//       if (distArr[neighbor] === Infinity) { 
//         distArr[neighbor] = distArr[curr] + 1;
//         q.push(neighbor);
//       }
//     }
//   }

//   return distArr;
// }

// module.exports = { shortestDistance };


// let graph = [[1,2], [3], [4],[5],[3],[]]
// let src = 0;



// Dijistra's shortest distance algorithm MinHeap (pq) + Greedy


class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }

    size() {
        return this.heap.length;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    push(pair) {
        this.heap.push(pair);
        this.heapifyUp();
    }

    heapifyUp() {
        let i = this.heap.length - 1;

        while (
            i > 0 &&
            this.heap[i][0] < this.heap[this.parent(i)][0]
        ) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }

    heapifyDown() {
        let i = 0;

        while (true) {
            let smallest = i;
            let left = this.left(i);
            let right = this.right(i);

            if (
                left < this.heap.length &&
                this.heap[left][0] < this.heap[smallest][0]
            ) {
                smallest = left;
            }

            if (
                right < this.heap.length &&
                this.heap[right][0] < this.heap[smallest][0]
            ) {
                smallest = right;
            }

            if (smallest !== i) {
                this.swap(i, smallest);
                i = smallest;
            } else {
                break;
            }
        }
    }
}


function dijistra(graph, src) { 
    let n = graph.length;
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    let pq = new MinHeap();
    pq.push([src, dist[src]]);

    while (pq.size()) { 
        let [currNode, currWeight] = pq.pop();

        if (dist[currNode] < currWeight) continue;

        for (let [neighbor, weight] of graph[currNode]) { 
            let newDist = dist[currNode] + weight;

            if (newDist < dist[neighbor]) { 
                dist[neighbor] = newDist;
                pq.push([neighbor, newDist])
            }
        }

    }

    return dist;

}


const graph = [
    [[1, 2], [2, 4]],
    [[3, 7], [2, 1]],
    [[4, 3], [5, 1]],
    [[6, 1]],
    [[3, 2], [6, 5]],
    [[3, 3], [6, 8]],
    []
];
console.log(dijistra(graph, 0));


//
// class MinHeap{
//     constructor(){
//         this.heap = [];
//     }
    
//     getLeftChild(i){
//         return ((2 * i) + 1)
//     }
    
//     getRightChild(i){
//         return ((2 * i) + 2)
//     }
    
//     getParentIndex(i){
//         return Math.floor((i-1)/2);
//     }
    
//     insert(val){
        
//         this.heap.push(val);
//         let lastIndex = this.heap.length - 1;
//         this.heapifyUp(lastIndex);
//     }
    
//     heapifyUp(i){
//         while(i>0){
//             let parentIndex = this.getParentIndex(i)
            
//             if(this.heap[i][1]<this.heap[parentIndex][1]){
//                 [this.heap[i], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[i]];
                
//                 i = parentIndex;
//             }else{
//                 break;
//             }
//         }
//     }
    
//     extract() {

//         if (this.heap.length == 0) return null;
//         if (this.heap.length == 1) return this.heap.pop();
        
//         let min = this.heap[0]
//         this.heap[0] = this.heap[this.heap.length - 1]
//         this.heap.pop()
        
//         this.heapifyDown(0)
        
//         return min
//     }
    
//     heapifyDown(i){
//         let left = this.getLeftChild(i)
//         let right = this.getRightChild(i)
//         let n = this.heap.length
//         let smallest = i
//        // console.log("work")
//         if(left < n && this.heap[smallest][1] > this.heap[left][1]){
            
//             smallest = left
//         }
        
//         if(right < n && this.heap[smallest][1] > this.heap[right][1]){
            
//             smallest = right
//         }
        
//         if(smallest != i){
//             [this.heap[i], this.heap[smallest]] = [this.heap[smallest],this.heap[i]]
            
//             this.heapifyDown(smallest)
//         }
//     }

//     size() { return this.heap.length}
    
// }

// function dijistra(graph, src) { 
//     let n = graph.length;
//     let dist = new Array(n).fill(Infinity);

//     dist[src] = 0

//     let pq = new MinHeap();

//     pq.insert([src, 0]);

//     while (pq.size()) { 
//         let [node, nodeWeight] = pq.extract();

//         if (nodeWeight > dist[node]) continue;

//         for (let [neighbor, nWeight] of graph[node]) { 
//             let newWeight = nWeight + dist[node];
//             if (newWeight < dist[neighbor]) { 
//                 dist[neighbor] = newWeight;
//                 pq.insert([neighbor, newWeight])
//             }
//         }
//     }

//     return dist;

// }


// const graph = [
//     [[1, 2], [2, 4]],
//     [[3, 7], [2, 1]],
//     [[4, 3], [5, 1]],
//     [[6, 1]],
//     [[3, 2], [6, 5]],
//     [[3, 3], [6, 8]],
//     []
// ];

// console.log(dijistra(graph, 0));


// Bellman Ford algorithm

function bellmanFord(edges, V, src) { 
    let dist = new Array(V).fill(Infinity);
    dist[src] = 0

    for (let i = 0; i < V - 1; i++) { 
        let updated = false;
        for (let [u, v, w] of edges) { 

            if ( dist[u] != Infinity && dist[u] + w < dist[v]) { 
                dist[v] = dist[u] + w;
                updated = true;
            }
        }

        if (!updated) break;
    }

    for (let [u, v, w] of edges) { 
        if (dist[u] != Infinity && dist[u] + w < dist[v]) { 
            console.log("Negative cycle detected!")
            return null
        }
    }

    return dist;
}



// const edges = [
//     [0, 1, 6],
//     [0, 2, 5],
//     [0, 3, 5],
//     [1, 4, -1],
//     [2, 1, -2],
//     [2, 4, 1],
//     [3, 2, -2],
//     [3, 5, -1],
//     [4, 6, 3],
//     [5, 6, 3]
// ];

const edges = [
    [0, 1, 4],
    [1, 2, -1],
    [2, 3, 2],
    [3, 1, 0]
]

let V = 4;

console.log(bellmanFord(edges, V, 0))

// Floyd Warshall Algorithm for finding all pairs shortest distance

function floydWarshall(V, edges){
    let dist = Array.from({length:V}, (_,i)=>{
        return Array.from({length:V}, (_,j)=>{
            if(i==j){
                return 0
            }else{
                return Infinity;
            }
        })
    })
    
    for(let [i,j,w] of edges){
        dist[i][j] = w
    }
    
    for(let k = 0; k<V; k++){
        for(let i = 0; i<V; i++){
            for(let j = 0; j<V; j++){
                dist[i][j] = Math.min(dist[i][k] + dist[k][j], dist[i][j])
            }
        }
    }
    
   // console.log(dist)
    
    return dist
    
}


// const edges = [
//     [0, 1, 2],
//     [1, 0, 7],
//     [1, 2, 3],
//     [2, 1, 8],
//     [2, 3, 2],
//     [3, 0, 1],
//     [3, 1, 5]
// ];

console.log(floydWarshall(4, edges));


// prim's MST algorithm

function primMST(n, graph){
    
    let visited = new Array(n).fill(false);
    let pq = new MinHeap();
    pq.insert([0,0]);
    
    let mstCost = 0;
    
    let nodesVisited = 0;

    while (nodesVisited < n) {
        let [node, weight] = pq.extract();
    
        if (visited[node]) continue;
    
        visited[node] = true;
        nodesVisited++;
        mstCost += weight;
    
        for (let [next, w] of graph[node]) {
            if (!visited[next]) pq.insert([next, w]);
        }
    }
    
    return mstCost;
    
}


// const graph = [
//     [[1,2],[3,1], [4,4]],
//     [[0,2],[3,3], [2,3], [5,7]],
//     [[1,3],[3,5],[5,8]],
//     [[0,1], [4,9], [2,5], [1,3]],
//     [[0,4], [3,9]],
//     [[1,7], [2,8]]
// ];

console.log(primMST(6, graph));

// const graph = [
//     [[1, 4], [2, 2], [3, 5]],
//     [[0, 4], [3, 1]],
//     [[0, 2], [3, 3]],
//     [[1, 1], [2, 3]]
// ];

// console.log(primMST(4, graph));


// Kruskal's algorithm to find MST cost

class UnionFind{
    constructor(n){
        this.parent = new Array(n).fill(0).map((_,i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    find(x){
        if(x !== this.parent[x]){
            this.parent[x] = this.find(this.parent[x])
        }
        return this.parent[x]
    }
    
    union(x,y){
        let rootX = this.find(x);
        let rootY = this.find(y);
        
        if(rootX == rootY) return false;
        
        if(this.rank[rootX] > this.rank[rootY]){
            this.parent[rootY] = rootX
        }else if(this.rank[rootY] > this.rank[rootX]){
            this.parent[rootX] = rootY;
        }else{
            this.parent[rootY] = rootX;
            this.rank[rootX]++
        }
        
        return true;
        
    }
    
}

function Kruskal(n, edges){
    
    edges.sort((a,b)=> a[2]-b[2])
    let uf = new UnionFind(n)
    let mstCost = 0
    let edgeUsed = 0
    for(let [x,y,w] of edges){
        if(uf.union(x,y)){
            mstCost += w;
            edgeUsed++
            if(edgeUsed == n-1) break;
        }
    }
    
    return mstCost;
    
}


// const edges = [
//     [0, 1, 4], [0, 2, 4], [1, 2, 2],
//     [2, 3, 3], [2, 5, 2], [2, 4, 4],
//     [3, 4, 3], [5, 4, 3]
// ];

console.log(Kruskal(6, edges));

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {

    if (connections.length < n - 1) return -1;
    let graph = Array.from({ length: n }, () => []);
    for (let [from, to] of connections) {
        graph[from].push(to)
        graph[to].push(from)
    }

    let visited = new Array(n).fill(false)
    let noOfConnections = 0;
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            noOfConnections++
            bfs(i, visited, graph)
        }
    }

    return noOfConnections - 1

};

function bfs(src, visited, graph) {

    let queue = [src]
    visited[src] = true

    while (queue.length) {
        let curr = queue.shift()
        for (let neighbor of graph[curr]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor)
            }
        }
    }

}


//

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {

    let graph = Array.from({ length: n }, () => [])

    for (let [from, to, price] of flights) {
        graph[from].push([to, price])
    }


    let minCost = new Array(n).fill(Infinity);
    minCost[src] = 0

    let q = [[src, 0, 0]]

    while (q.length) {
        let [curr, cost, stops] = q.shift();
        if (stops > k) continue;

        for (let [neighbor, neighborPrice] of graph[curr]) {
            let newPrice = cost + neighborPrice

            if (newPrice < minCost[neighbor]) {
                minCost[neighbor] = newPrice
                q.push([neighbor, newPrice, stops + 1])
            }
        }
    }

    return minCost[dst] === Infinity ? -1 : minCost[dst]
};


/**
 * @param {number[][]} edges
 * @return {number}
 */
var assignEdgeWeights = function(edges) {
    const MOD = 1_000_000_007n;
    const n = edges.length + 1;
    
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    let maxDepth = 0;
    const depth = new Array(n + 1).fill(-1);
    const queue = [1];
    depth[1] = 0;
    
    while (queue.length > 0) {
        const node = queue.shift();
        maxDepth = Math.max(maxDepth, depth[node]);
        for (const neighbor of adj[node]) {
            if (depth[neighbor] === -1) {
                depth[neighbor] = depth[node] + 1;
                queue.push(neighbor);
            }
        }
    }
    
    const pow = (base, exp, mod) => {
        let result = 1n;
        base = base % mod;
        while (exp > 0n) {
            if (exp % 2n === 1n) result = result * base % mod;
            base = base * base % mod;
            exp /= 2n;
        }
        return result;
    };
    
    return Number(pow(2n, BigInt(maxDepth - 1), MOD));
};


/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var assignEdgeWeights = function(edges, queries) {
    const MOD = 1000000007n;
    const n = edges.length + 1;
    const LOG = Math.ceil(Math.log2(n + 1)) + 1;

    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const depth  = new Int32Array(n + 1).fill(-1);
    const parent = new Int32Array(n + 1).fill(0);
    depth[1] = 0;
    const queue = [1];

    for (let i = 0; i < queue.length; i++) {
        const node = queue[i];
        for (const nb of adj[node]) {
            if (depth[nb] === -1) {
                depth[nb]  = depth[node] + 1;
                parent[nb] = node;
                queue.push(nb);
            }
        }
    }

    const up = Array.from({ length: LOG }, () => new Int32Array(n + 1));
    for (let v = 1; v <= n; v++) up[0][v] = parent[v];
    for (let k = 1; k < LOG; k++) {
        for (let v = 1; v <= n; v++) {
            up[k][v] = up[k - 1][up[k - 1][v]];
        }
    }

    
    const lca = (u, v) => {
        
        if (depth[u] < depth[v]) [u, v] = [v, u];
        let diff = depth[u] - depth[v];
        for (let k = 0; k < LOG; k++) {
            if ((diff >> k) & 1) u = up[k][u];
        }
        if (u === v) return u;
        
        for (let k = LOG - 1; k >= 0; k--) {
            if (up[k][u] !== up[k][v]) {
                u = up[k][u];
                v = up[k][v];
            }
        }
        return up[0][u];
    };

    
    const maxPow = n + 1;
    const pow2 = new Array(maxPow);
    pow2[0] = 1n;
    for (let i = 1; i < maxPow; i++) {
        pow2[i] = pow2[i - 1] * 2n % MOD;
    }

    
    const answer = new Array(queries.length);
    for (let i = 0; i < queries.length; i++) {
        const [u, v] = queries[i];
        if (u === v) {
            answer[i] = 0;
            continue;
        }
        const l = lca(u, v);
        const d = depth[u] + depth[v] - 2 * depth[l]; 
        
        answer[i] = Number(pow2[d - 1]);
    }

    return answer;
};


let graph = [[0,1], [1,2],[2,0]]

let adj = {}

for(let [u,v] of graph){
    if(adj[u] == undefined) adj[u] = [];
    if(adj[v] == undefined) adj[v] = [];
    
    adj[u].push(v)
}

console.log(adj)

let V = 3

let visited = new Array(V).fill(false)
let inRecursion = new Array(V).fill(false)




function isCycle(u,adj,visited,inRecursion){
    visited[u] = true;
    inRecursion[u] = true;
    
    for(let v of adj[u]){
        if(visited[v] == false){
            
            if( isCycle(v,adj,visited,inRecursion) ){
                return true;
            }
        }
        
        else if(inRecursion[v] == true) return true
    }
    
    inRecursion[u] = false;
    return false;
}


for(let i = 0; i<V; i++){
    
    if(!visited[i] && isCycle(i,adj,visited,inRecursion)){
        console.log("cycle is detected")
    }
    
}
let graph = [[0,3], [0,2], [2,1], [2,3], [3,1], [5,1], [5,4], [1,4]];

let inDegree = new Array(6).fill(0)


let adj = {}

for(let [u,v] of graph){
    
    if(adj[u] == undefined) adj[u] = []
    if(adj[v] == undefined) adj[v] = []
    
    adj[u].push(v)
}

console.log(adj)

for(let u = 0; u<6; u++){
    for(let v of adj[u]){
        inDegree[v]++
    }
}

console.log(inDegree)


let queue = []

for(let i = 0; i<6; i++){
    if(inDegree[i] == 0) queue.push(i)
}

console.log(queue)

let result = []
while(queue.length){
    let u = queue.shift();
    result.push(u)
    
    for(let v of adj[u]){
        inDegree[v]--;
        
        if(inDegree[v] == 0){
            queue.push(v)
        }
    }
}

console.log(result)

let graph = [[0,1], [0,2], [1,3], [2,3], [3,4], [4,5]]

let adj = {}
for(let [u,v] of graph){
    if(adj[u] == undefined) adj[u] = []
    if(adj[v] == undefined) adj[v]= []
    
    adj[u].push(v)
}

console.log(adj)

let V = 6;

let inDegree = new Array(V).fill(0);

for(let u in adj){
    for(let v of adj[u]){
        inDegree[v]++
    }
}


let queue = []

for(let i =0; i<inDegree.length; i++){
    if(inDegree[i] == 0) queue.push(i)
}


let front = 0

let count = 0;
while(front < queue.length){
    let u = queue[front++]
   
    console.log(u)
    count++
    
    for(let v of adj[u]){
        inDegree[v]--
        
        if(inDegree[v] == 0){
            queue.push(v)
        }
    }
}

if(count == V) console.log(false)
else console.log(true)

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
    let n = isConnected.length;
    let adj = {};

    for (let i = 0; i < n; i++) {
        if (adj[i + 1] == undefined) adj[i + 1] = []

        for (let j = 0; j < n; j++) {
            if (i == j) continue;

            if (isConnected[i][j] == 1) {
                adj[i + 1].push(j + 1)
            }
        }
    }

    let visited = new Array(n + 1).fill(false)
    let count = 0
    for (let i = 1; i <= n; i++) {
        if (visited[i] == false) {
            DFS(i, adj, visited);
            count++
        }
    }

    return count
};

function DFS(u, adj, visited) {

    visited[u] = true;

    for (let v of adj[u]) {
        if (visited[v] === false) {
            DFS(v, adj, visited)
        }
    }
}

var findCircleNum = function (isConnected) {
   let n =  isConnected.length;
   let adj = {};

   for(let i =0; i<n; i++){
        adj[i+1] = []
        for(let j = 0; j<n; j++){
            if(i == j) continue;

            if(isConnected[i][j] == 1){
                adj[i+1].push(j+1)
            }
        }
   }

   let visited = new Array(n+1).fill(false);
   let count = 0;

   for(let i = 1; i<=n; i++){
        if(visited[i] == false){
            bfs(i, adj, visited);
            count++
        }
   }

   return count;
};

function bfs(start, adj, visited){
    let queue = []
    queue.push(start)
    visited[start] = true;

    while(queue.length){
        let u = queue.shift();
        visited[u] = true

        for(let v of adj[u]){
            if(!visited[v]){
                queue.push(v)
            }
        }
    }
}



var findOrder = function (numCourses, prerequisites) {
    let V = numCourses;
    let adj = {};
    let inDegree = new Array(V).fill(0);

    for (let [u, v] of prerequisites) {

        if (adj[v] == undefined) adj[v] = [];

        adj[v].push(u)
        inDegree[u]++
    }

    
    let queue = [];

    for (let i = 0; i < V; i++) {
        if (inDegree[i] == 0) queue.push(i)
    }

    let result = []
    while (queue.length) {
        let u = queue.shift();
        result.push(u);

        for (let v of adj[u] || []) {
            inDegree[v]--
            if (inDegree[v] == 0) {
                queue.push(v)
            }
        }
    }


    if (result.length == V) {
        return result
    }


    return []
};

let graph = [ [1, 2], [2, 3],[3, 4],[4, 5],[5, 1]]
let adj = {};

for(let [u,v] of graph){
    if(adj[u] == undefined) adj[u] = [];
    if(adj[v] == undefined) adj[v] = [];
    
    adj[u].push(v);
}

let colors = new Array(5).fill(-1);

let isBipartite = true
for(let i = 1; i<5; i++){
    
    if(colors[i] == -1){
        if(dfs(i, adj, colors, 1) == false){
            isBipartite = false;
            break;
        }
    }
}

console.log(isBipartite)


function dfs(u, adj, colors, currColor){
    colors[u] = currColor;
    
    for(let v of adj[u] || []){
        if(colors[u] == colors[v]){
            return false;
        }
        
        if(colors[v]==-1){
            let colr = 1 - currColor;
            
            if(dfs(v, adj, colors, colr) == false){
                return false
            }
        }
    }
    return true;
}

function BFS(u, graph, colors, currColor) {
    let queue = [];
    queue.push(u);
    colors[u] = currColor;

    while (queue.length) {
        let u = queue.shift();

        for (let v of graph[u] || []) {
            if (colors[v] == colors[u]) {
                return false;
            } else if (colors[v] == -1) {
                let clr = 1 - colors[u];
                colors[v] = clr;
                queue.push(v);
            }
        }
    }

    return true;
}

let elem = [0,1,2,3]
let parent = [0,1,2,3]


function find(i, parent){
    if(i == parent[i]){
        return i;
    }
    
    return find(parent[i], parent)
}


let par =find(2, parent);

console.log(par)

function union(a,b, parent){
    let a_parent = find(a, parent);
    let b_parent = find(b, parent);
    
    if(a_parent !== b_parent){
        parent[b_parent] = a_parent;
    }
}

union(0,2, parent)

let newP = find(2, parent);

console.log(newP)



// DSU by functions

// find (path compression)
function find(i, parent){
    if(i == parent[i]) return i;

    return parent[i] = find(parent[i], parent)
}

// union by rank
function union(a,b, parent, rank){
    let a_parent = find(a, parent);
    let b_parent = find(b, parent);
    
    if(a_parent == b_parent){
        return;
    }

    if(rank[a_parent] > rank[b_parent]){
        parent[b_parent] = a_parent; 
    }else if(rank[a_parent] < rank[b_parent]){
        parent[a_parent] = b_parent;
    }else{
        parent[b_parent] = a_parent;
        rank[a_parent] += 1;
    }
}


// DSU by Class style
class DSU{
    constructor(v){
        this.parent = [];
        this.rank = [];
        this.init(v)
    }
    
    init(v){
        for(let i =0; i<v; i++){
            this.parent.push(i);
            this.rank.push(0)
        }
    }
    
    find(x){
        if(x == this.parent[x]) return x;
        
        return this.parent[x] = this.find(this.parent[x])
    }
    
    union(x,y){
        let x_parent = this.find(x);
        let y_parent = this.find(y);
        
        if(x_parent == y_parent) return;
        
        if(this.rank[x_parent] > this.rank[y_parent]){
            this.parent[y_parent] = x_parent;
        }else if(this.rank[x_parent] < this.rank[y_parent]){
            this.parent[x_parent] = y_parent;
        }else {
            this.parent[y_parent] = x_parent;
            this.rank[x_parent]++
        }
    }
    
}

// let V = 3

// let adj = {
//     0:[1,2],
//     1:[0,2],
//     2:[0,1]
// }

let dsu = new DSU(V)

let isCycle = false
for(let u =0; u<V; u++){
    for(let v of adj[u]){
        
        if(u<v){
            let parent_v = dsu.find(v);
            let parent_u = dsu.find(u);
            
            if(parent_v == parent_u){
                isCycle = true;
                break;
            }
            
            dsu.union(u,v)
        }
    }
    
    if(isCycle == true) break;
}

console.log(isCycle)

// DSU by Prototype style
function DSU(v){
    this.parent = [];
    this.rank = [];
    
    for(let i =0; i<v; i++){
        this.parent.push(i);
        this.rank.push(0)
    }
}

DSU.prototype.find = function(x){
    if(x === this.parent[x]) return x;
    
    return this.parent[x] = this.find(this.parent[x])
}

DSU.prototype.union = function(x,y){
    let parent_x = this.find(x);
    let parent_y = this.find(y);
    
    if(parent_x === parent_y) return;
    
    if(this.rank[parent_x] > this.rank[parent_y]){
        this.parent[parent_y] = parent_x
    }else if(this.rank[parent_x] < this.rank[parent_y]){
        this.parent[parent_x] = parent_y;
    }else {
        this.parent[parent_y] = parent_x;
        this.rank[parent_x]++
    }
}

var remainingMethods = function(n, k, invocations) {
    let adj = {};

    for(let [u,v] of invocations){
        if(adj[u] == undefined) adj[u] = [];
        if(adj[v] == undefined) adj[v] = [];
        adj[u].push(v)
    }

    let sus = new Array(n).fill(false)
    sus[k] = true;
    
    let visited = new Array(n).fill(false);
    let susArr = []
    susArr.push(k)
    dfsSus(k, adj, visited, sus, susArr);
    
    
    visited = new Array(n).fill(false);
    for(let i=0; i<n; i++){
        if(sus[i] == false && visited[i] == false){
            dfs(i, adj, visited, sus)
        }
    }
    let isEdge = false;

    for(let v of susArr){
        if(sus[v] == false) isEdge = true;
    }

    if(isEdge){
        for(let v of susArr){
        sus[v] = false
        }
    }
    
    
    let result = []
    for(let i =0; i<n; i++){
        if(sus[i] == false) result.push(i)
    }


    return result
};


function dfsSus(u, adj, visited, sus, susArr){
    visited[u] = true;
    
    for(let v of adj[u] || []){

        sus[v] = true;
        susArr.push(v)
        if(visited[v] === false){
            dfsSus(v, adj, visited, sus, susArr)
        }
    }
}


function dfs(u, adj, visited, sus){
    visited[u] = true;

    for(let v of adj[u] || []){
        sus[v] = false;
        if(visited[v] == false){
            dfs(v, adj, visited, sus)
        }
    }
}

// var shortestPathBinaryMatrix = function(grid) {

//     if(grid[0][0] == 1) return -1

//     let n = grid.length;
//     let m = grid[0].length;

//     let directions = [[-1, 0], [1,0], [0,-1], [0,1], [-1,1], [-1,-1], [1,1], [1,-1]];

//     let result = Array.from({length:m}, ()=> new Array(n).fill(Infinity));
//     let pq = new MinPriorityQueue();
//     pq.push([0, [0,0]])
//     result[0][0] = 0;
//     while(pq.size()){

//         let [dist, node] = pq.dequeue();
        
//         if(dist > result[node[0], node[1]]) continue;

//         for(let dir of directions){
//             let x_ = node[0] + dir[0];
//             let y_ = node[1] + dir[1];

//             let d = 1;

//             if(isValid(x_, y_, n, m) && grid[x_][y_] ==0 && dist + d < result[x_][y_]){
                
//                 result[x_][y_] = dist + d;
//                 pq.push([dist + d, [x_, y_]]);
//             }
//         }


//     }

//     if(result[n-1][m-1] == Infinity) return -1

//     return result[n-1][m-1] + 1

    
// };

// function isValid(x, y, n,m){
//     return x >=0 && x<n && y>=0 && y<m
// }
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {

    let directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];

    let n = heights.length;        // rows
    let m = heights[0].length;     // columns

    let distance = Array.from(
        { length: n },
        () => new Array(m).fill(Infinity)
    );

    // Priority is the effort (element[0])
    let pq = new MinPriorityQueue();

    distance[0][0] = 0;

    pq.enqueue([0, [0, 0]]);

    while (pq.size() > 0) {

        let [dist, node] = pq.dequeue();


        let x = node[0];
        let y = node[1];

        // Destination
        // if (x === n - 1 && y === m - 1) {
        //     return dist;
        // }

        for (let dir of directions) {

            let x_ = x + dir[0];
            let y_ = y + dir[1];

            if (isSafe(x_, y_, n, m)) {

                let difference = Math.abs(
                    heights[x][y] - heights[x_][y_]
                );

                let maxDiff = Math.max(dist, difference);

                if (maxDiff < distance[x_][y_]) {

                    distance[x_][y_] = maxDiff;

                    pq.enqueue([
                        maxDiff,
                        [x_, y_]
                    ]);
                }
            }
        }
    }

    return distance[n - 1][m - 1];
};


function isSafe(x, y, n, m) {
    return x >= 0 &&
        x < n &&
        y >= 0 &&
        y < m;
}

function bellmanford(){
let dist = new Array(V).fill(1e8);
        dist[src] = 0;
        for(let i= 1; i<=V-1; i++){
            
            for(let edge of edges){
                let u = edge[0];
                let v = edge[1];
                let w = edge[2];
                
                if(dist[u] !== 1e8 && dist[u] + w < dist[v]){
                    dist[v] = dist[u] + w;
                }
            }
            
        }
        
        for(let edge of edges){
            
            let u = edge[0];
            let v = edge[1];
            let w = edge[2];
            
            if(dist[u] !== 1e8 && dist[u] + w < dist[v]){
                return [-1];
            }
        }
        
        return dist;

}



class Solution {
    spanningTree(V, edges) {
        let adj = {};
        
        for(let [u,v,w] of edges){
            
            if(adj[u] == undefined) adj[u] = [];
            if(adj[v] == undefined) adj[v] = [];
            
            adj[u].push([w,v]);
            adj[v].push([w,u])
        }
        
      
        
        let pq = new MinHeap();
        let inMST = new Array(V).fill(false);
        let result = 0;
        
        pq.push(0,0);
        
        while(pq.size()){
            let [w,n]  = pq.pop();
           
            if(inMST[n] === true) continue;
            
            result += w;
            
            inMST[n] = true;
          
            for(let nei of adj[n] || []){
               
               let [neiW, neiN] = nei;
                
                if(inMST[neiN] == false){
                    pq.push(neiW, neiN)
                }
            }
            
        }
        
        return result
        
    }
}

// Kruskal Algorithm
class Solution {
    spanningTree(V, edges) {
        // code here
        let dsu = new DSU(V)
        
        edges.sort((a,b) => a[2] - b[2]);
        let sum = 0;
        
        for(let edge of edges){
            let u = edge[0];
            let v = edge[1];
            let w = edge[2];
            
            let u_parent = dsu.find(u);
            let v_parent = dsu.find(v);
            
            if(u_parent != v_parent){
                dsu.union(u,v);
                sum += w
            }
        }
        
        return sum

    }
}



// Kosaraju's Algorithm
class Solution {
    kosaraju(V, edges) {
        // code here
        let adj = {};
        let reverseAdj = {};
        
        for(let [u,v] of edges){
            
            if(adj[u] == undefined) adj[u] = [];
            if(adj[v] == undefined) adj[v] = [];
            
            if(reverseAdj[u] == undefined) reverseAdj[u] = [];
            if(reverseAdj[v] == undefined) reverseAdj[v] = [];
            
            adj[u].push(v)
            
            reverseAdj[v].push(u)
        }
        
        // topo sort
        
        let stack =[];
        let visited = new Array(V).fill(false);
        
        for(let i =0; i<V; i++){
            
            if(!visited[i]){
                dfsFill(i, adj, visited, stack)
            }
        }
        
        // dfs with topo order (stored in stack)
        
        visited = new Array(V).fill(false);
        let count = 0;
        
        while(stack.length){
            let node = stack.pop();
            
            if(visited[node] == false){
                dfs(node, reverseAdj, visited);
                count++
            }
            
            
        }
        
        return count
    }
}

function dfs(u, adj, visited){
    visited[u] = true;
    
    for(let v of adj[u] || []){
        if(visited[v] == false){
            dfs(v, adj, visited)
        }
    }
}


function dfsFill(u, adj, visited, stack){
    visited[u] = true;
    
    for(let v of adj[u] || []){
        if(visited[v] == false){
            dfsFill(v, adj, visited, stack)
        }
    }
    
    stack.push(u)
}

class DSU{
    constructor(V){
        this.parent = [];
        this.size = [];
        this.init(V)
    }

    init(V){
        for(let i =0; i<V; i++){
            this.parent.push(i);
            this.size.push(1)
        }
    }

    find(x){
        if(x == this.parent[x]){
            return x
        }

        return this.parent[x] = this.find(this.parent[x])
    }

    union(x,y){
        let x_parent = this.find(x);
        let y_parent = this.find(y);

        if(x_parent == y_parent) return;

        if(this.size[x_parent] > this.size[y_parent]){
            this.parent[y_parent] = x_parent;
            this.size[x_parent] += this.size[y_parent]
        }else if(this.size[x_parent] < this.size[y_parent]){
            this.parent[x_parent] = y_parent;
            this.size[y_parent] += this.size[x_parent];
        }else{
            this.parent[x_parent] = y_parent;
            this.size[y_parent] += this.size[x_parent]
        }
    }
}

/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function(classroom, energy) {

    const rows = classroom.length;
    const cols = classroom[0].length;
    const totalCells = rows * cols;

    let start = -1;

    // Give every litter an ID: 0, 1, 2, ...
    let litterId = new Int8Array(totalCells);
    litterId.fill(-1);

    let litterCount = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            let pos = r * cols + c;
            let ch = classroom[r][c];

            if (ch === 'S') {
                start = pos;
            }

            if (ch === 'L') {
                litterId[pos] = litterCount++;
            }
        }
    }

    const allMask = (1 << litterCount) - 1;
    const maskSize = 1 << litterCount;

    const stateSize = totalCells * (energy + 1) * maskSize;

    const visited = new Uint8Array(stateSize);

    function encode(pos, currEnergy, mask) {
        return ((pos * (energy + 1) + currEnergy) * maskSize) + mask;
    }

    function getMask(state) {
        return state % maskSize;
    }

    function getTemp(state) {
        return Math.floor(state / maskSize);
    }

    function getEnergy(state) {
        return getTemp(state) % (energy + 1);
    }

    function getPos(state) {
        return Math.floor(getTemp(state) / (energy + 1));
    }

    const queue = new Int32Array(stateSize);

    let head = 0;
    let tail = 0;

    let startState = encode(start, energy, 0);

    queue[tail++] = startState;
    visited[startState] = 1;

    let moves = 0;

    while (head < tail) {

        
        let levelEnd = tail;

        while (head < levelEnd) {

            let state = queue[head++];

            let pos = getPos(state);
            let currEnergy = getEnergy(state);
            let mask = getMask(state);

            if (mask === allMask) {
                return moves;
            }

            if (currEnergy === 0) {
                continue;
            }

            let r = Math.floor(pos / cols);
            let c = pos % cols;

            
            if (r + 1 < rows) {
                let next = pos + cols;

                if (classroom[r + 1][c] !== 'X') {
                    if (process(next, currEnergy, mask)) {
                        return moves + 1;
                    }
                }
            }

            
            if (r > 0) {
                let next = pos - cols;

                if (classroom[r - 1][c] !== 'X') {
                    if (process(next, currEnergy, mask)) {
                        return moves + 1;
                    }
                }
            }

            
            if (c + 1 < cols) {
                let next = pos + 1;

                if (classroom[r][c + 1] !== 'X') {
                    if (process(next, currEnergy, mask)) {
                        return moves + 1;
                    }
                }
            }

            
            if (c > 0) {
                let next = pos - 1;

                if (classroom[r][c - 1] !== 'X') {
                    if (process(next, currEnergy, mask)) {
                        return moves + 1;
                    }
                }
            }
        }

        moves++;
    }

    return -1;


    function process(nextPos, currEnergy, mask) {

        let newEnergy = currEnergy - 1;
        let newMask = mask;

        let id = litterId[nextPos];

        if (id !== -1) {
            newMask |= (1 << id);
        }

        let r = Math.floor(nextPos / cols);
        let c = nextPos % cols;

        if (classroom[r][c] === 'R') {
            newEnergy = energy;
        }

        let newState = encode(nextPos, newEnergy, newMask);

        if (visited[newState]) {
            return false;
        }

        visited[newState] = 1;
        queue[tail++] = newState;

        return newMask === allMask;
    }
};

// var minMoves = function (classroom, energy) {
//     let n = classroom.length;
//     let m = classroom[0].length;


//     let grid = Array.from({ length: n }, () => new Array(m));
//     let visited = Array.from({length:n}, ()=> new Array(m).fill(false));
//     let sI = -1;
//     let sJ = -1;
//     let litCount = 0;

//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < m; j++) {

//             if (classroom[i][j] == "S") {
//                 sI = i;
//                 sJ = j;
//             }

//             if (classroom[i][j] == "L") litCount++
//             grid[i][j] = classroom[i][j]
//         }
//     }

//     let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
//     let ans = -1
//     let origEnergy = energy
//     let origLitCount = litCount
//     function solve(i,j, grid, visited, litCount, moves, energy){
//         if(litCount == 0){
//             console.log(moves, energy)
//            // console.log(energy)
//             if(ans == -1) ans = moves
//             litCount = origLitCount;
//             return 
//         }

//         if(energy == 0){
//             return;
//         }

        

//         visited[i][j] = true;

//         for(let dir of directions){
//             let i_ = i + dir[0];
//             let j_ = j + dir[1];

            

//             if(valid(i_, j_, n, m) && grid[i_][j_] !== "X" && visited[i_][j_] == false){
//                 console.log(grid[i_][j_], i_, j_, visited[i_][j_])
//                 if(grid[i_][j_] == "L") litCount--

//                 if(grid[i_][j_] == "R"){
//                     energy = origEnergy
//                 }else{
//                     energy--
//                 }
                
//                 solve(i_, j_, grid, visited, litCount, moves+1, energy)
//             }   
//         }

//         visited[i][j] = false;
//     }

//     solve(sI, sJ, grid, visited, litCount, 0, energy)

//     return ans
// };

// function valid(i, j, n, m){
//     return i>=0 && i<n && j>=0 && j<m
// }


/**
 * @param {number} V
 * @param {number[][]} Adj
 * @return {number}
 */

class Solution {

    isEulerCircuit(V, Adj) {
        
        
        
        if(isConnected(V, Adj) == false) return 0;
        
        let oddCount = 0;
        
        for(let i = 0; i<V; i++){
            
            if(Adj[i].length % 2 == 1){
                oddCount++
            }
        }
        
        if(oddCount > 2) return 0;
        if(oddCount == 2) return 1;
        
        return 2
    }
}


function isConnected(V, listAdj){
    
    let nonZeroNode = -1;
    
    for(let i =0; i<V; i++){
        if(listAdj[i].length > 0){
            nonZeroNode = i;
            break;
        }
    }
    
    let visited = new Array(V).fill(false);
    
    dfs(nonZeroNode, listAdj, visited);
    
    for(let i=0; i<V; i++){
        if(visited[i] == false && listAdj[i].length > 0) return false;
    }
    
    
    return true;
}


function dfs(u, listAdj, visited){
    visited[u] = true;
    
    for(let v of listAdj[u] || []){
        if(visited[v] == false){
            dfs(v, listAdj, visited)
        }
    }
}
var validArrangement = function(pairs) {
    let n = pairs.length;
    let adj = {};
    let inDegree = {}
    let outDegree = {}
    let nodes = new Set()

    for(let [u,v] of pairs){
        if(adj[u] == undefined) adj[u] = [];

        if(inDegree[v] === undefined) inDegree[v] = 0;
        if(inDegree[u] === undefined) inDegree[u] = 0;

        if(outDegree[u] === undefined) outDegree[u] = 0;
        if(outDegree[v] === undefined) outDegree[v] = 0;

        nodes.add(u)
        nodes.add(v)

        adj[u].push(v);
        inDegree[v]++
        outDegree[u]++
    }

    let startNode = pairs[0][0];
    
    for(let node of nodes){
        
        if(outDegree[node] - inDegree[node] == 1) {
            startNode = node;
            break;
        }
    }

    let path = [];

    let st = [];

    st.push(startNode);

    while(st.length){
        let l = st.length - 1;
        let top = st[l];

        if( adj[top] !== undefined && adj[top].length !== 0){
            let nbr = adj[top].pop()
            st.push(nbr);
        }else{
            path.push(top);
            st.pop();
        }
    }

    reverse(path);

    let result = [];

    for(let i = 0; i<path.length - 1; i++){
        result.push([path[i], path[i+1]])
    }

    return result;

};

function reverse(path){
    let i = 0;
    let j = path.length - 1;

    while(i<j){
        let temp = path[i];
        path[i] = path[j];
        path[j] = temp;

        i++;
        j--;
    }
}

let edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [6, 7]
];
let V = 8;
let adj = {};

for(let [u,v] of edges){
  if(adj[u] == undefined) adj[u] = [];
  if(adj[v] == undefined) adj[v] = [];

  adj[u].push(v);
  adj[v].push(u)
}

console.log(adj)

let A = BFS(0, adj)[0];
let [B, level] = BFS(A, adj);

console.log(A,B)
console.log(level)

function BFS(start, adj){

  let visited = new Array(V).fill(false);
  visited[start] = true;
  let q = [];
  q.push(start);
  
  l = -1;
  fn = -1;
  
  while(q.length){
    let len = q.length;
  
    while(len--){
      let n = q.shift();
      fn = n;
  
      for(let nei of adj[n]){
        if(visited[nei] === false){
          visited[nei] = true;
          q.push(nei)
        }
      }
    }
  
    l++
  }

  return [fn, l]
}


/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number}
 */
var minimumDiameterAfterMerge = function(edges1, edges2) {
    
    let V1 = edges1.length+1;
    let V2 = edges2.length+1;

    let adj1 = {};
    let adj2 = {};

    for(let [u,v] of edges1){

        if(adj1[u] == undefined) adj1[u] = [];
        if(adj1[v] == undefined) adj1[v] = [];

        adj1[u].push(v);
        adj1[v].push(u);
    }

    for(let [u,v] of edges2){
        if(adj2[u] == undefined) adj2[u] = [];
        if(adj2[v] == undefined) adj2[v] = [];

        adj2[u].push(v);
        adj2[v].push(u);
    }

    let [A] = BFS(0, adj1, V1)
    let [B, dis1] = BFS(A, adj1, V1)
    
    let [C] = BFS(0, adj2, V2);
    let [D, dis2] = BFS(C, adj2, V2);


    let combine = Math.floor((dis1 + 1) / 2) + Math.floor((dis2 + 1) / 2) + 1;

    return Math.max(dis1, dis2, combine);
};


function BFS(s, adj, V){

    let visited = new Array(V).fill(false);
    let q = [];
    q.push(s);
    visited[s] = true;
    
    let fn = -1;
    let level = 0;

    while(q.length){
        let len = q.length;

        while(len--){
            let node = q.shift();
            fn = node;

            for(let nei of adj[node] || []){
                if(visited[nei] === false){
                    visited[nei] = true;
                    q.push(nei)
                }
            }
        }
        if(q.length !== 0){
            level++
        } 
    }

    return [fn, level]
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    let n = grid.length;
    let m = grid[0].length;
    let freshCount = 0;
    let q = [];

    for(let i =0; i<n; i++){
        for(let j = 0; j<m; j++){
            if(grid[i][j] == 2){
                q.push([i,j])
            }

            if(grid[i][j] == 1){
                freshCount++
            }
        }
    }

    if(freshCount == 0) return 0

    let directions = [[0,1], [0,-1], [1,0], [-1,0]]

    let min = 0;

    while(q.length){
        let len = q.length;

        while(len--){
            let [i,j] = q.shift();
            
            for(dir of directions){
                let i_ = i+dir[0];
                let j_ = j+dir[1];

                if(isValid(i_, j_, n, m) && grid[i_][j_]==1){
                    grid[i_][j_] = 2;
                    freshCount--;
                    q.push([i_, j_]);
                
                }
                
            }

        }

        if(q.length !== 0){
            min++
        }
    }

    if(freshCount == 0) return min;

    return -1

};

function isValid(i, j, n, m){
    return i>=0 && i<n && j>=0 && j<m
}

/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function(isWater) {
    let n = isWater.length;
    let m = isWater[0].length;
    let directions = [[1,0], [-1,0], [0,1], [0, -1]]
    let result = Array.from({length:n}, ()=> new Array(m).fill(-1));
    let q = [];
    
    for(let i = 0; i<n; i++){
        for(let j = 0; j<m; j++){
            if(isWater[i][j] == 1){
                result[i][j] = 0;
                q.push([i,j])
            }
        }
    }

    let front = 0;
    while(front < q.length){
        
        let [i, j] = q[front++]
        let val = result[i][j]

        for(let dir of directions){
            let i_ = i + dir[0];
            let j_ = j + dir[1];

            if(isValid(i_, j_, n ,m) && result[i_][j_] == -1){
                result[i_][j_] = val+1;
                q.push([i_, j_]);
            }
        } 
        
    }

    return result;
};

function isValid(i, j, n, m){
    return i>=0 && i<n && j>=0 && j<m
}



