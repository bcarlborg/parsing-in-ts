/** =======================================================================================
 * Naive Top-Down Depth-First Search Parser
 *
 * This parser is a simple implementation of a top-down depth-first search parser.
 * It is not optimized for performance, but it is easy to understand and modify.
 * ========================================================================================
 */
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

export function naiveTopDownDepthFirstSearchParse<
  NT extends string,
  T extends string
>(grammar: Grammar<NT, T>, input: string) {
  const productionSequence = dfsFindDerivationSequenceForInput(grammar, input);

  if (!productionSequence) {
    return null;
  }

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

    const matchResult = matchStartingTerminalsToInput({
      grammar,
      input,
      sententialForm,
      currentInputIndex,
    });

    // null indicates that the sentential form does not match the input.
    // so we continue to end this exploration branch.
    if (matchResult === null) {
      continue;
    }

    sententialForm = matchResult.nextSententialForm;
    currentInputIndex = matchResult.nextInputIndex;

    /**
     * Step 2:
     * Check if we have reached the end of the input and found a valid path.
     */

    // After matching leading terminal symbols, if the sentential form is empty
    // and we have reached the end of the input, then we have found a valid path.
    if (sententialForm.length === 0 && currentInputIndex > input.length - 1) {
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

function matchStartingTerminalsToInput<
  NT extends string,
  T extends string
>(args: {
  grammar: Grammar<NT, T>;
  input: string;
  sententialForm: (NT | T)[];
  currentInputIndex: number;
}): {
  nextSententialForm: (NT | T)[];
  nextInputIndex: number;
} | null {
  const { grammar, input, sententialForm, currentInputIndex } = args;

  let nextSententialForm: (NT | T)[] = sententialForm;
  let nextInputIndex = currentInputIndex;

  while (true) {
    const isAtEndOfInput = nextInputIndex > input.length - 1;
    const currentSententialFormSymbol = nextSententialForm[0];
    const currentInputSymbol = input[nextInputIndex];

    if (nextSententialForm.length === 0 && isAtEndOfInput) {
      return {
        nextSententialForm: [],
        nextInputIndex: currentInputIndex + 1,
      };
    }
    // if there are more symbols in the input and no more symbols in the
    // sentential form, then this is not a valid parse.
    if (currentSententialFormSymbol === undefined && currentInputSymbol) {
      return null;
    }

    // if there are more symbols in the sentential form and no more symbols
    // in the input, then this is not a valid parse.
    if (currentSententialFormSymbol && currentInputSymbol === undefined) {
      return null;
    }

    if (grammar.isNonTerminalSymbol(currentSententialFormSymbol)) {
      return {
        nextSententialForm: nextSententialForm,
        nextInputIndex: nextInputIndex,
      };
    }

    if (currentSententialFormSymbol !== currentInputSymbol) {
      return null;
    }

    if (currentSententialFormSymbol === currentInputSymbol) {
      nextSententialForm = nextSententialForm.slice(1);
      nextInputIndex = nextInputIndex + 1;
      continue;
    }
  }
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
