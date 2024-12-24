import { Grammar } from "./grammar/grammar";
import { printParseTree } from "./helpers/print-parse-tree";
import { naiveTopDownDepthFirstSearchParse } from "./parsers/naive-top-down-depth-first-search";
import { WIP_naiveTopDownDepthFirstSearchParse } from "./parsers/WIP-naive-top-down-depth-first";
import { rightRecursiveBinaryAdditionExpressionsGrammar } from "./test-grammars/right-recursive-binary-addition-expressions";

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
  const grammar = new Grammar(rightRecursiveBinaryAdditionExpressionsGrammar);

  console.log(`========== PARSING: "${inputExpression}" ==========`);

  const result = WIP_naiveTopDownDepthFirstSearchParse(
    grammar,
    inputExpression
  );

  if (result) {
    printParseTree(result);
  } else {
    console.log("no parse found");
  }
}
