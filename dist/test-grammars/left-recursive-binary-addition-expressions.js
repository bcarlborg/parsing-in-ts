"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leftRecursiveBinaryAdditionExpressionsGrammar = void 0;
/** =======================================================================================
 * Left Recursive Binary Addition Expressions Grammar
 *
 * This grammar is a simple grammar that generates left recursive binary addition
 * expressions.
 *
 * The grammar is defined as follows:
 *
 * S -> S + T | T
 * T -> 0 | 1
 *
 * The start symbol is S.
 * ========================================================================================
 */
const expressionNonTerminals = ["S", "T"];
const expressionTerminals = ["0", "1", "+"];
const expressionProductions = {
    S: [["S", "+", "T"], ["T"]],
    T: [["0"], ["1"]],
};
exports.leftRecursiveBinaryAdditionExpressionsGrammar = {
    startSymbol: "S",
    nonTerminals: new Set(expressionNonTerminals),
    terminals: new Set(expressionTerminals),
    productions: expressionProductions,
};
