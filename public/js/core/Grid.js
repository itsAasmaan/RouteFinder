import { Node } from "./Node.js";

export class Grid {
  constructor(rows = 20, cols = 50) {
    this.rows = rows;
    this.cols = cols;

    this.grid = [];

    this.startNode = null;
    this.endNode = null;

    //Default positions
    this.startRow = Math.floor(rows / 2);
    this.startCol = Math.floor(cols / 4);
    this.endRow = Math.floor(rows / 2);
    this.endCol = Math.floor((3 * cols) / 4);

    this.initialize();
  }

  /**
   * Initialize the grid with nodes
   */
  initialize() {
    this.grid = [];

    for (let row = 0; row < this.rows; row++) {
      const currentRow = [];
      for (let col = 0; col < this.cols; col++) {
        const node = new Node(row, col);

        if (row == this.startRow && col == this.startCol) {
          node.isStart = true;
          this.startNode = node;
        }

        if (row == this.endRow && col == this.endCol) {
          node.isEnd = true;
          this.endNode = node;
        }

        currentRow.push(node);
      }

      this.grid.push(currentRow);
    }
  }

  /**
   * Render the grid to the DOM
   */
  render(container) {
    container.innerHTML = "";

    for (let row = 0; row < this.rows; row++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "grid-row";

      for (let col = 0; col < this.cols; col++) {
        const node = this.grid[row][col];
        const nodeElement = node.createElement();
        rowDiv.appendChild(nodeElement);
      }

      container.appendChild(rowDiv);
    }
  }

  /**
   * Get node at specific position
   */
  getNode(row, col) {
    if (row >= 0 && col >= 0 && row < this.rows && col < this.cols) {
      return this.grid[row][col];
    }

    return null;
  }

  /**
   * Toggle wall at specific position
   */
  toggleWall(row, col) {
    const node = this.getNode(row, col);
    if (node && !node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      node.updateElement();
    }
  }

  /**
   * Add wall at specific position
   */
  addWall(row, col) {
    const node = this.getNode(row, col);
    if (node && !node.isStart && !node.isEnd && !node.isWall) {
      node.isWall = true;
      node.updateElement();
    }
  }

  /**
   * Remove wall at specific position
   */
  removeWall(row, col) {
    const node = this.getNode(row, col);
    if (node && node.isWall) {
      node.isWall = false;
      node.updateElement();
    }
  }

  /**
   * Set weight at specific position
   */
  setWeight(row, col, weight) {
    const node = this.getNode(row, col);
    if (node && !node.isStart && !node.isEnd && !node.isWall) {
      node.weight = weight;
      node.updateElement();
    }
  }

  /**
   * Move start node to new position
   */
  moveStartNode(row, col) {
    const node = this.getNode(row, col);
    if (node && !node.isEnd && !node.isWall) {
      // Clear previous start node
      if (this.startNode) {
        this.startNode.isStart = false;
        this.startNode.updateElement();
      }

      // Set new start node
      node.isStart = true;
      this.startNode = node;
      this.startRow = row;
      this.startCol = col;
      node.updateElement();
    }
  }

  /**
   * Move end node to new position
   */
  moveEndNode(row, col) {
    const node = this.getNode(row, col);
    if (node && !node.isStart && !node.isWall) {
      // Clear previous end node
      if (this.endNode) {
        this.endNode.isEnd = false;
        this.endNode.updateElement();
      }

      // Set new end node
      node.isEnd = true;
      this.endNode = node;
      this.endRow = row;
      this.endCol = col;
      node.updateElement();
    }
  }

  /**
   * Clear all paths (keep walls)
   */
  clearPath() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const node = this.grid[row][col];
        node.reset();
      }
    }
  }

  /**
   * Clear all walls
   */
  clearWalls() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const node = this.grid[row][col];
        if (node.isWall) {
          node.isWall = false;
          node.updateElement();
        }
      }
    }
  }

  /**
   * Clear weights
   */
  clearWeights() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const node = this.grid[row][col];
        if (node.weight > 1) {
          node.weight = 1;
          node.updateElement();
        }
      }
    }
  }

  /**
   * Clear entire board
   */
  clearBoard() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const node = this.grid[row][col];
        if (!node.isStart && !node.isEnd) {
          node.clear();
        }
      }
    }
  }

  /**
   * Reset the grid to initial state
   */
  reset() {
    this.initialize();
  }

  /**
   * Get all nodes as a flat array
   */
  getAllNodes() {
    const nodes = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        nodes.push(this.grid[row][col]);
      }
    }
    return nodes;
  }

  /**
   * Get grid dimensions
   */
  getDimensions() {
    return {
      rows: this.rows,
      cols: this.cols,
    };
  }
}
