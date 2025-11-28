export const splitOnce = (str: string, sep: string): [string, string] => {
  const index = str.indexOf(sep);
  return index === -1
    ? [str, '']
    : [str.slice(0, index), str.slice(index + sep.length)];
};

// TODO: sumArray(arr: number[]): number
// Sum all numbers in array (common reducer for AoC)

// TODO: prodArray(arr: number[]): number
// Multiply all numbers in array (product reducer)

// TODO: minMax(arr: number[]): [number, number]
// Return [min, max] tuple from array

// TODO: gcd(a: number, b: number): number
// Greatest common divisor (Euclidean algorithm)

// TODO: lcm(a: number, b: number): number
// Least common multiple

// TODO: range(start: number, end?: number, step?: number): number[]
// Python-style range generator (useful for iteration)

// TODO: transpose<T>(matrix: T[][]): T[][]
// Transpose a 2D matrix (swap rows and columns)

// TODO: rotateMatrix90<T>(matrix: T[][], clockwise?: boolean): T[][]
// Rotate 2D matrix 90 degrees

// TODO: manhattanDistance(x1: number, y1: number, x2: number, y2: number): number
// Calculate Manhattan/taxicab distance between two points

// TODO: euclideanDistance(x1: number, y1: number, x2: number, y2: number): number
// Calculate Euclidean distance between two points

// TODO: countOccurrences<T>(arr: T[]): Map<T, number>
// Count frequency of each element in array

// TODO: groupBy<T, K>(arr: T[], keyFn: (item: T) => K): Map<K, T[]>
// Group array elements by key function result

// TODO: memoize<T extends (...args: any[]) => any>(fn: T): T
// Function memoization decorator (optimize recursive DP solutions)