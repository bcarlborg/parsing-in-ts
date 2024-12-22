"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructParseTreeFromLeftMostProductionSequence = constructParseTreeFromLeftMostProductionSequence;
function constructParseTreeFromLeftMostProductionSequence(grammar, productionSequence) {
    const parseTree = {
        symbol: grammar.startSymbol,
        children: [],
    };
    const nodeStack = [parseTree];
    for (const { key, production } of productionSequence) {
        console.log(`nodeStack: ${nodeStack.map((node) => node.symbol).join(" ")}`);
        console.log(`processing production: ${key} -> ${production.join(" ")}`);
        const currentNode = nodeStack.pop();
        if (!currentNode) {
            throw new Error("Attempted to pop an empty stack");
        }
        console.log(`production key: ${key} currentNode symbol: ${currentNode.symbol}`);
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
