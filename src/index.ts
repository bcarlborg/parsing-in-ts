import { Grammar } from "./grammar/grammar";
import { printParseTree } from "./helpers/print-parse-tree";
import { naiveTopDownDepthFirstSearchParse } from "./parsers/naive-top-down-depth-first-search";
import { rightRecursiveBinaryAdditionExpressionsGrammarData } from "./test-grammars/right-recursive-binary-addition-expressions";

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
  const grammar = new Grammar(
    rightRecursiveBinaryAdditionExpressionsGrammarData
  );

  console.log(`========== PARSING: "${inputExpression}" ==========`);

  const result = naiveTopDownDepthFirstSearchParse({
    grammar,
    input: inputExpression,
  });

  if (result) {
    printParseTree({ parseTree: result });
  } else {
    console.log("no parse found");
  }
}
