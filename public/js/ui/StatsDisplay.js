export class StatsDisplay {
  constructor() {
    this.statAlgorithm = document.getElementById("stat-algorithm");
    this.statVisited = document.getElementById("stat-visited");
    this.statPathLength = document.getElementById("stat-path-length");
    this.statTime = document.getElementById("stat-time");
  }

  /**
   * Update statistics after algorithm runs
   * @param {Object} stats - Statistics object
   */
  update(stats) {
    const { algorithm = "-", nodesVisited = 0, pathLength = 0, executionTime = 0, success = false } = stats;

    this.statAlgorithm.textContent = this.formatAlgorithmName(algorithm);
    this.statVisited.textContent = nodesVisited;

    if (success && pathLength > 0) {
      this.statPathLength.textContent = pathLength;
    } else if (!success) {
      this.statPathLength.textContent = "No path found";
    } else {
      this.statPathLength.textContent = "-";
    }

    this.statTime.textContent = `${executionTime.toFixed(2)} ms`;
  }

  /**
   * Format algorithm name for display
   * @param {string} algorithmKey - Algorithm key from select
   * @returns {string} - Formatted name
   */
  formatAlgorithmName(algorithmKey) {
    const names = {
      bfs: "Breadth-First Search",
      dfs: "Depth-First Search",
      dijkstra: "Dijkstra's Algorithm",
      astar: "A* Search",
      greedy: "Greedy Best-First Search",
      swarm: "Swarm Algorithm",
      convergent: "Convergent Swarm",
      bidirectional: "Bidirectional Swarm",
    };

    return names[algorithmKey] || algorithmKey;
  }

  /**
   * Reset statistics to default
   */
  reset() {
    this.statAlgorithm.textContent = "-";
    this.statVisited.textContent = "-";
    this.statPathLength.textContent = "-";
    this.statTime.textContent = "-";
  }

  /**
   * Show error message in stats
   * @param {string} message - Error message
   */
  showError(message) {
    this.statAlgorithm.textContent = "Error";
    this.statVisited.textContent = "-";
    this.statPathLength.textContent = message;
    this.statTime.textContent = "-";
  }
}
