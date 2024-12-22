"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printParseTree = printParseTree;
function printParseTree(parseTree) {
    const printParseTreeHelper = (node, depth) => {
        const indent = " ".repeat(depth * 2);
        if (node.children.length === 0) {
            console.log(`${indent}<terminal: ${node.symbol}>`);
            return;
        }
        console.log(`${indent}<symbol: ${node.symbol}>`);
        for (const child of node.children) {
            printParseTreeHelper(child, depth + 1);
        }
    };
    printParseTreeHelper(parseTree, 0);
}
