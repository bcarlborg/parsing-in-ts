"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightRecursiveBinaryAdditionExpressionsGrammar = void 0;
/** =======================================================================================
 * Right Recursive Binary Addition Expressions Grammar
 *
 * This grammar is a simple grammar that generates right recursive binary addition
 * expressions.
 *
 * The grammar is defined as follows:
 *
 * S -> T + S | T
 * T -> 0 | 1
 *
 * The start symbol is S.
 * ========================================================================================
 */
const expressionNonTerminals = ["S", "T"];
const expressionTerminals = ["0", "1", "+"];
const expressionProductions = {
    S: [["T", "+", "S"], ["T"]],
    T: [["0"], ["1"]],
};
exports.rightRecursiveBinaryAdditionExpressionsGrammar = {
    startSymbol: "S",
    nonTerminals: new Set(expressionNonTerminals),
    terminals: new Set(expressionTerminals),
    productions: expressionProductions,
};
