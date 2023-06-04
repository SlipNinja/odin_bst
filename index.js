import { Tree } from "./binary_search_tree.js";

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * ( max - min ) + min);
}

function getRandomArray(size, min, max){
    let array = [];
    while(size > 0){
        size--;
        array.push(getRandomNumber(min, max));
    }
    return array;
}

let myArray = getRandomArray(20, 1, 100);
let tree = new Tree(myArray);

console.log(`Generating tree from : ${myArray}`);
tree.print();
console.log(tree.isBalanced() ? "Tree is balanced" : "Tree is not balanced");

let addValues = getRandomArray(10, 100, 200);
addValues.forEach(value => {
    tree.insert(value);
});

tree.print();
console.log(tree.isBalanced() ? "Tree is balanced" : "Tree is not balanced");

tree.rebalance();
tree.print();
console.log(tree.isBalanced() ? "Tree is balanced" : "Tree is not balanced");

console.log("Level order : " + tree.levelOrder());
console.log("In order : " + tree.inOrder());
console.log("Pre order : " + tree.preOrder());
console.log("Post order : " + tree.postOrder());