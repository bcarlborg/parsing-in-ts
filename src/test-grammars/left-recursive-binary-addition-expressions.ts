import type { GrammarData, Production } from "../types";

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

const expressionProductions: Production<
  ExpressionNonTerminal,
  ExpressionTerminal
>[] = [
  {
    symbol: "S",
    production: ["S", "+", "T"] as const,
  },
  {
    symbol: "S",
    production: ["T"] as const,
  },
  {
    symbol: "T",
    production: ["0"] as const,
  },
  {
    symbol: "T",
    production: ["1"] as const,
  },
];

export const leftRecursiveBinaryAdditionExpressionsGrammarData: GrammarData<
  ExpressionNonTerminal,
  ExpressionTerminal
> = {
  startSymbol: "S",
  nonTerminals: new Set(expressionNonTerminals),
  terminals: new Set(expressionTerminals),
  productions: expressionProductions,
};
