"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructParseTreeFromLeftMostProductionSequence = constructParseTreeFromLeftMostProductionSequence;
/**
 * Constructs a parse tree from a left-most production sequence.
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
            if (grammar.nonTerminals.has(key)) {
                nodeStack.push(...childNodes.reverse());
            }
        }
    }
    return parseTree;
}
