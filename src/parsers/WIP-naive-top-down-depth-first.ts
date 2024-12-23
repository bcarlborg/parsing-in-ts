// ===============================================================================
// Ideation for how to improve and simply the DFS
// The previous implementation was a bit complex and hard to understand.
// This implementation tries break up the code in such a way that the DFS
// pattern is more obvious and easier to pattern match against.
//
// TODO:
// - [ ] Wrap my head around how tracking the parents works exactly.
//
// ===============================================================================

import { Grammar } from "../grammar/grammar";
import { constructParseTreeFromLeftMostProductionSequence } from "../helpers/production-sequence-to-parse-tree";
import { Production, ProductionSequence } from "../types";

type NodeId = `n-${number}` | "root";

type StackItem<NT extends string, T extends string> = {
  id: NodeId;
  parent: NodeId | undefined;
  currentInputIndex: number;
  sententialForm: (NT | T)[];
};

type Parents<NT extends string, T extends string> = Partial<
  Record<NodeId, { parent: NodeId; production: Production<NT, T> }>
>;

export function WIP_naiveTopDownDepthFirstSearchParse<
  NT extends string,
  T extends string
>(grammar: Grammar<NT, T>, input: string) {
  const productionSequence = dfsFindDerivationSequenceForInput(grammar, input);

  console.log("productionSequence");

  if (!productionSequence) {
    console.log("NULL");
    return null;
  }
  productionSequence.forEach((production) => {
    console.log(`${production.symbol} -> ${production.production.join(" ")}`);
  });

  return constructParseTreeFromLeftMostProductionSequence(
    grammar,
    productionSequence
  );
}

function dfsFindDerivationSequenceForInput<NT extends string, T extends string>(
  grammar: Grammar<NT, T>,
  input: string
) {
  /**
   * Step 1:
   * Setup the data structures we need to use to traverse all possible parses.
   * - We use a parents object to track which node is the parent of each node and the
   *   production that generated the current node.
   * - We use a stack to store the current parse branches we are exploring.
   * - We keep a
   */
  const parents: Parents<NT, T> = {};
  const stack: StackItem<NT, T>[] = [];

  stack.push({
    id: "root",
    parent: undefined,
    currentInputIndex: 0,
    sententialForm: [grammar.startSymbol],
  });

  let nextNodeId = 0;

  /**
   * Step 2:
   * Start popping items of the stack and processing them.
   * We will either run out of items in the stack or one of the items will return
   * a valid parse.
   */
  while (stack.length !== 0) {
    const stackItem = stack.pop();

    if (stackItem === undefined) {
      throw new Error("Attempted to pop an empty stack");
    }

    let sententialForm = [...stackItem.sententialForm];
    let currentInputIndex = stackItem.currentInputIndex;

    /**
     * Step1:
     * Match leading terminal symbols with our input.
     */

    // TODO:
    // This while loop and the check below could be a function. The function could
    // return the next index and the next sentential form or throw?

    // TODO: this is causing an infinite loop! If we always check the first item,
    // then it will always be a terminal symbol.

    while (grammar.isTerminalSymbol(sententialForm[0])) {
      // if we are out of input symbols, then this is not a valid path
      if (currentInputIndex >= input.length) {
        console.log("OUT OF INPUT SYMBOLS");
        return null;
      }

      // if the current input symbol matches the current sentential form symbol,
      // then then advance the current input index and unshift from the sentential form.
      // if they do not match, then this is not a valid path.
      if (sententialForm[0] === input[currentInputIndex]) {
        sententialForm.shift();
        currentInputIndex++;
        continue;
      }
    }

    // if there are still terminal symbols at the start of the sentential form,
    // then we couldn't match them with the input and this is not a valid path.
    if (grammar.isTerminalSymbol(sententialForm[0])) {
      continue;
    }

    /**
     * Step 2:
     * Check if we have reached the end of the input and found a valid path.
     */

    // After matching leading terminal symbols, if the sentential form is empty
    // and we have reached the end of the input, then we have found a valid path.
    if (sententialForm.length === 0 && currentInputIndex === input.length) {
      return getProductionSequenceFromStackItem(stackItem, parents);
    }

    /**
     * Step 3:
     * Get all possible expansions of the the first symbol in the sentential form.
     * Apply those expansions to the sentential form and push the children onto the stack.
     */

    const firstNonTerminalSymbol = sententialForm[0];

    if (!grammar.isNonTerminalSymbol(firstNonTerminalSymbol)) {
      // We don't expect this to happen based on how this function is
      // implemented, but there is nothing in the type system that guarantees
      // this so we need to check.
      throw new Error(
        `Expected non-terminal symbol, but got: ${firstNonTerminalSymbol}`
      );
    }

    for (const production of grammar.productions[firstNonTerminalSymbol]) {
      const newSententialForm = [...production, ...sententialForm.slice(1)];

      stack.push({
        id: `n-${nextNodeId}`,
        parent: stackItem.id,
        currentInputIndex,
        sententialForm: newSententialForm,
      });

      parents[`n-${nextNodeId}`] = {
        parent: stackItem.id,
        production: {
          symbol: firstNonTerminalSymbol,
          production: [...production],
        },
      };

      nextNodeId++;
    }
  }

  return null;
}

function getProductionSequenceFromStackItem<
  NT extends string,
  T extends string
>(stackItem: StackItem<NT, T>, parents: Parents<NT, T>) {
  const productionSequence: ProductionSequence<NT, T> = [];

  let currentNodeId = stackItem.id;
  while (currentNodeId !== "root") {
    const parent = parents[currentNodeId];
    if (!parent) {
      throw new Error(`No parent found for node: ${currentNodeId}`);
    }
    productionSequence.unshift(parent.production);
    currentNodeId = parent.parent;
  }

  return productionSequence;
}
