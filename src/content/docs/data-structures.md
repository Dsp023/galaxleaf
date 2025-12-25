---
title: Data Structures
description: Organizing data efficiently.
category: Cross-Cutting
---

# Data Structures: The Foundation of Algorithms

## Arrays

**Definition:** Contiguous block of memory storing elements of same type.

```javascript
const arr = [1, 2, 3, 4, 5];

// Operations
arr[0];          // Access: O(1)
arr.push(6);     // Append: O(1) amortized
arr.pop();       // Remove last: O(1)
arr.splice(2, 1); // Remove middle: O(n)
arr.indexOf(3);  // Search: O(n)
```

**Pros:** Fast access, cache-friendly  
**Cons:** Fixed size (in some languages), expensive inserts/deletes

## Linked Lists

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    
    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    delete(value) {
        if (!this.head) return;
        
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }
        
        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
        }
    }
}
```

**Pros:** Dynamic size, O(1) insert/delete (if you have reference)  
**Cons:** O(n) access, poor cache locality

## Hash Maps (Objects/Dictionaries)

```javascript
const map = new Map();

map.set('alice', 30);    // O(1)
map.get('alice');        // O(1)
map.has('bob');          // O(1)
map.delete('alice');     // O(1)

// Hash collision handling:
// - Chaining: Store list at each bucket
// - Open addressing: Find next empty slot
```

**Pros:** O(1) average for all operations  
**Cons:** O(n) worst case, unordered

## Stacks (LIFO)

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(item) {
        this.items.push(item);  // O(1)
    }
    
    pop() {
        return this.items.pop();  // O(1)
    }
    
    peek() {
        return this.items[this.items.length - 1];
    }
}

// Use cases:
// - Function call stack
// - Undo/Redo
// - Browser history
// - Expression evaluation
```

## Queues (FIFO)

```javascript
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(item) {
        this.items.push(item);  // O(1)
    }
    
    dequeue() {
        return this.items.shift();  // O(n) - array shift is slow!
    }
}

// Better: Circular queue or linked list implementation
```

**Use cases:** Task scheduling, BFS, print queue

## Trees

### Binary Search Tree
```javascript
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    
    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
    
    search(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }
}
```

**Operations:** O(log n) average, O(n) worst (unbalanced)

### Heap (Priority Queue)
```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }
    
    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return min;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            [this.heap[index], this.heap[parentIndex]] = 
                [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            
            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
```

**Use cases:** Dijkstra's algorithm, task scheduling, median finding

## Graphs

```javascript
class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }
    
    addEdge(v1, v2) {
        this.adjacencyList.get(v1).push(v2);
        this.adjacencyList.get(v2).push(v1);  // Undirected
    }
    
    bfs(start) {
        const visited = new Set();
        const queue = [start];
        
        while (queue.length) {
            const vertex = queue.shift();
            if (visited.has(vertex)) continue;
            
            visited.add(vertex);
            console.log(vertex);
            
            for (const neighbor of this.adjacencyList.get(vertex)) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }
    
    dfs(start, visited = new Set()) {
        visited.add(start);
        console.log(start);
        
        for (const neighbor of this.adjacencyList.get(start)) {
            if (!visited.has(neighbor)) {
                this.dfs(neighbor, visited);
            }
        }
    }
}
```

**Representations:**
- Adjacency List: Space O(V + E), better for sparse graphs
- Adjacency Matrix: Space O(V²), better for dense graphs

## Trie (Prefix Tree)

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let current = this.root;
        for (const char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
    }
    
    search(word) {
        let current = this.root;
        for (const char of word) {
            if (!current.children[char]) return false;
            current = current.children[char];
        }
        return current.isEndOfWord;
    }
    
    startsWith(prefix) {
        let current = this.root;
        for (const char of prefix) {
            if (!current.children[char]) return false;
            current = current.children[char];
        }
        return true;
    }
}
```

**Use cases:** Autocomplete, spell checker, IP routing

## Choosing the Right Structure

| Need | Structure |
|------|-----------|
| Fast access by index | Array |
| Fast insert/delete | Linked List, Hash Map |
| Key-value pairs | Hash Map |
| Ordered data | BST, Heap |
| LIFO | Stack |
| FIFO | Queue |
| Prefix matching | Trie |
| Relationships | Graph |

## Further Reading

- [VisuAlgo: Visualizing Data Structures](https://visualgo.net/)
- [Data Structures Easy to Advanced](https://www.youtube.com/watch?v=RBSGKlAvoiM)
