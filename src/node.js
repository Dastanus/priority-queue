class Node {
	constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
	}

	appendChild(node) {
    if(!this.left) {
      this.left = node;
      this.left.parent = this;
    } else if (!this.right){
			this.right = node;
			this.right.parent = this;
    } 
    return this;
	}

	removeChild(node) {
    if(this.left === node){
			this.left.parent = null;
			this.left = null;
		} else if(this.right === node) {
			this.right.parent = null;
			this.right = null
		} else {
			throw new Error("Passed node is not found");
    }
    return this;
	}

	remove() {
    if(this.parent){
			this.parent.removeChild(this);
    }
    return this;
	}

	swapWithParent() {
		let temp;
		if(this.parent){
			if(this.left){
				this.left.parent = this.parent;
			}
			if(this.right){
				this.right.parent = this.parent;
			}
			if(this.parent.left===this){
				if (this.parent.right) {
					this.parent.right.parent = this;
        }
				this.parent.left = this.left;
				this.left = this.parent;	
				temp = this.right;	
				this.right = this.parent.right;
				this.parent.right = temp;	
			} else if(this.parent.right === this){
				if (this.parent.left) {
					this.parent.left.parent = this;
				}
        this.parent.right = this.right;	
        this.right = this.parent;
				temp = this.left;	
				this.left = this.parent.left;
				this.parent.left = temp;	
			}
			if(this.parent.parent){
				if(this.parent.parent.left===this.parent){
					this.parent.parent.left = this;
				} else {
					this.parent.parent.right = this;
				}
			}
			temp = this.parent.parent;
			this.parent.parent = this;
			this.parent = temp;
			
		} else {
			console.log("parent does not exist");
		}
    
    return this;
	
	}
}

module.exports = Node;