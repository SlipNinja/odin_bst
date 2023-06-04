import { Tree } from "./binary_search_tree.js";

function displayValue(node){
    //console.log(node.value);
}

let myArray = [4, 1, 2, 3, 12, 13, 7, 4, 8, 9, 10, 11, 2, 4, 2, 4];
let tree = new Tree(myArray);

console.log(`Generating tree from : ${myArray}`);
tree.print();

let value1 = 6;
let value2 = 18;

console.log(`Inserting ${value1}...`);
tree.insert(6);

tree.print();

console.log("Deleting root node value...")
tree.delete(tree.root.value);

tree.print();

console.log(tree.find(value1) ? `Value ${value1} is in the tree` : `Value ${value1} not found`);
console.log(tree.find(value2) ? `Value ${value2} is in the tree` : `Value ${value2} not found`);

console.log("Level order : " + tree.levelOrder(displayValue));
console.log("In order : " + tree.inOrder(displayValue));
console.log("Pre order : " + tree.preOrder(displayValue));
console.log("Post order : " + tree.postOrder(displayValue));

console.log("Height from node '7' : " + tree.height(tree.find(7)));
console.log("Depth to node '7' : " + tree.depth(tree.find(7)));

console.log(tree.isBalanced() ? "Tree is balanced" : "Tree is not balanced");

tree.rebalance();
tree.print();

console.log(tree.isBalanced() ? "Tree is balanced" : "Tree is not balanced");

