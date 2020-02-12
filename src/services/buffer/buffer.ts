export class Buffer<T> {
  private bufferArray: T[];

  constructor() {
    this.bufferArray = [];
  }

  public add(element: T) {
    this.bufferArray.push(element);
  }

  public read(): string {
    return this.bufferArray.join();
  }

  public flush() {
    this.bufferArray = [];
  }
}