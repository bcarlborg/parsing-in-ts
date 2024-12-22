export type Grammar<NT extends string, T extends string> = Readonly<{
  startSymbol: NT;
  nonTerminals: Set<NT>;
  terminals: Set<T>;
  productions: Readonly<{
    [key in NT]: Readonly<Readonly<(NT | T)[]>[]>;
  }>;
}>;

export type Production<NT extends string, T extends string> = {
  key: NT | T;
  production: (NT | T)[];
};

export type ProductionSequence<
  NT extends string,
  T extends string
> = Production<NT, T>[];

export type ParseNode<NT extends string, T extends string> = {
  symbol: NT | T;
  children: ParseNode<NT, T>[];
};
