// TODO: class Queue<T>
// FIFO queue with enqueue(), dequeue(), peek(), isEmpty(), size()
// Useful for BFS algorithms

// TODO: class PriorityQueue<T>
// Min/max heap-based priority queue with insert(), extractMin/Max(), peek()
// Essential for Dijkstra's algorithm, A*, etc.

/**
 * LIFO (Last-In-First-Out) Stack implementation
 * Useful for DFS, parentheses matching, backtracking, etc.
 */
export class Stack<T> {
  private items: T[] = [];

  /**
   * Add an element to the top of the stack
   */
  push(element: T): void {
    this.items.push(element);
  }

  /**
   * Remove and return the top element from the stack
   * @returns The top element, or undefined if stack is empty
   */
  pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * View the top element without removing it
   * @returns The top element, or undefined if stack is empty
   */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Check if the stack is empty
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Get the number of elements in the stack
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Remove all elements from the stack
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Convert stack to array (top to bottom)
   */
  toArray(): T[] {
    return [...this.items].reverse();
  }
}
