import type { GrammarData } from "../types";

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

const expressionNonTerminals = ["S", "T"] as const;
type ExpressionNonTerminal = (typeof expressionNonTerminals)[number];

const expressionTerminals = ["0", "1", "+"] as const;
type ExpressionTerminal = (typeof expressionTerminals)[number];

const expressionProductions = {
  S: [["S", "+", "T"] as const, ["T"] as const] as const,
  T: [["0"] as const, ["1"] as const] as const,
} as const;

export const leftRecursiveBinaryAdditionExpressionsGrammarData: GrammarData<
  ExpressionNonTerminal,
  ExpressionTerminal
> = {
  startSymbol: "S",
  nonTerminals: new Set(expressionNonTerminals),
  terminals: new Set(expressionTerminals),
  productions: expressionProductions,
};
