"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const naive_top_down_depth_first_search_1 = require("./parsers/naive-top-down-depth-first-search");
const expressionNonTerminals = ["S", "T"];
const expressionTerminals = ["0", "1", "+"];
const expressionProductions = {
    S: [["T", "+", "S"], ["T"]],
    T: [["0"], ["1"]],
};
const expressionGrammar = {
    startSymbol: "S",
    nonTerminals: new Set(expressionNonTerminals),
    terminals: new Set(expressionTerminals),
    productions: expressionProductions,
};
const inputExpressions = ["", "0", "1", "0+0", "1+1", "1+1+1+1", "+"];
for (const inputExpression of inputExpressions) {
    const result = (0, naive_top_down_depth_first_search_1.naiveTopDownDepthFirstSearchParse)(expressionGrammar, inputExpression);
    console.log(`parsing: ${inputExpression}, result ${result}`);
}
