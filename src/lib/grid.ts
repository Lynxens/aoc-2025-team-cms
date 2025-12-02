// =============================================================================
// Matrix Creation & Utilities
// =============================================================================

// TODO: createFilledMatrix<T>(rows: number, cols: number, fillValue: T): T[][]
// Create 2D matrix pre-filled with specific value

// TODO: transpose<T>(matrix: T[][]): T[][]
// Transpose a 2D matrix (swap rows and columns)

// TODO: rotateMatrix90<T>(matrix: T[][], clockwise?: boolean): T[][]
// Rotate 2D matrix 90 degrees

// TODO: findIndices2D<T>(matrix: T[][], predicate: (val: T) => boolean): Coord[]
// Find all coordinates where predicate returns true
// Returns array of Coord objects for easy manipulation

// TODO: getValueAt<T>(matrix: T[][], coord: Coord): T | undefined
// Get value at coordinate in matrix (returns undefined if out of bounds)
// Example: getValueAt(grid, new Coord(2, 3))

// TODO: setValueAt<T>(matrix: T[][], coord: Coord, value: T): boolean
// Set value at coordinate in matrix (returns false if out of bounds)
// Example: setValueAt(grid, new Coord(2, 3), 'X')

// TODO: within2DGrid(coord: Coord, rows: number, cols: number): boolean
// OR: within2DGrid(row: number, col: number, grid: any[][]): boolean (overload)
// Check if coordinate is within grid bounds (prevents index out of bounds)

// TODO: map2DGrid<T, U>(grid: T[][], fn: (val: T) => U): U[][]
// Map function over all values in grid

// TODO: copy2DGrid<T>(grid: T[][]): T[][]
// Copy grid (deep copy for 2D arrays)

// =============================================================================
// Coord Class
// =============================================================================

// TODO: class Coord { 
//   constructor(public row: number, public col: number) {}
//   
//   // Basic operations
//   add(other: Coord): Coord                    // Add two coordinates
//   subtract(other: Coord): Coord               // Subtract coordinates
//   equals(other: Coord): boolean               // Check equality
//   toString(): string                          // String representation "(row,col)"
//   
//   // Direction-based movement
//   step(direction: Direction): Coord           // Move one step in direction
//   stepN(direction: Direction, n: number): Coord  // Move n steps in direction
//   
//   // Neighbor access
//   neighbors(): NeighborSet                    // Get all 4 orthogonal neighbors
//   neighborsAll(): NeighborSet8                // Get all 8 neighbors (Moore)
//   
//   // Distance calculations
//   manhattanDistance(other: Coord): number     // Taxicab distance
//   euclideanDistance(other: Coord): number     // Straight-line distance
// }

// =============================================================================
// Direction Enum & Utilities
// =============================================================================

// TODO: enum Direction { 
//   North = 'N', 
//   East = 'E', 
//   South = 'S', 
//   West = 'W',
//   NorthEast = 'NE',
//   SouthEast = 'SE', 
//   SouthWest = 'SW',
//   NorthWest = 'NW'
// }
// Cardinal and intercardinal directions

// TODO: Direction utility methods (as namespace or helper functions):
// - turnLeft(dir: Direction): Direction         // Rotate 90° left (cardinal only)
// - turnRight(dir: Direction): Direction        // Rotate 90° right (cardinal only)
// - reverse(dir: Direction): Direction          // Get opposite direction
// - toVector(dir: Direction): Coord             // Convert to coordinate delta
// - fromVector(row: number, col: number): Direction | null  // Vector to direction
// - isCardinal(dir: Direction): boolean         // Check if N/E/S/W
// - isDiagonal(dir: Direction): boolean         // Check if NE/SE/SW/NW

// =============================================================================
// Neighbor Iterators
// =============================================================================

// TODO: interface NeighborSet {
//   N: Coord | null;                            // null if outside grid bounds
//   E: Coord | null;
//   S: Coord | null;
//   W: Coord | null;
//   toArray(): Coord[];                         // Convert to array, excluding nulls
//   toArrayAll(): (Coord | null)[];             // Convert to array, including nulls
//   toEntries(): [Direction, Coord][];          // Get [direction, coord] pairs (non-null only)
//   filter(predicate: (coord: Coord) => boolean): Coord[];  // Filter valid neighbors
// }

// TODO: interface NeighborSet8 {
//   N: Coord | null;                            // null if outside grid bounds
//   NE: Coord | null;
//   E: Coord | null;
//   SE: Coord | null;
//   S: Coord | null;
//   SW: Coord | null;
//   W: Coord | null;
//   NW: Coord | null;
//   toArray(): Coord[];                         // Convert to array, excluding nulls
//   toArrayAll(): (Coord | null)[];             // Convert to array, including nulls
//   toEntries(): [Direction, Coord][];          // Get [direction, coord] pairs (non-null only)
//   cardinalOnly(): NeighborSet;                // Get only N/E/S/W as NeighborSet
//   filter(predicate: (coord: Coord) => boolean): Coord[];  // Filter valid neighbors
// }

// TODO: getMooreNeighbors(coord: Coord): NeighborSet8
// OR: getMooreNeighbors(row: number, col: number): NeighborSet8 (overload)
// Return all 8 neighbors with named access (e.g., neighbors.NE)
// Common for cellular automata, counting adjacent cells
// Example: const n = getMooreNeighbors(coord); const northeast = n.NE; const all = n.toArray();

// TODO: getNeumannNeighbors(coord: Coord): NeighborSet
// OR: getNeumannNeighbors(row: number, col: number): NeighborSet (overload)
// Return 4 orthogonal neighbors with named access (e.g., neighbors.N)
// Common for pathfinding on grids with 4-directional movement
// Example: const n = getNeumannNeighbors(coord); const north = n.N; const all = n.toArray();