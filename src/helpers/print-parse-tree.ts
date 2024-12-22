import { ParseNode } from "../types";

export function printParseTree<NT extends string, T extends string>(
  parseTree: ParseNode<NT, T>
) {
  const printParseTreeHelper = (node: ParseNode<NT, T>, depth: number) => {
    const indent = " ".repeat(depth * 2);

    if (node.children.length === 0) {
      console.log(`${indent}<terminal: ${node.symbol}>`);
      return;
    }

    console.log(`${indent}<symbol: ${node.symbol}>`);

    for (const child of node.children) {
      printParseTreeHelper(child, depth + 1);
    }
  };

  printParseTreeHelper(parseTree, 0);
}
