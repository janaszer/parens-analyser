export class Stack<T> {
  private stack: T[];

  constructor(elements: T[]) {
    this.stack = elements;
  }

  public push(element: T) {
    this.stack.push(element);
  }

  public pop(): T {
    if (this.stack.length === 0) {
      throw new Error('Stack is empty');
    }
    return this.stack.pop() as T;
  }

  public size(): number {
    return this.stack.length;
  }
}