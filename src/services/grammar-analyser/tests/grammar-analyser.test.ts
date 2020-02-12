import { Lexer } from "../../lexer/lexer.service";
import { ParensAnalyser } from "../../parens-analyser/parens-analyser.service";
import { GrammarAnalyser } from "../grammar-analyser.service";

const lexer = new Lexer();
const parensAnalyser = new ParensAnalyser();
const grammarAnalyser = new GrammarAnalyser(lexer, parensAnalyser);

describe('Grammar analyser', () => {
  test('empty', () => {
    expect(() => {
      grammarAnalyser.analyse('');
    }).not.toThrow();
  });

  test('correct 1', () => {
    expect(() => {
      grammarAnalyser.analyse('{([[]()()[]])}');
    }).not.toThrow();
  });

  test('correct 2', () => {
    expect(() => {
      grammarAnalyser.analyse('a{([[a]fd(f)d(g)a[h]er]t)re}y');
    }).not.toThrow();
  });
  test('incorrect 1', () => {
    expect(() => {
      grammarAnalyser.analyse('a{([[a]fd(f)d(g)a[h]er]t)rey');
    }).toThrow();
  });
  test('incorrect 2', () => {
    expect(() => {
      grammarAnalyser.analyse('a{([[a}]fd(f)d(g)a[h]er]t)re}y');
    }).toThrow();
  });

  test('handling escapes 1', () => {
    expect(() => {
      grammarAnalyser.analyse('{\\}}');
    }).not.toThrow();
  });

  test('handling escapes 2', () => {
    expect(() => {
      grammarAnalyser.analyse('{\\\\}}');
    }).toThrow();
  });
});
