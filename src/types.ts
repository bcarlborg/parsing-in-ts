export type GrammarData<NT extends string, T extends string> = Readonly<{
  startSymbol: NT;
  nonTerminals: Set<NT>;
  terminals: Set<T>;
  productions: Production<NT, T>[];
}>;

export type Production<NT extends string, T extends string> = {
  symbol: NT;
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
