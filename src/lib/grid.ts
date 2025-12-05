import { manhattanDistance, euclideanDistance } from "src/lib/util";

export const createFilledMatrix = <T>(
  rows: number,
  cols: number,
  fillValue: T
): T[][] => Array.from({ length: rows }, () => Array(cols).fill(fillValue));

// Transpose a 2D matrix (swap rows and columns)
export const transpose = <T>(matrix: T[][]): T[][] => {
  if (matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed: T[][] = createFilledMatrix(cols, rows, matrix[0][0]);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      transposed[c][r] = matrix[r][c];
    }
  }

  return transposed;
};

// Map function over all values in grid
export const map2DGrid = <T, U>(grid: T[][], fn: (val: T) => U): U[][] => {
  return grid.map((row) => row.map(fn));
};

// Rotate 2D matrix 90 degrees
export const rotateMatrix90 = <T>(
  matrix: T[][],
  clockwise?: boolean
): T[][] => {
  if (clockwise) {
    return transpose(matrix).map((row) => row.reverse());
  } else {
    return transpose(matrix).reverse();
  }
};

// Find all coordinates where predicate returns true
// Returns array of Coord objects for easy manipulation
export const findIndices2D = <T>(
  matrix: T[][],
  predicate: (val: T) => boolean
): Coord[] => {
  const coords: Coord[] = [];
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (predicate(matrix[r][c])) {
        coords.push(new Coord(r, c));
      }
    }
  }
  
  return coords;
}

export const gridDimensions = <T>(grid: T[][]): { gridHeight: number; gridWidth: number } => {
  const gridHeight = grid.length;
  const gridWidth = gridHeight > 0 ? grid[0].length : 0;

  return { gridHeight, gridWidth };
}

// Check if coordinate is within grid bounds (prevents index out of bounds)
export const within2DGrid = (row: number, col: number, gridHeight: number, gridWidth: number): boolean => {
  return row >= 0 && row < gridHeight && col >= 0 && col < gridWidth;
}

// Get value at coordinate in matrix (returns undefined if out of bounds)
export const getValueAt = <T>(matrix: T[][], coord: Coord): T | undefined {
  const { gridHeight, gridWidth } = gridDimensions(matrix);
  if (!within2DGrid(coord.row, coord.col, gridHeight, gridWidth)) {
    return undefined;
  }

  return matrix[coord.row][coord.col];
}
  
// Set value at coordinate in matrix (returns false if out of bounds)
export const setValueAt = <T>(matrix: T[][], coord: Coord, value: T): boolean => {
  const { gridHeight, gridWidth } = gridDimensions(matrix);
  if (!within2DGrid(coord.row, coord.col, gridHeight, gridWidth)) {
    return false;
  }
  
  matrix[coord.row][coord.col] = value;
  return true;
};

export const copy2DGrid = <T>(grid: T[][]): T[][] => {
  return grid.map(row => [...row]);
};

// =============================================================================
// Coord Class
// =============================================================================

export class Coord {
  constructor(
    public row: number,
    public col: number
  ) {}

  add(other: Coord): Coord {
    return new Coord(this.row + other.row, this.col + other.col);
  }

  subtract(other: Coord): Coord {
    return new Coord(this.row - other.row, this.col - other.col);
  }

  equals(other: Coord): boolean {
    return this.row === other.row && this.col === other.col;
  }

  toArray(): [number, number] {
    return [this.row, this.col];
  }

  toString(): string {
    return `(${this.row},${this.col})`;
  }

  step(direction: Direction): Coord {
    const vector = toVector(direction);
    return this.add(vector);
  }
  
  stepN(direction: Direction, n: number): Coord {
    const vector = toVector(direction);
    return new Coord(
      this.row + vector.row * n,
      this.col + vector.col * n
    );
  }

  within2DGrid(gridHeight: number, gridWidth: number): boolean {
    return within2DGrid(this.row, this.col, gridHeight, gridWidth);
  }
  
  manhattanDistance(other: Coord): number {
    return manhattanDistance(this.row, this.col, other.row, other.col);
  }

  euclideanDistance(other: Coord): number {
    return euclideanDistance(this.row, this.col, other.row, other.col);
  }

  //   // Neighbor access
  neumannNeighbors(gridHeight: number, gridWidth: number): NeighborSet {
    const neighbors = [
      this.step(Direction.North),
      this.step(Direction.East),
      this.step(Direction.South),
      this.step(Direction.West),
    ].map((coord) =>
      coord.within2DGrid(gridHeight, gridWidth) ? coord : null
    );
    
    return new NeighborSet(
      neighbors[0],
      neighbors[1],
      neighbors[2],
      neighbors[3]
    );
  }

  mooreNeighbors(gridHeight: number, gridWidth: number): NeighborSet8 {
    const neighbors = [
      this.step(Direction.North),
      this.step(Direction.NorthEast),
      this.step(Direction.East),
      this.step(Direction.SouthEast),
      this.step(Direction.South),
      this.step(Direction.SouthWest),
      this.step(Direction.West),
      this.step(Direction.NorthWest),
    ].map((coord) =>
      coord.within2DGrid(gridHeight, gridWidth) ? coord : null
    );
    
    return new NeighborSet8(
      neighbors[0],
      neighbors[1],
      neighbors[2],
      neighbors[3],
      neighbors[4],
      neighbors[5],
      neighbors[6],
      neighbors[7]
    );
  }
}


// =============================================================================
// Direction Enum & Utilities
// =============================================================================

export enum Direction {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
  NorthEast = 'NE',
  SouthEast = 'SE',
  SouthWest = 'SW',
  NorthWest = 'NW',
}

