import { naiveTopDownDepthFirstSearchParse } from "./parsers/naive-top-down-depth-first-search";
import { rightRecursiveBinaryAdditionExpressionsGrammar } from "./test-grammars/right-recursive-binary-addition-expressions";

const inputExpressions = ["", "0", "1", "0+0", "1+1", "1+1+1+1", "+"];
for (const inputExpression of inputExpressions) {
  const result = naiveTopDownDepthFirstSearchParse(
    rightRecursiveBinaryAdditionExpressionsGrammar,
    inputExpression
  );
  console.log(`parsing: "${inputExpression}", result ${result}`);
}
