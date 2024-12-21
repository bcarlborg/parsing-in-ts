export type Grammar<NT extends string, T extends string> = Readonly<{
  startSymbol: NT;
  nonTerminals: Set<NT>;
  terminals: Set<T>;
  productions: Readonly<{
    [key in NT]: Readonly<Readonly<(NT | T)[]>[]>;
  }>;
}>;
