export class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    // Node states
    this.isStart = false;
    this.isEnd = false;
    this.isWall = false;
    this.isVisited = false;

    // Algorithm properties
    this.distance = Infinity;
    this.heuristic = 0;
    this.totalDistance = Infinity; // f(n) = g(n) + h(n) for A*
    this.previousNode = null;

    // Weight for weighted algorithms
    this.weight = 1;

    // DOM element reference
    this.element = null;
  }

  /**
   * Create the DOM element for this node
   */
  createElement() {
    const div = document.createElement("div");
    div.className = "node";
    div.id = `node-${this.row}-${this.col}`;

    // Add initial state classes
    if (this.isStart) div.classList.add("node-start");
    if (this.isEnd) div.classList.add("node-end");
    if (this.isWall) div.classList.add("node-wall");

    this.element = div;

    return div;
  }

  /**
   * Update the visual state of the node
   */
  updateElement() {
    if (!this.element) return;

    // Clear all state classes
    this.element.className = "node";

    // Add current state classes
    if (this.isStart) this.element.classList.add("node-start");
    if (this.isEnd) this.element.classList.add("node-end");
    if (this.isWall) this.element.classList.add("node-wall");
    if (this.isVisited) this.element.classList.add("node-visited");
    if (this.weight > 1 && !this.isWall) this.element.classList.add("node-weighted");
  }

  /**
   * Reset the node to its initial state (except walls)
   */
  reset() {
    this.isVisited = false;
    this.distance = Infinity;
    this.heuristic = 0;
    this.totalDistance = Infinity;
    this.previousNode = null;
    this.updateElement();
  }

  /**
   * Clear the node completely
   */
  clear() {
    this.isStart = false;
    this.isEnd = false;
    this.isWall = false;
    this.isVisited = false;
    this.distance = Infinity;
    this.heuristic = 0;
    this.totalDistance = Infinity;
    this.previousNode = null;
    this.weight = 1;
    this.updateElement();
  }

  /**
   * Get neighbors of this node (up, down, left, right)
   */
  getNeighbors(grid) {
    const neighbors = [];
    const { row, col } = this;
    const rows = grid.length;
    const cols = grid[0].length;

    if (row > 0) {
      neighbors.push(grid[row - 1][col]);
    }
    if (col > 0) {
      neighbors.push(grid[row][col - 1]);
    }
    if (row < rows - 1) {
      neighbors.push(grid[row + 1][col]);
    }
    if (col < cols - 1) {
      neighbors.push(grid[row][col + 1]);
    }

    return neighbors.filter((neighbor) => !neighbor.isWall);
  }

  /**
   * Get all 8 neighbors including diagonals
   */
  getAllNeighbors(grid) {
    const neighbors = [];
    const { row, col } = this;
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          neighbors.push(grid[newRow][newCol]);
        }
      }
    }

    return neighbors.filter((neighbor) => !neighbor.isWall);
  }
}
