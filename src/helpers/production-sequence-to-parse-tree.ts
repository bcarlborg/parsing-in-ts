import { Grammar, ParseNode, ProductionSequence } from "../types";

/**
 * Constructs a parse tree from a left-most production sequence.
 */
export function constructParseTreeFromLeftMostProductionSequence<
  NT extends string,
  T extends string
>(
  grammar: Grammar<NT, T>,
  productionSequence: ProductionSequence<NT, T>,
  debug: boolean = false
): ParseNode<NT, T> {
  const parseTree: ParseNode<NT, T> = {
    symbol: grammar.startSymbol,
    children: [],
  };

  /**
   * We use a stack to keep track of the nodes we are adding children to.
   */
  const nodeStack: ParseNode<NT, T>[] = [parseTree];

  /**
   * We iterate over the production in the sequence and add
   * children to a node for this production.
   */
  for (const { key, production } of productionSequence) {
    const currentNode = nodeStack.pop();
    if (!currentNode) {
      throw new Error("Attempted to pop an empty stack");
    }

    if (key === currentNode.symbol) {
      const childNodes = production.map((symbol) => {
        return {
          symbol,
          children: [],
        };
      });

      currentNode.children.push(...childNodes);

      if (grammar.nonTerminals.has(key as NT)) {
        nodeStack.push(...childNodes.reverse());
      }
    }
  }

  return parseTree;
}
