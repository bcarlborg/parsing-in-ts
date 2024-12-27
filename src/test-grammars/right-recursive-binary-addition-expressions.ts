import type { GrammarData, Production } from "../types";

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

const expressionProductions: Production<
  ExpressionNonTerminal,
  ExpressionTerminal
>[] = [
  { symbol: "S", production: ["T", "+", "S"] as const },
  { symbol: "S", production: ["T"] as const },
  { symbol: "T", production: ["0"] as const },
  { symbol: "T", production: ["1"] as const },
];

export const rightRecursiveBinaryAdditionExpressionsGrammarData: GrammarData<
  ExpressionNonTerminal,
  ExpressionTerminal
> = {
  startSymbol: "S",
  nonTerminals: new Set(expressionNonTerminals),
  terminals: new Set(expressionTerminals),
  productions: expressionProductions,
};
