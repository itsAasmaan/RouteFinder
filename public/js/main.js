import { Grid } from "./core/Grid.js";
import { MouseHandler } from "./ui/MouseHandler.js";
import { Controls } from "./ui/Controls.js";

class RouteFinder {
  constructor() {
    this.grid = null;
    this.mouseHandler = null;
    this.controls = null;

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.grid = new Grid(25, 50);
    const gridContainer = document.getElementById("grid");
    this.grid.render(gridContainer);

    this.mouseHandler = new MouseHandler(this.grid, gridContainer);
    this.controls = new Controls(this.grid, this.mouseHandler);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new RouteFinder();
});
