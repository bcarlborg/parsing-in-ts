"use strict";
/** =======================================================================================
 * Naive Top-Down Depth-First Search Parser
 *
 * This parser is a simple implementation of a top-down depth-first search parser.
 * It is not optimized for performance, but it is easy to understand and modify.
 * ========================================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.naiveTopDownDepthFirstSearchParse = naiveTopDownDepthFirstSearchParse;
function naiveTopDownDepthFirstSearchParse(grammar, input, debug = false) {
    if (debug) {
        console.log(`========== BEGIN PARSE OF INPUT: ${input} ==========`);
    }
    // The stack is used to store the current possible parsing branches.
    const stack = [];
    // our parsing algorithm will explore every possible expansion of the start symbol
    stack.push({
        currentInputIndex: 0,
        sententialForm: [grammar.startSymbol],
    });
    /**
     * The parsing loop.
     *
     * Pops an item from the stack.
     * If the item's sentential form begins with a terminal, we attempt to match that
     * terminal. If the terminal matches the current input character, we advance the
     * input character, and push a new item onto the stack with the terminal removed.
     *
     * If the item's sentential form begins with a non-terminal, we push new sentential
     * forms with each possible expansion of that non-terminal.
     *
     * If we find a stack item for which there are no more input characters to match
     * and the sentential form is empty, then we have successfully parsed the input.
     */
    while (stack.length > 0) {
        const stackItem = stack.pop();
        if (!stackItem) {
            // this will never happen, we need it for the type checker
            throw new Error("Attempted to pop an empty stack");
        }
        /**
         * extract information about this parse branch from the current stack item
         */
        const { currentInputIndex, sententialForm } = stackItem;
        const currentInputCharacter = input[currentInputIndex];
        const firstSymbolInSententialForm = sententialForm[0];
        if (debug) {
            console.log("parse iteration ------------");
            console.log(`currentInputCharacter: ${currentInputCharacter}`);
            console.log(`sententialForm: ${sententialForm.length ? sententialForm.join(" ") : "empty"}`);
        }
        /**
         * If we find a stack item for which there are no more input characters to match
         * and the sentential form is empty, then we have successfully parsed the input.
         */
        if (currentInputCharacter === undefined &&
            firstSymbolInSententialForm === undefined) {
            return true;
        }
        /**
         * If there are more input characters to match, but the sentential form is empty,
         * then this parse branch is not valid, and we can simply continue without adding
         * any new exploration branches to the stack.
         */
        if (currentInputCharacter !== undefined &&
            firstSymbolInSententialForm === undefined) {
            continue;
        }
        /**
         * How we continue exploring this parse branch depends on wether the first
         * symbol in the sentential form is a terminal or a non-terminal.
         */
        const isTerminal = grammar.terminals.has(firstSymbolInSententialForm);
        const isNonTerminal = grammar.nonTerminals.has(firstSymbolInSententialForm);
        /**
         * If the first symbol in the sentential form is a terminal, then this branch
         * can only be valid if the terminal matches the current input character.
         */
        if (isTerminal) {
            if (firstSymbolInSententialForm === currentInputCharacter) {
                /**
                 * If the first symbol in the sentential form matches, we can add
                 * a new item to the stack with that terminal removed from the
                 * sentential form and the current input index incremented by 1.
                 */
                stack.push({
                    currentInputIndex: currentInputIndex + 1,
                    sententialForm: sententialForm.slice(1),
                });
                continue;
            }
            /**
             * If the first symbol in the sentential form does not match, then this
             * parsing branch is not valid, and we can simply continue without adding
             * any new exploration branches to the stack.
             */
            continue;
        }
        /**
         * If the first symbol in the sentential form is a non-terminal, then we need
         * to explore all possible expansions of that non-terminal.
         */
        if (isNonTerminal) {
            /**
             * First, we get all productions for the non-terminal.
             */
            const productionsForNonTerminal = grammar.productions[firstSymbolInSententialForm];
            /**
             * Then we explore every parse tree possibility for this non-terminal
             * by pushing new items with updated sentential forms based on those
             * productions.
             */
            for (const productionForNonTerminal of productionsForNonTerminal) {
                stack.push({
                    currentInputIndex,
                    sententialForm: [
                        ...productionForNonTerminal,
                        ...sententialForm.slice(1),
                    ],
                });
            }
            continue;
        }
        /**
         * If the first symbol in the sentential form is not a terminal or non-terminal,
         * then we have encountered an error.
         */
        throw new Error(`Unexpected symbol ${firstSymbolInSententialForm} in sentential form: ${sententialForm.join(" ")}`);
    }
    /**
     * If we have exhausted all possible parse branches and found no valid parse,
     * then we return false.
     */
    return false;
}
