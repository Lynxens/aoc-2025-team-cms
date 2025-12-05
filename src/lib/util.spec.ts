import { describe, test, expect } from 'vitest';
import {
  arange,
  countOccurrences,
  linspace,
  memoize,
  minMax,
  prodArray,
  range,
  splitOnce,
  sumArray,
  unique,
} from './util';

describe('splitOnce', () => {
  test('should return a 2-part tuple', () => {
    expect(splitOnce('a,b', ',')).toEqual(['a', 'b']);
  });

  test('should return an empty string for missing second part', () => {
    expect(splitOnce('abcd', ',')).toEqual(['abcd', '']);
  });

  test('should split only on the first occurrence', () => {
    expect(splitOnce('a,b,c,d', ',')).toEqual(['a', 'b,c,d']);
  });
});

test('sumArray', () => {
  expect(sumArray([5, 6, 9])).toEqual(20);
});

test('prodArray', () => {
  expect(prodArray([5, 6, 10])).toEqual(300);
});

test('minMax', () => {
  expect(minMax([9, 3, 1, 5])).toEqual([1, 9]);
});

test('countOccurrences', () => {
  expect(countOccurrences([2, 1, 4, 4, 3, 9, 1])).toEqual(
    new Map([
      [1, 2],
      [2, 1],
      [3, 1],
      [4, 2],
      [9, 1],
    ])
  );
});

test('unique', () => {
  expect(unique([2, 1, 4, 4, 3, 9, 1])).toEqual([2, 1, 4, 3, 9]);
});

describe('range', () => {
  test('should generate all numbers in range', () => {
    const testRange = range(5, 9);
    expect(testRange.next()).toEqual({ value: 5, done: false });
    expect(testRange.next()).toEqual({ value: 6, done: false });
    expect(testRange.next()).toEqual({ value: 7, done: false });
    expect(testRange.next()).toEqual({ value: 8, done: false });
    expect(testRange.next()).toEqual({ value: undefined, done: true });
  });

  test('should handle step', () => {
    const testRange = range(0, 12, 2);
    expect(testRange.next()).toEqual({ value: 0, done: false });
    expect(testRange.next()).toEqual({ value: 2, done: false });
    expect(testRange.next()).toEqual({ value: 4, done: false });
    expect(testRange.next()).toEqual({ value: 6, done: false });
    expect(testRange.next()).toEqual({ value: 8, done: false });
    expect(testRange.next()).toEqual({ value: 10, done: false });
    expect(testRange.next()).toEqual({ value: undefined, done: true });
  });

  test('should handle negative step', () => {
    const testRange = range(3, 0, -1);
    expect(testRange.next()).toEqual({ value: 3, done: false });
    expect(testRange.next()).toEqual({ value: 2, done: false });
    expect(testRange.next()).toEqual({ value: 1, done: false });
    expect(testRange.next()).toEqual({ value: undefined, done: true });
  });
});

test('arange', () => {
  expect(arange(1, 3)).toEqual([1, 2]);
  expect(arange(0, 10, 3)).toEqual([0, 3, 6, 9]);
  expect(arange(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
});

test('linspace', () => {
  expect(linspace(0, 2, 5)).toEqual([0, 0.5, 1, 1.5, 2]);
});

describe('memoize', () => {
  let callCount = 0;
  const memoizedAdd = memoize((a: number, b: number) => {
    callCount++;
    return a + b;
  });

  expect(memoizedAdd(1, 2)).toBe(3);
  expect(callCount).toBe(1);

  expect(memoizedAdd(1, 2)).toBe(3);
  expect(callCount).toBe(1); // Should not increment callCount

  expect(memoizedAdd(2, 3)).toBe(5);
  expect(callCount).toBe(2);

  expect(memoizedAdd(1, 2)).toBe(3);
  expect(callCount).toBe(2); // Should not increment callCount
});
