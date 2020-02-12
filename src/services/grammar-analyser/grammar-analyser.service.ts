import { Lexer } from "../lexer/lexer.service";
import { ParensAnalyser } from "../parens-analyser/parens-analyser.service";

export class GrammarAnalyser {
  constructor(
    private lexer: Lexer,
    private parensAnalyser: ParensAnalyser,
  ) { }

  public analyse(input: string) {
    const lexems = this.lexer.parse(input);
    this.parensAnalyser.analyse(lexems);
  }
}
