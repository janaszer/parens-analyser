import { Buffer } from "../buffer/buffer";

export class Lexer {

  private readonly ESCAPE_CHAR = '\\';

  public isLexem(characters: string): boolean {
    if (characters.length === 0) {
      return false;
    }
    if (characters[0] === this.ESCAPE_CHAR && characters.length < 2) {
      return false;
    }

    return true;
  }

  public parse(input: string): string[] {
    const inputChars = input.split('');
    const [lexems, buffer] = inputChars.reduce(
      ([lexems, buffer], char) => {
        buffer.add(char);
        if (this.isLexem(buffer.read())) {
          lexems.push(buffer.read());
          buffer.flush();
        }
        return [lexems, buffer];
      },
      [[] as string[], new Buffer()]);
    if (buffer.read() !== '') {
      throw new Error('Error occurred at the end of input');
    }
    return lexems;
  }
}
