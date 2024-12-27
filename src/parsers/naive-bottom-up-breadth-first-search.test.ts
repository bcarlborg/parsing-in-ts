import { Grammar } from "../grammar/grammar";
import { leftRecursiveBinaryAdditionExpressionsGrammarData } from "../test-grammars/left-recursive-binary-addition-expressions";
import { naiveBottomUpBreadthFirstSearchParse } from "./naive-bottom-up-breadth-first-search";

describe("naiveBottomUpBreadthFirstSearchParse", () => {
  // it.each([
  //   { input: "", expected: null },
  //   { input: "+", expected: null },
  //   { input: "1111", expected: null },
  //   { input: "10", expected: null },
  //   { input: "1+", expected: null },
  // ])("parse invalid input: $input", ({ input, expected }) => {
  //   const grammar = new Grammar(
  //     rightRecursiveBinaryAdditionExpressionsGrammarData
  //   );
  //   const parseTree = naiveTopDownDepthFirstSearchParse({ grammar, input });
  //   expect(parseTree).toEqual(expected);
  // });

  it.each([
    {
      input: "1",
      expected: {
        symbol: "S",
        children: [{ symbol: "T", children: [{ symbol: "1", children: [] }] }],
      },
    },
  ])("parse validinput: $input", ({ input, expected }) => {
    const grammar = new Grammar(
      leftRecursiveBinaryAdditionExpressionsGrammarData
    );
    const parseTree = naiveBottomUpBreadthFirstSearchParse({
      grammar,
      input,
    });
    expect(parseTree).toEqual(expected);
  });
});
