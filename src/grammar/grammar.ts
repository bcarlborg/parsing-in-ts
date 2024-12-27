import { GrammarData, Production } from "../types";

export class Grammar<NT extends string, T extends string> {
  private grammarData: GrammarData<NT, T>;

  private productionsBySymbol: Partial<{
    [key in NT]: Production<NT, T>["production"][];
  }> = {};

  private productionsByRightHandSide: Partial<{
    [key in string]: NT[];
  }> = {};

  constructor(data: GrammarData<NT, T>) {
    this.grammarData = data;

    for (const production of data.productions) {
      if (this.productionsBySymbol[production.symbol]) {
        this.productionsBySymbol[production.symbol]?.push(
          production.production
        );
      } else {
        this.productionsBySymbol[production.symbol] = [production.production];
      }

      const rightHandSide = production.production.join("");
      if (this.productionsByRightHandSide[rightHandSide]) {
        this.productionsByRightHandSide[rightHandSide]?.push(production.symbol);
      } else {
        this.productionsByRightHandSide[rightHandSide] = [production.symbol];
      }
    }
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

  getProductionsByRightHandSide(rightHandSide: string): NT[] {
    return this.productionsByRightHandSide[rightHandSide] ?? [];
  }

  getProductionsBySymbol(symbol: NT): Production<NT, T>["production"][] {
    return this.productionsBySymbol[symbol] ?? [];
  }
}
