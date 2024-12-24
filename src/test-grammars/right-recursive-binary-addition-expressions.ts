import type { GrammarData } from "../types";

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

const expressionNonTerminals = ["S", "T"] as const;
type ExpressionNonTerminal = (typeof expressionNonTerminals)[number];

const expressionTerminals = ["0", "1", "+"] as const;
type ExpressionTerminal = (typeof expressionTerminals)[number];

const expressionProductions = {
  S: [["T", "+", "S"] as const, ["T"] as const] as const,
  T: [["0"] as const, ["1"] as const] as const,
} as const;

export const rightRecursiveBinaryAdditionExpressionsGrammarData: GrammarData<
  ExpressionNonTerminal,
  ExpressionTerminal
> = {
  startSymbol: "S",
  nonTerminals: new Set(expressionNonTerminals),
  terminals: new Set(expressionTerminals),
  productions: expressionProductions,
};
