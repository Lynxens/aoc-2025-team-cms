import { readFileSync } from 'fs';

export function readFull(file_path: string): string {
  return readFileSync(file_path, { encoding: 'utf-8', flag: 'r' });
}

export function readLines(file_path: string): string[] {
  return readFull(file_path).split('\n');
}

// TODO: readIntMatrix(filePath: string): number[][]
// Read file and parse as 2D matrix of integers (whitespace or newline separated)

// TODO: readCharMatrix(filePath: string): string[][]
// Read file and parse as 2D matrix of characters (each line = row, each char = cell)

// TODO: stringToCharMatrix(str: string): string[][]
// Convert multiline string to 2D character matrix

// TODO: stringToIntMatrix(str: string): number[][]
// Convert multiline string to 2D integer matrix

// TODO: readWithRegex(filePath: string, pattern: RegExp): RegExpMatchArray[]
// Read file and extract all regex matches (useful for structured input parsing)