import { Grammar, ParseNode, ProductionSequence } from "../types";

export function constructParseTreeFromLeftMostProductionSequence<
  NT extends string,
  T extends string
>(
  grammar: Grammar<NT, T>,
  productionSequence: ProductionSequence<NT, T>
): ParseNode<NT, T> {
  const parseTree: ParseNode<NT, T> = {
    symbol: grammar.startSymbol,
    children: [],
  };

  const nodeStack: ParseNode<NT, T>[] = [parseTree];

  for (const { key, production } of productionSequence) {
    console.log(`nodeStack: ${nodeStack.map((node) => node.symbol).join(" ")}`);
    console.log(`processing production: ${key} -> ${production.join(" ")}`);

    const currentNode = nodeStack.pop();
    if (!currentNode) {
      throw new Error("Attempted to pop an empty stack");
    }

    console.log(
      `production key: ${key} currentNode symbol: ${currentNode.symbol}`
    );

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
