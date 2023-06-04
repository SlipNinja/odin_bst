import { Tree } from "./binary_search_tree.js";

function displayValue(node){
    //console.log(node.value);
}

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

//let myArray = [4, 1, 2, 3, 12, 13, 7, 4, 8, 9, 10, 11, 2, 4, 2, 4];
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

console.log("Level order : " + tree.levelOrder(displayValue));
console.log("In order : " + tree.inOrder(displayValue));
console.log("Pre order : " + tree.preOrder(displayValue));
console.log("Post order : " + tree.postOrder(displayValue));