"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printParseTree = printParseTree;
/**
 * Accepts a parse tree and prints it in a human-readable format.
 * For example, the following parse tree:
 *      S
 *    / | \
 *   T  +  S
 *   |     |
 *   1     T
 *         |
 *         1
 *
 * Would be printed as:
 *
 * <symbol: S>
 *   <symbol: T>
 *     <symbol: 1>
 *       <terminal: 1>
 *   <symbol: +>
 *     <terminal: +>
 *   <symbol: S>
 *     <symbol: T>
 *       <symbol: 1>
 *         <terminal: 1>
 */
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
