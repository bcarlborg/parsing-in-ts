"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammar_1 = require("./grammar/grammar");
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
    const grammar = new grammar_1.Grammar(right_recursive_binary_addition_expressions_1.rightRecursiveBinaryAdditionExpressionsGrammar);
    const result = (0, naive_top_down_depth_first_search_1.naiveTopDownDepthFirstSearchParse)(grammar, inputExpression);
    console.log(`========== PARSING: "${inputExpression}" ==========`);
    if (result) {
        (0, print_parse_tree_1.printParseTree)(result);
    }
    else {
        console.log("no parse found");
    }
}
