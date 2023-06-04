

export class Tree{
    constructor(array){
        let sortedNoDuplicates = [...new Set(array)].sort((a, b) => a-b);// Numeric sort
        this.root = this.buildTree(sortedNoDuplicates);
    }

    buildTree(array){
        if(array.length === 0) return null;
        if(array.length === 1) return new Node(array[0]);
        let middleIndex = Math.floor(array.length/2);
        let newNode = new Node(array[middleIndex]);
        newNode.left = this.buildTree(array.slice(0, middleIndex));
        newNode.right = this.buildTree(array.slice(middleIndex+1));
        if(newNode.left !== null) newNode.left.setParent(newNode);
        if(newNode.right !== null) newNode.right.setParent(newNode);
        return newNode;
    }

    insert(value){
        if(this.root === null){
            this.root = new Node(value);
        } else {
            this.insertValue(this.root, value);
        }
    }

    insertValue(node, value){
        if(value < node.value){
            if(node.left !== null){
                this.insertValue(node.left, value);
            } else {
                node.left = new Node(value);
                node.left.setParent(node);
            }
        } else if(value > node.value){
            if(node.right !== null){
                this.insertValue(node.right, value);
            } else {
                node.right = new Node(value);
                node.right.setParent(node);
            }
        }
    }

    find(value, node = this.root){
      
        if(node === null) return null;
        if(node.value === value) return node;

        let leftnode = this.find(value, node.left);
        let rightnode = this.find(value, node.right);

        if(leftnode !== null) return leftnode;
        if(rightnode !== null) return rightnode;
        
        return null;
    }

    delete(value){
        let nodeToDelete = this.find(value);
        if(nodeToDelete === null) return -1;

        let pNode = nodeToDelete.parent;

        // No childs -> just remove node
        if(nodeToDelete.left === null && nodeToDelete.right === null){
            if(pNode === null){
                this.root = null;
            } else if(pNode.left === nodeToDelete){
                pNode.left = null;
            } else {
                pNode.right = null;
            }
        // 2 childs -> Replace node with 1st inorder successor ( the leftmost leaf in the right subbranch )
        } else if(nodeToDelete.left !== null && nodeToDelete.right !== null){
            let successor = this.getInorderSuccessor(nodeToDelete);

            // Unlinks successor
            successor.parent.left = null;

            // Creates new links for successor
            successor.parent = nodeToDelete.parent;
            successor.left = nodeToDelete.left;
            successor.right = nodeToDelete.right;

            // Links nodes to successor
            successor.left.parent = successor;
            successor.right.parent = successor;
            if(nodeToDelete.parent !== null){
              if(nodeToDelete.parent.left === nodeToDelete){
                nodeToDelete.parent.left = successor;
              } else {
                nodeToDelete.parent.right = successor;
              }
            }
            
            if(this.root === nodeToDelete){
              this.root = successor;
            }

        // 1 child -> Replace node with child
        } else if(nodeToDelete.left !== null){
            this.replaceWithChild(nodeToDelete, nodeToDelete.left);
        } else if(nodeToDelete.right !== null){
            this.replaceWithChild(nodeToDelete, nodeToDelete.right);
        }

    }

    getInorderSuccessor(node){
        return this.getLeftMostLeaf(node.right);
    }

    getLeftMostLeaf(node){
        if(node.left === null) return node;
        return this.getLeftMostLeaf(node.left);
    }

    replaceWithChild(node, child){
        if(node === this.root){
            this.root = child;
        } else if(node.parent.left === node){
            node.parent.left = child;
        } else {
            node.parent.right = child;
        }
    }

    // Apply f to all nodes in level order and returns an array of values in level order
    levelOrder(f = null, array = [this.root], values_array = [this.root.value]){

        if(array.length === 0) return values_array;

        let node = array.shift();
        if(node.left !== null) {
            array.push(node.left);
            values_array.push(node.left.value);
        }
        if(node.right !== null) {
            array.push(node.right);
            values_array.push(node.right.value);
        }

        if(f !== null) f(node);

        return this.levelOrder(f, array, values_array);
    }

    // Apply f to all nodes inorder and returns an array of values inorder
    inOrder(f = null){

        // Get inorder node array
        let nodes = this.inOrderArray();

        // Apply function f
        if( f !== null){
            nodes.forEach(node => {
                f(node);
            });
        }

        // Create values array from nodes array
        let values = nodes.map(function(node){
            return node.value;
        })

        return values;
    }

    // Create recursively inorder node array 
    inOrderArray(node = this.root){
        if(node === null){
            return [];
        }

        let nodes = [
            ... this.inOrderArray(node.left),
            node,
            ... this.inOrderArray(node.right)
        ]

        return nodes
    }

    // Apply f to all nodes preorder and returns an array of values preorder
    preOrder(f = null){

        // Get preOrder node array
        let nodes = this.preOrderArray();

        // Apply function f
        if( f !== null){
            nodes.forEach(node => {
                f(node);
            });
        }

        // Create values array from nodes array
        let values = nodes.map(function(node){
            return node.value;
        })

        return values;
    }

    // Create recursively preorder node array 
    preOrderArray(node = this.root){
        if(node === null){
            return [];
        }

        let nodes = [
            node,
            ... this.preOrderArray(node.left),
            ... this.preOrderArray(node.right)
        ]

        return nodes
    }

    // Apply f to all nodes postorder and returns an array of values postorder
    postOrder(f = null){

        // Get postOrder node array
        let nodes = this.postOrderArray();

        // Apply function f
        if( f !== null){
            nodes.forEach(node => {
                f(node);
            });
        }

        // Create values array from nodes array
        let values = nodes.map(function(node){
            return node.value;
        })

        return values;
    }

    // Create recursively preorder node array 
    postOrderArray(node = this.root){
        if(node === null){
            return [];
        }

        let nodes = [
            ... this.postOrderArray(node.left),
            ... this.postOrderArray(node.right),
            node
        ]

        return nodes
    }

    height(node = this.root, h = 0){
        if(node === null) return 0;
        if(node.left === null && node.right === null) return h;

        let left = h;
        let right = h;
        if(node.left !== null) left = this.height(node.left, h+1);
        if(node.right !== null) right = this.height(node.right, h+1);

        return Math.max(left, right);
    }

    depth(node, h = 0){
        if(node.parent === null) return h;
        return this.depth(node.parent, h+1);
    }

    isBalanced(node = this.root){
        if(node.left === null){
            return this.height(node.right) <= 0;
        }
        if(node.right === null){
            return this.height(node.left) <= 0;
        }

        let leftBalanced = this.isBalanced(node.left);
        let rightBalanced = this.isBalanced(node.right);

        return leftBalanced && rightBalanced;
    }

    rebalance(){
        let values = this.inOrder().sort((a, b) => a-b);
        this.root = this.buildTree(values);
    }

    print(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;
        
        if (node.right !== null) {
            this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    setParent(node){
        this.parent = node;
    }
}
