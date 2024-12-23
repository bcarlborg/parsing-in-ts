// ===============================================================================
// Ideation for how to improve and simply the DFS
// The previous implementation was a bit complex and hard to understand.
// This implementation tries break up the code in such a way that the DFS
// pattern is more obvious and easier to pattern match against.
//
// TODO:
// - [ ] Wrap my head around how tracking the parents works exactly.
//
// ===============================================================================

function getChilden(stackItem: number) {
  return [stackItem + 1, stackItem + 2];
}

function isGoal(stackItem: number) {
  return stackItem === 10;
}

function shouldContinueExploringPath(stackItem: number) {
  return true;
}

function pathFromStackItem(
  stackItem: number,
  parents: { [key: number]: number }
) {
  return [stackItem];
}

function dfsFindDerivationSequenceForInput() {
  const stack: number[] = [];
  const parents: {
    [key: number]: number;
  } = {};

  while (stack.length !== 0) {
    const stackItem = stack.pop();

    if (stackItem === undefined) {
      throw new Error("Attempted to pop an empty stack");
    }

    // match leading terminal symbols
    // if there are no leading terminal symbols, then this is not a valid path
    if (!shouldContinueExploringPath(stackItem)) {
      continue;
    }

    if (isGoal(stackItem)) {
      return pathFromStackItem(stackItem, parents);
    }

    const nextChildren = getChilden(stackItem);
    for (const child of nextChildren) {
      stack.push(child);
      parents[child] = stackItem;
    }
  }
}

function getParseTreeFromLeftMostDerivationSequence(path: number[]) {}

function parse() {
  const path = dfsFindDerivationSequenceForInput();
  if (!path) {
    return null;
  }

  const parseTree = getParseTreeFromLeftMostDerivationSequence(path);

  return parseTree;
}
