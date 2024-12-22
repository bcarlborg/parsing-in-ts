import { GrammarData } from "../types";

export class Grammar<NT extends string, T extends string> {
  private grammarData: GrammarData<NT, T>;

  constructor(data: GrammarData<NT, T>) {
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

  isNonTerminalSymbol(symbol: string): symbol is NT {
    return this.grammarData.nonTerminals.has(symbol as NT);
  }

  isTerminalSymbol(symbol: string): symbol is T {
    return this.grammarData.terminals.has(symbol as T);
  }
}
