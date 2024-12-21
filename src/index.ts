import { naiveTopDownDepthFirstSearchParse } from "./parsers/naive-top-down-depth-first-search";
import type { Grammar } from "./types";

const expressionNonTerminals = ["S", "T"] as const;
type ExpressionNonTerminal = (typeof expressionNonTerminals)[number];

const expressionTerminals = ["0", "1", "+"] as const;
type ExpressionTerminal = (typeof expressionTerminals)[number];

const expressionProductions = {
  S: [["T", "+", "S"] as const, ["T"] as const] as const,
  T: [["0"] as const, ["1"] as const] as const,
} as const;

const expressionGrammar: Grammar<ExpressionNonTerminal, ExpressionTerminal> = {
  startSymbol: "S",
  nonTerminals: new Set(expressionNonTerminals),
  terminals: new Set(expressionTerminals),
  productions: expressionProductions,
};

const inputExpressions = ["", "0", "1", "0+0", "1+1", "1+1+1+1", "+"];
for (const inputExpression of inputExpressions) {
  const result = naiveTopDownDepthFirstSearchParse(
    expressionGrammar,
    inputExpression
  );
  console.log(`parsing: ${inputExpression}, result ${result}`);
}
