import { Grammar } from "../grammar/grammar";
import { printParseTree } from "../helpers/print-parse-tree";
import { ParseNode } from "../types";

type Node<NT extends string, T extends string> = {
  symbol: NT | T;
  children: Node<NT, T>[];
  prev: Node<NT, T> | null;
};

export function naiveBottomUpBreadthFirstSearchParse<
  NT extends string,
  T extends string
>(args: { grammar: Grammar<NT, T>; input: string }): ParseNode<NT, T> | null {
  const { grammar, input } = args;

  let primaryQueue: Node<NT, T>[] = [];
  let secondaryQueue: Node<NT, T>[] = [];

  let currentCharIndex = 0;

  while (currentCharIndex < input.length) {
    const currentChar = input[currentCharIndex];

    console.log(
      `Loop Iteration: currentChar=${currentChar} currentCharIndex=${currentCharIndex} ===============================`
    );

    // On the first loop iteration, we need to initialize the primary queue
    if (currentCharIndex === 0) {
      if (currentChar === undefined) {
        return null;
      } else if (grammar.isTerminalSymbol(currentChar)) {
        secondaryQueue.push({
          symbol: currentChar,
          children: [],
          prev: null,
        });
      } else {
        throw new Error(`currentChar=${currentChar} is not a terminal symbol`);
      }
    }

    // Add all primary queue items to the secondary queue with the current char
    // added to the end.
    while (primaryQueue.length > 0 && currentCharIndex > 0) {
      const currentNode = primaryQueue.shift();

      console.log(
        `shift loop start, primaryQueueLength=${
          primaryQueue.length + 1
        } currentNode=${currentNode?.symbol}`
      );

      if (!currentNode) {
        throw new Error("Current node is undefined");
      }

      let newNode: Node<NT, T> = currentNode;
      if (currentChar) {
        if (!grammar.isTerminalSymbol(currentChar)) {
          throw new Error(
            `currentChar=${currentChar} is not a terminal symbol`
          );
        }
        newNode = {
          symbol: currentChar as T,
          children: [],
          prev: currentNode,
        };
      } else {
        newNode = currentNode;
      }

      secondaryQueue.push(newNode);
    }

    // reduce all items in secondary queue and put them into the primary queue
    while (secondaryQueue.length > 0) {
      const currentNode = secondaryQueue.shift();

      const debugArray = [];
      let prev: Node<NT, T> | null | undefined = currentNode;
      while (prev) {
        debugArray.unshift(prev.symbol);
        prev = prev.prev;
      }

      console.log(
        `reduce loop start, secondaryQueueLength=${
          secondaryQueue.length + 1
        } currentSequentialForm=${debugArray.join("")}`
      );

      if (!currentNode) {
        // this should never happen, but we need to handle it
        // for the type checker
        throw new Error("Current node is undefined");
      }

      // we always push the current node without applying reductions into the primary queue
      primaryQueue.push(currentNode);

      // apply reductions to the current node by traversing backwards from the current node
      // to the first input character.
      // if a reduction is found, create a new node for the NT symbol and push it to the primary queue.

      let reductionNodes: Node<NT, T>[] = [];
      let nextReductionNode: Node<NT, T> | null = currentNode;

      // the problem here is that we are only doing one round of reductions
      // so 1 => T, but you never get T => S.
      // need to either reconstruct this inner loop or do the reduction step differently.
      while (nextReductionNode) {
        reductionNodes.unshift(nextReductionNode);
        const reductionNodeValues = reductionNodes.map((node) => node.symbol);

        const productions = grammar.getProductionSymbolsByRightHandSide(
          reductionNodeValues.join("")
        );

        for (const symbol of productions) {
          console.log(
            `reduction to ${symbol} from ${reductionNodeValues.join("")}`
          );
          const newNode: Node<NT, T> = {
            symbol,
            prev: nextReductionNode.prev,
            children: reductionNodes,
          };
          secondaryQueue.push(newNode);
        }

        nextReductionNode = nextReductionNode.prev;
      }
    }

    currentCharIndex++;
  }

  console.log(
    `Shift/Reduceloop finished, primaryQueue.length=${primaryQueue.length} secondaryQueue.length=${secondaryQueue.length}`
  );

  console.log(
    "primaryQueue",
    primaryQueue.map((node) => node.symbol)
  );
  console.log(
    "secondaryQueue",
    secondaryQueue.map((node) => node.symbol)
  );

  let acceptNode: Node<NT, T> | null = null;
  // primary queue holds all of the final sentential forms, we need to check all
  // of them to see if they are a valid parse
  for (const node of primaryQueue) {
    console.log(`checking node: ${node.symbol}`);
    if (node.symbol !== grammar.startSymbol) {
      continue;
    }

    let nextLeftChild = node.children?.[0];
    while (nextLeftChild?.children?.length) {
      nextLeftChild = nextLeftChild.children?.[0];
    }

    if (
      nextLeftChild &&
      nextLeftChild.symbol === input[0] &&
      nextLeftChild.children?.length === 0 &&
      nextLeftChild.prev === null
    ) {
      acceptNode = node;
      break;
    }
  }

  if (!acceptNode) {
    return null;
  }

  return removeRedundantKeysFromParseTree(acceptNode);
}

function removeRedundantKeysFromParseTree<NT extends string, T extends string>(
  parseTree: Node<NT, T>
): ParseNode<NT, T> {
  function removeRedundantKeysFromParseTreeHelper(
    node: Node<NT, T>
  ): ParseNode<NT, T> {
    let newNode: Omit<Node<NT, T>, "prev"> & { prev?: unknown } = { ...node };

    delete newNode.prev;

    return {
      ...newNode,
      children: newNode.children.map(removeRedundantKeysFromParseTreeHelper),
    };
  }

  return removeRedundantKeysFromParseTreeHelper(parseTree);
}
