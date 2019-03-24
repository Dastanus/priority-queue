const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
    this.parentNodes = [];
    this.sizeHeap = 0;
	}

	push(data, priority) {
    let newNode = new Node(data, priority);
    this.sizeHeap++;
    this.insertNode(newNode);
    this.shiftNodeUp(newNode);  
	}

	pop() {
    let data;
    if (this.root) {
      this.sizeHeap--;
      let detach = this.detachRoot();
      data = detach.data;
      this.restoreRootFromLastInsertedNode(detach);
      if (this.root) {
        this.shiftNodeDown(this.root);
      }
      return data;
    }
	}

	detachRoot() {
		let rootIndex = this.parentNodes.indexOf(this.root);
    if (rootIndex !== -1) {
      this.parentNodes.splice(rootIndex, 1);
    }

    let detachedRoot = this.root;
    this.root = null;
    return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
    let lastInsertedNode = this.parentNodes.pop();
    
    if (lastInsertedNode && detached) {
      if (lastInsertedNode.parent
        && lastInsertedNode.parent.right === lastInsertedNode
        && lastInsertedNode.parent !== detached) {
        this.parentNodes.unshift(lastInsertedNode.parent);
      }
      if (lastInsertedNode.parent) {
        lastInsertedNode.parent.removeChild(lastInsertedNode);
      }
      lastInsertedNode.left = detached.left;
      lastInsertedNode.right = detached.right;
      if (lastInsertedNode.left) {
        lastInsertedNode.left.parent = lastInsertedNode;
      }
      if (lastInsertedNode.right) {
        lastInsertedNode.right.parent = lastInsertedNode;
      }
      if (!detached.left || !detached.right) {
        this.parentNodes.unshift(lastInsertedNode);
      }
      this.root = lastInsertedNode;
    }
	}

	size() {
		return this.sizeHeap;
	}

	isEmpty() {
		return this.sizeHeap === 0;
	}

	clear() {
    this.root = null;
    this.sizeHeap = 0;
    this.parentNodes = [];
	}

	insertNode(node) {
    if (!this.root) {
      this.root = node;
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
      if (this.parentNodes[0].right) {
        this.parentNodes.shift();
      }
    }
	}

	shiftNodeUp(node) {
    if (node.parent) {
      if (node.parent.priority < node.priority) {
        const nodeIndex = this.parentNodes.indexOf(node);
        const nodeParentIndex = this.parentNodes.indexOf(node.parent);
        if (nodeIndex !== -1) {
          if (nodeParentIndex !== -1) {
            const tempNode = this.parentNodes[nodeIndex];
            this.parentNodes[nodeIndex] = this.parentNodes[nodeParentIndex];
            this.parentNodes[nodeParentIndex] = tempNode;
          } else {
            this.parentNodes[nodeIndex] = node.parent;
          }
        }
        node.swapWithParent();
        this.shiftNodeUp(node);
      }
    } else {
      this.root = node;
    }
	}

	shiftNodeDown(node) {
		let child;
    if (node.left && node.right && node.left.priority > node.right.priority) {
      child = node.left;
    } else if (node.left && node.right && node.left.priority <= node.right.priority) {
      child = node.right;
    } else if (node.left && node.left.priority > node.priority) {
      child = node.left;
    } else {
      return;
    }

    let nodeIndex = this.parentNodes.indexOf(node);
    let nodeChildIndex = this.parentNodes.indexOf(child);
    if (nodeChildIndex !== -1) {
      if (nodeIndex !== -1) {
        let temp = this.parentNodes[nodeIndex];
        this.parentNodes[nodeIndex] = this.parentNodes[nodeChildIndex];
        this.parentNodes[nodeChildIndex] = temp;
      } else {
        this.parentNodes[nodeChildIndex] = node;
      }
    }
    if (node === this.root) {
      this.root = child;
    }
    child.swapWithParent();
    this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;


