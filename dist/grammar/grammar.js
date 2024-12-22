"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grammar = void 0;
class Grammar {
    grammarData;
    constructor(data) {
        this.grammarData = data;
    }
    get startSymbol() {
        return this.grammarData.startSymbol;
    }
    get nonTerminals() {
        return this.grammarData.nonTerminals;
    }
    get terminals() {
        return this.grammarData.terminals;
    }
    get productions() {
        return this.grammarData.productions;
    }
    isNonTerminalSymbol(symbol) {
        return this.grammarData.nonTerminals.has(symbol);
    }
    isTerminalSymbol(symbol) {
        return this.grammarData.terminals.has(symbol);
    }
}
exports.Grammar = Grammar;
