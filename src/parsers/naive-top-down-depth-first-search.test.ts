import { Grammar } from "../grammar/grammar";
import { rightRecursiveBinaryAdditionExpressionsGrammar } from "../test-grammars/right-recursive-binary-addition-expressions";
import { naiveTopDownDepthFirstSearchParse } from "./naive-top-down-depth-first-search";

describe("naiveTopDownDepthFirstSearch", () => {
  it.each([
    { input: "", expected: null },
    { input: "+", expected: null },
    { input: "1111", expected: null },
    { input: "10", expected: null },
    { input: "1+", expected: null },
  ])("parse invalid input: $input", ({ input, expected }) => {
    const grammar = new Grammar(rightRecursiveBinaryAdditionExpressionsGrammar);
    const parseTree = naiveTopDownDepthFirstSearchParse(grammar, input);
    expect(parseTree).toEqual(expected);
  });
});
