import { readFileSync } from 'fs';

export function readFull(file_path: string): string {
  return readFileSync(file_path, { encoding: 'utf-8', flag: 'r' });
}

export function readLines(file_path: string): string[] {
  return readFull(file_path).split('\n');
}

export function readCharMatrix(filePath: string): string[][] {
  return stringToCharMatrix(readFull(filePath));
}

export function readMatrixAndMap<T>(filePath: string, mapFn: (value: string) => T): T[][] {
  return stringToMappedMatrix(readFull(filePath), mapFn);
}

export function readIntMatrix(filePath: string): number[][] {
  return readMatrixAndMap(filePath, Number);
}

export function readBooleanMatrix(filePath: string, trueChar: string = '#'): boolean[][] {
  return readMatrixAndMap(filePath, (ch) => ch === trueChar);
}

export function stringToCharMatrix(str: string): string[][] {
  const lines = str.split('\n');
  return lines.map(line => [...line]);
}

export function stringToMappedMatrix<T>(str: string, mapFn: (value: string) => T): T[][] {
  const lines = str.split('\n');
  return lines.map(line => [...line].map(mapFn));
}

export function stringToIntMatrix(str: string): number[][] {
  return stringToMappedMatrix(str, Number);
}

export function stringToBooleanMatrix(str: string, trueChar: string = '#'): boolean[][] {
  return stringToMappedMatrix(str, (ch) => ch === trueChar);
}

export function readWithRegex(filePath: string, pattern: RegExp): RegExpMatchArray[] {
  const content = readFull(filePath);
  const regex = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');

  const matches: RegExpMatchArray[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    matches.push(match);
  }
  
  return matches;
}