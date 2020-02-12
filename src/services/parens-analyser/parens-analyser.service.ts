import { Stack } from "../stack/stack";

export class ParensAnalyser {

  private readonly BRACKETS: Map<string, string>;
  
  constructor() {
    this.BRACKETS = new Map([
      ['(', ')'],
      ['{', '}'],
      ['[', ']'],
    ])
  }
  ;

  public analyse(lexems: string[]) {
    const openingBrackets = Array.from(this.BRACKETS.keys());
    const closingBrackets = Array.from(this.BRACKETS.values());
    const resultStack = lexems.reduce(
      (stack, lexem) => {
        if (openingBrackets.includes(lexem)) {
          stack.push(lexem);
        }
        if (closingBrackets.includes(lexem)) {
          const currentlyOpenedParen = stack.pop();
          if (!this.matchParens(currentlyOpenedParen, lexem)) {
            throw new Error('Parens do not match. Analysis failed');
          }
        }
        return stack;
      },
      new Stack<string>([]),
    );
    if (resultStack.size() > 0) {
      throw new Error('Not all parens are closed');
    }
  }

  private matchParens(opening: string, closing: string): boolean {
    const matchParen = this.BRACKETS.get(opening);
    if (!matchParen) {
      throw new Error('Internal error. Parenthesis not found.');
    }
    if (matchParen !== closing) {
      return false;
    }
    return true;
  }
}