import { describe, test, expect } from 'vitest';
import { Stack } from './dataStructures';

describe('Stack', () => {
  test('should create an empty stack', () => {
    const stack = new Stack<number>();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  test('should push elements to the stack', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size()).toBe(3);
    expect(stack.isEmpty()).toBe(false);
  });

  test('should pop elements in LIFO order', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.isEmpty()).toBe(true);
  });

  test('should return undefined when popping from empty stack', () => {
    const stack = new Stack<number>();
    expect(stack.pop()).toBeUndefined();
  });

  test('should peek at top element without removing it', () => {
    const stack = new Stack<string>();
    stack.push('first');
    stack.push('second');
    expect(stack.peek()).toBe('second');
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe('second');
  });

  test('should return undefined when peeking at empty stack', () => {
    const stack = new Stack<number>();
    expect(stack.peek()).toBeUndefined();
  });

  test('should clear all elements', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBeUndefined();
  });

  test('should convert to array (top to bottom)', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.toArray()).toEqual([3, 2, 1]);
  });

  test('should work with different types', () => {
    const stack = new Stack<{ id: number; name: string }>();
    stack.push({ id: 1, name: 'Alice' });
    stack.push({ id: 2, name: 'Bob' });
    expect(stack.peek()).toEqual({ id: 2, name: 'Bob' });
    expect(stack.pop()).toEqual({ id: 2, name: 'Bob' });
    expect(stack.size()).toBe(1);
  });
});