export const turnLeft = (dir: Direction): Direction => {
  switch (dir) {
    case Direction.North:
      return Direction.West;
    case Direction.West:
      return Direction.South;
    case Direction.South:
      return Direction.East;
    case Direction.East:
      return Direction.North;
    default:
      throw new Error('turnLeft is only defined for cardinal directions');
  }
};

export const turnRight = (dir: Direction): Direction => {
  switch (dir) {
    case Direction.North:
      return Direction.East;
    case Direction.East:
      return Direction.South;
    case Direction.South:
      return Direction.West;
    case Direction.West:
      return Direction.North;
    default:
      throw new Error('turnRight is only defined for cardinal directions');
  }
};

export const reverseDirection = (dir: Direction): Direction => {
  switch (dir) {
    case Direction.North:
      return Direction.South;
    case Direction.East:
      return Direction.West;
    case Direction.South:
      return Direction.North;
    case Direction.West:
      return Direction.East;
    case Direction.NorthEast:
      return Direction.SouthWest;
    case Direction.SouthEast:
      return Direction.NorthWest;
    case Direction.SouthWest:
      return Direction.NorthEast;
    case Direction.NorthWest:
      return Direction.SouthEast;
    default:
      throw new Error('reverse is only defined for cardinal directions');
  }
};

export const toVector = (dir: Direction): Coord => {
  switch (dir) {
    case Direction.North:
      return new Coord(-1, 0);
    case Direction.East:
      return new Coord(0, 1);
    case Direction.South:
      return new Coord(1, 0);
    case Direction.West:
      return new Coord(0, -1);
    case Direction.NorthEast:
      return new Coord(-1, 1);
    case Direction.SouthEast:
      return new Coord(1, 1);
    case Direction.SouthWest:
      return new Coord(1, -1);
    case Direction.NorthWest:
      return new Coord(-1, -1);
    default:
      throw new Error('Invalid direction');
  }
};

export const fromVector = (row: number, col: number) => {
  if (row === -1 && col === 0) return Direction.North;
  if (row === 0 && col === 1) return Direction.East;
  if (row === 1 && col === 0) return Direction.South;
  if (row === 0 && col === -1) return Direction.West;
  if (row === -1 && col === 1) return Direction.NorthEast;
  if (row === 1 && col === 1) return Direction.SouthEast;
  if (row === 1 && col === -1) return Direction.SouthWest;
  if (row === -1 && col === -1) return Direction.NorthWest;
  return null;
};

export const isCardinal = (dir: Direction): boolean => {
  return [
    Direction.North,
    Direction.East,
    Direction.South,
    Direction.West,
  ].includes(dir);
};

export const isDiagonal = (dir: Direction): boolean => {
  return [
    Direction.NorthEast,
    Direction.SouthEast,
    Direction.SouthWest,
    Direction.NorthWest,
  ].includes(dir);
};

// =============================================================================
// Neighbor Iterators
// =============================================================================

export class NeighborSet {
  constructor(
    public N: Coord | null, // null if outside grid bounds
    public E: Coord | null,
    public S: Coord | null,
    public W: Coord | null
  ) {
  }

  // Convert to array, including nulls
  toArrayAll(): (Coord | null)[] {
    return [this.N, this.E, this.S, this.W];
  }

  // Convert to array, excluding nulls
  toArray(): Coord[] {
    return this.toArrayAll().filter(
      (c) => c !== null
    ) as Coord[];
  }
  
  // Get [direction, coord] pairs (non-null only)
  toEntries(): [Direction, Coord][] {
    const entries: [Direction, Coord][] = [];
    if (this.N !== null) entries.push([Direction.North, this.N]);
    if (this.E !== null) entries.push([Direction.East, this.E]);
    if (this.S !== null) entries.push([Direction.South, this.S]);
    if (this.W !== null) entries.push([Direction.West, this.W]);
    return entries;
  }

  // Get only N/E/S/W as NeighborSet
  filter(predicate: (coord: Coord) => boolean): Coord[] {
    return this.toArray().filter(predicate);
  }
}

export class NeighborSet8 {
  constructor(
    public N: Coord | null, // null if outside grid bounds
    public NE: Coord | null,
    public E: Coord | null,
    public SE: Coord | null,
    public S: Coord | null,
    public SW: Coord | null,
    public W: Coord | null,
    public NW: Coord | null
  ) {
  }

  // Convert to array, including nulls
  toArrayAll(): (Coord | null)[] {
    return [this.N, this.NE, this.E, this.SE, this.S, this.SW, this.W, this.NW];
  }

  // Convert to array, excluding nulls
  toArray(): Coord[] {
    return this.toArrayAll().filter(
      (c) => c !== null
    ) as Coord[];
  }

  // Get [direction, coord] pairs (non-null only)
  toEntries(): [Direction, Coord][] {
    const entries: [Direction, Coord][] = [];
    if (this.N !== null) entries.push([Direction.North, this.N]);
    if (this.NE !== null) entries.push([Direction.NorthEast, this.NE]);
    if (this.E !== null) entries.push([Direction.East, this.E]);
    if (this.SE !== null) entries.push([Direction.SouthEast, this.SE]);
    if (this.S !== null) entries.push([Direction.South, this.S]);
    if (this.SW !== null) entries.push([Direction.SouthWest, this.SW]);
    if (this.W !== null) entries.push([Direction.West, this.W]);
    if (this.NW !== null) entries.push([Direction.NorthWest, this.NW]);
    return entries;
  }

  cardinalOnly(): NeighborSet {
    return new NeighborSet(this.N, this.E, this.S, this.W);
  }

  filter(predicate: (coord: Coord) => boolean): Coord[] {
    return this.toArray().filter(predicate);
  }
}
