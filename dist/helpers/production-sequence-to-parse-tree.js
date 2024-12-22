"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructParseTreeFromLeftMostProductionSequence = constructParseTreeFromLeftMostProductionSequence;
/**
 * Constructs a parse tree from a left-most production sequence.
 *
 * I can't lie, the alogorithm here sort of breaks my brain a bit...
 * but the idea is that we have a list of production like so:
 *
 * { key: 'S', production: [ 'T', '+', 'S' ] },
 * { key: 'T', production: [ '1' ] },
 * { key: 'S', production: [ 'T' ] },
 * { key: 'T', production: [ '1' ] }
 *
 * And we need to construct a parse tree like so:
 *    S
 *  / | \
 * T  +  S
 * |     |
 * 1     T
 *       |
 *       1
 *
 * In order to construct the parse tree, we use a stack to keep track
 * of the non-terminal nodes that we should be adding children to.
 *
 * This algorithm loops over each production in the sequence.
 * We then loop over each symbol in the production.
 *
 * If the symbol is a terminal, we add it as a child to the current node.
 * If the symbol is a non-terminal, we add it as a child to the current node
 * and we push it to the stack of non terminal nodes so that on the next
 * iteration, we can pop off the stack and add children to it.
 */
function constructParseTreeFromLeftMostProductionSequence(grammar, productionSequence, debug = false) {
    const parseTree = {
        symbol: grammar.startSymbol,
        children: [],
    };
    /**
     * We use a stack to keep track of the nodes we are adding children to.
     */
    const nodeStack = [parseTree];
    /**
     * We iterate over the production in the sequence and add
     * children to a node for this production.
     */
    for (const production of productionSequence) {
        const { symbol: productionSymbol, production: productionSymbols } = production;
        const currentNode = nodeStack.pop();
        // This shouldn't happen if the production is valid
        if (!currentNode) {
            throw new Error("Attempted to pop an empty stack");
        }
        if (productionSymbol !== currentNode.symbol) {
            throw new Error(`Attempted to add children to a node that does not match the production key: ${productionSymbol} !== ${currentNode.symbol}`);
        }
        // Create child nodes for all of the symbols in the production
        const childNodes = productionSymbols.map((symbol) => {
            return {
                symbol,
                children: [],
            };
        });
        // Add all of those child nodes to the current node
        currentNode.children.push(...childNodes);
        const nonTerminalNodes = childNodes.filter((node) => grammar.nonTerminals.has(node.symbol));
        // Push all the non-terminal nodes to node stack
        // so that we can continue to construct the parse tree
        nodeStack.push(...nonTerminalNodes.reverse());
    }
    return parseTree;
}
