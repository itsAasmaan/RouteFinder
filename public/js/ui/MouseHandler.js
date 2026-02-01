export class MouseHandler {
  constructor(grid, gridContainer) {
    this.grid = grid;
    this.gridContainer = gridContainer;

    this.isMousePressed = false;
    this.isDraggingStart = false;
    this.isDraggingEnd = false;
    this.isDrawingWalls = false;
    this.isErasingWalls = false;

    this.setupEventListeners();
  }

  /**
   * Set up all mouse event listeners
   */
  setupEventListeners() {
    this.gridContainer.addEventListener("mousedown", (e) => this.handleMouseDown(e));
    this.gridContainer.addEventListener("mouseenter", (e) => this.handleMouseEnter(e), true);
    document.addEventListener("mouseup", () => this.handleMouseUp());
    this.gridContainer.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  /**
   * Handle mouse down event
   */
  handleMouseDown(event) {
    event.preventDefault();
    this.isMousePressed = true;

    const { row, col } = this.getNodeCoordinates(event.target);
    if (row === null || col === null) return;

    const node = this.grid.getNode(row, col);
    if (!node) return;

    if (node.isStart) {
      this.isDraggingStart = true;
    } else if (node.isEnd) {
      this.isDraggingEnd = true;
    } else {
      if (node.isWall) {
        this.isErasingWalls = true;
        this.grid.removeWall(row, col);
      } else {
        this.isDrawingWalls = true;
        this.grid.addWall(row, col);
      }
    }
  }

  /**
   * Handle mouse enter event (for dragging)
   */
  handleMouseEnter(event) {
    if (!this.isMousePressed) return;

    if (!event.target.classList.contains("node")) return;

    const { row, col } = this.getNodeCoordinates(event.target);
    if (row === null || col === null) return;

    if (this.isDraggingStart) {
      this.grid.moveStartNode(row, col);
    } else if (this.isDraggingEnd) {
      this.grid.moveEndNode(row, col);
    } else if (this.isDrawingWalls) {
      this.grid.addWall(row, col);
    } else if (this.isErasingWalls) {
      this.grid.removeWall(row, col);
    }
  }

  /**
   * Handle mouse up event
   */
  handleMouseUp() {
    this.isMousePressed = false;
    this.isDraggingStart = false;
    this.isDraggingEnd = false;
    this.isDrawingWalls = false;
    this.isErasingWalls = false;
  }

  /**
   * Extract row and column from node element ID
   */
  getNodeCoordinates(element) {
    if (!element || !element.id) return { row: null, col: null };

    const id = element.id;
    if (!id.startsWith("node-")) return { row: null, col: null };

    const parts = id.split("-");
    if (parts.length !== 3) return { row: null, col: null };

    const row = parseInt(parts[1]);
    const col = parseInt(parts[2]);

    return { row, col };
  }

  /**
   * Disable mouse interactions (during visualization)
   */
  disable() {
    this.gridContainer.style.pointerEvents = "none";
  }

  /**
   * Enable mouse interactions
   */
  enable() {
    this.gridContainer.style.pointerEvents = "auto";
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    this.gridContainer.removeEventListener("mousedown", this.handleMouseDown);
    this.gridContainer.removeEventListener("mouseenter", this.handleMouseEnter);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
}
