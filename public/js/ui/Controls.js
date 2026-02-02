import { bfs } from "../algorithms/bfs.js";
import { dfs } from "../algorithms/dfs.js";
import { dijkstra } from "../algorithms/dijkstra.js";
import { astar } from "../algorithms/astart.js";
import { Visualizer } from "../core/Visualizer.js";
import { StatsDisplay } from "./StatsDisplay.js";

export class Controls {
  constructor(grid, mouseHandler) {
    this.grid = grid;
    this.mouseHandler = mouseHandler;
    this.visualizer = new Visualizer(grid);
    this.statsDisplay = new StatsDisplay();
    this.isVisualizing = false;

    this.algorithmSelect = document.getElementById("algorithms");
    this.visualizeBtn = document.getElementById("visualize");
    this.clearPathBtn = document.getElementById("clear-path");
    this.clearWallsBtn = document.getElementById("clear-walls");
    this.clearBoardBtn = document.getElementById("clear-board");
    this.recursiveDivisionBtn = document.getElementById("recursive-division");
    this.speedSlider = document.getElementById("speed-slider");
    this.speedValue = document.getElementById("speed-value");
    this.weightModeBtn = document.getElementById("weight-mode");

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
      this.visualizer.clearVisualization();
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
      this.visualizer.clearVisualization();
      this.statsDisplay.reset();
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

    // Weight mode button (if exists)
    if (this.weightModeBtn) {
      this.weightModeBtn.addEventListener("click", () => {
        this.toggleWeightMode();
      });
    }
  }

  /**
   * Handle visualize button click
   */
  async handleVisualize() {
    const algorithm = this.algorithmSelect.value;

    if (!algorithm) {
      alert("Please select an algorithm first!");
      return;
    }

    if (!this.grid.startNode || !this.grid.endNode) {
      alert("Please set start and end nodes!");
      return;
    }

    this.grid.clearPath();
    this.visualizer.clearVisualization();
    this.disableControls();

    const startTime = performance.now();
    let result;

    try {
      switch (algorithm) {
        case "bfs":
          result = bfs(this.grid, this.grid.startNode, this.grid.endNode);
          break;
        case "dfs":
          result = dfs(this.grid, this.grid.startNode, this.grid.endNode);
          break;
        case "dijkstra":
          result = dijkstra(this.grid, this.grid.startNode, this.grid.endNode);
          break;
        case "astar":
          result = astar(this.grid, this.grid.startNode, this.grid.endNode);
          break;
        case "greedy":
        case "swarm":
        case "convergent":
        case "bidirectional":
          alert(`${algorithm} will be implemented in the later!`);
          this.enableControls();
          return;
        default:
          throw new Error("Unknown algorithm");
      }
    } catch (error) {
      console.error("Algorithm error:", error);
      alert("An error occurred while running the algorithm!");
      this.enableControls();
      return;
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    this.statsDisplay.update({
      algorithm: algorithm,
      nodesVisited: result.visitedNodesInOrder.length,
      pathLength: result.path.length,
      executionTime: executionTime,
      success: result.success,
    });

    const speed = this.getSpeed();
    this.visualizer.setSpeed(speed);

    await this.visualizer.visualize(result.visitedNodesInOrder, result.path, () => {
      this.enableControls();
      if (!result.success) {
        setTimeout(() => {
          alert("No path found! The end node is unreachable.");
        }, 100);
      }
    });
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

  /**
   * Toggle between wall and weight drawing mode
   */
  toggleWeightMode() {
    const currentMode = this.mouseHandler.getDrawMode();

    if (currentMode === "wall") {
      this.mouseHandler.setDrawMode("weight");
      this.weightModeBtn.textContent = "Draw Walls";
      this.weightModeBtn.classList.add("active");
    } else {
      this.mouseHandler.setDrawMode("wall");
      this.weightModeBtn.textContent = "Add Weights";
      this.weightModeBtn.classList.remove("active");
    }
  }
}
