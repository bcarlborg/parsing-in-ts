"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const print_parse_tree_1 = require("./helpers/print-parse-tree");
const naive_top_down_depth_first_search_1 = require("./parsers/naive-top-down-depth-first-search");
const right_recursive_binary_addition_expressions_1 = require("./test-grammars/right-recursive-binary-addition-expressions");
const inputExpressions = [
    "",
    "0",
    "1",
    "0+0",
    "1+1",
    "1+1+1+1",
    "+",
    "0+1",
    "0+1+1",
    "0+1+1+1",
];
for (const inputExpression of inputExpressions) {
    const result = (0, naive_top_down_depth_first_search_1.naiveTopDownDepthFirstSearchParse)(right_recursive_binary_addition_expressions_1.rightRecursiveBinaryAdditionExpressionsGrammar, inputExpression);
    console.log("========== PARSING: ", inputExpression, " ==========");
    if (result) {
        (0, print_parse_tree_1.printParseTree)(result);
    }
    else {
        console.log("no parse found");
    }
}