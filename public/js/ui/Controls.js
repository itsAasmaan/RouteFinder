export class Controls {
  constructor(grid, mouseHandler) {
    this.grid = grid;
    this.mouseHandler = mouseHandler;
    this.isVisualizing = false;

    this.algorithmSelect = document.getElementById("algorithms");
    this.visualizeBtn = document.getElementById("visualize");
    this.clearPathBtn = document.getElementById("clear-path");
    this.clearWallsBtn = document.getElementById("clear-walls");
    this.clearBoardBtn = document.getElementById("clear-board");
    this.recursiveDivisionBtn = document.getElementById("recursive-division");
    this.speedSlider = document.getElementById("speed-slider");
    this.speedValue = document.getElementById("speed-value");

    this.setupEventListeners();
    this.updateSpeedLabel();
  }

  /**
   * Set up all control event listeners
   */
  setupEventListeners() {
    // Visualize button
    this.visualizeBtn.addEventListener("click", () => {
      this.handleVisualize();
    });

    // Clear path button
    this.clearPathBtn.addEventListener("click", () => {
      this.grid.clearPath();
      this.enableControls();
    });

    // Clear walls button
    this.clearWallsBtn.addEventListener("click", () => {
      this.grid.clearWalls();
      this.grid.clearWeights();
    });

    // Clear board button
    this.clearBoardBtn.addEventListener("click", () => {
      this.grid.clearBoard();
      this.enableControls();
    });

    // Recursive division button
    this.recursiveDivisionBtn.addEventListener("click", () => {
      this.handleMazeGeneration();
    });

    // Speed slider
    this.speedSlider.addEventListener("input", () => {
      this.updateSpeedLabel();
    });
  }

  /**
   * Handle visualize button click
   */
  handleVisualize() {
    const algorithm = this.algorithmSelect.value;

    if (!algorithm) {
      alert("Please select an algorithm first!");
      return;
    }

    if (!this.grid.startNode || !this.grid.endNode) {
      alert("Please set start and end nodes!");
      return;
    }

    alert(`${algorithm} visualization will be implemented in the next commit!`);
  }

  /**
   * Handle maze generation
   */
  handleMazeGeneration() {
    alert("Maze generation will be implemented in a future commit!");
  }

  /**
   * Update speed label based on slider value
   */
  updateSpeedLabel() {
    const speed = parseInt(this.speedSlider.value);
    let label;

    if (speed < 30) {
      label = "Slow";
    } else if (speed < 70) {
      label = "Medium";
    } else {
      label = "Fast";
    }

    this.speedValue.textContent = label;
  }

  /**
   * Get current speed in milliseconds
   */
  getSpeed() {
    const speed = parseInt(this.speedSlider.value);
    return 101 - speed;
  }

  /**
   * Disable controls during visualization
   */
  disableControls() {
    this.isVisualizing = true;
    this.visualizeBtn.disabled = true;
    this.algorithmSelect.disabled = true;
    this.recursiveDivisionBtn.disabled = true;
    this.mouseHandler.disable();
  }

  /**
   * Enable controls after visualization
   */
  enableControls() {
    this.isVisualizing = false;
    this.visualizeBtn.disabled = false;
    this.algorithmSelect.disabled = false;
    this.recursiveDivisionBtn.disabled = false;
    this.mouseHandler.enable();
  }

  /**
   * Get selected algorithm
   */
  getSelectedAlgorithm() {
    return this.algorithmSelect.value;
  }
}
