import { Grid } from "./core/Grid.js";

class RouteFinder {
    constructor() {
        this.grid = null;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.grid = new Grid(20, 50);
        const gridContainer = document.getElementById('grid');
        this.grid.render(gridContainer);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RouteFinder();
});