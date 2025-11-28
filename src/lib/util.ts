export const splitOnce = (str: string, sep: string): [string, string] => {
  const index = str.indexOf(sep);
  return index === -1
    ? [str, '']
    : [str.slice(0, index), str.slice(index + sep.length)];
};

export const sumArray = (arr: number[]): number => {
  return arr.reduce((acc, val) => acc + val, 0);
}

export const prodArray = (arr: number[]): number => {
  return arr.reduce((acc, val) => acc * val, 1);
}

export const minMax = (arr: number[]): [number, number] => [
  Math.min(...arr),
  Math.max(...arr),
];

export const countOccurrences = <T extends PropertyKey>(arr: T[]): Map<T, number> => {
  const freqMap = new Map<T, number>();

  for (const val of arr) {
    freqMap.set(val, (freqMap.get(val) ?? 0) + 1);
  }

  return freqMap;
}

export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

export function* range(start: number, end: number, step: number = 1): Generator<number> {
  let current = start;

  while (current < end) {
    yield current;
    current += step;
  }
}

export const arange = (start: number, end: number, step: number = 1): number[] => [...range(start, end, step)];

export const linspace = (start: number, stop: number, num: number): number[] => {
  const step = (stop - start) / (num - 1);
  return arange(start, stop, step);
};

export const manhattanDistance = (x1: number, y1: number, x2: number, y2: number): number => Math.abs(x1 - x2) + Math.abs(y1 - y2);

export const euclideanDistance = (x1: number, y1: number, x2: number, y2: number): number => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

// Greatest common divisor (Euclidean algorithm)
export const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

// Least common multiple
export const lcm = (a: number, b: number): number => Math.abs(a * b) / gcd(a, b);

// Function memoization decorator (optimize recursive DP solutions)
export function memoize<Args extends unknown[], ReturnType>(
  fn: (...args: Args) => ReturnType
): (...args: Args) => ReturnType {
  const cache = new Map<string, ReturnType>();

  return (...args: Args): ReturnType => {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key)!;
  };
}