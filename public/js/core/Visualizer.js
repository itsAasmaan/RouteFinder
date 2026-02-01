export class Visualizer {
  constructor(grid) {
    this.grid = grid;
    this.isAnimating = false;
    this.animationSpeed = 10;
  }

  async visualize(visitedNodesInOrder, path, onComplete) {
    this.isAnimating = true;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (!this.isAnimating) break;

      const node = visitedNodesInOrder[i];

      if (node.isStart || node.isEnd) continue;
      await this.sleep(this.animationSpeed);
      if (node.element) {
        node.element.classList.add("node-visited");
      }
    }

    if (path.length > 0) {
      await this.animatePath(path);
    }

    this.isAnimating = false;
    if (onComplete) onComplete();
  }

  async animatePath(path) {
    for (let i = 0; i < path.length; i++) {
      if (!this.isAnimating) break;

      const node = path[i];

      if (node.isStart || node.isEnd) continue;

      await this.sleep(this.animationSpeed * 3);
      if (node.element) {
        node.element.classList.remove("node-visited");
        node.element.classList.add("node-path");
      }
    }
  }

  visualizeInstantly(visitedNodesInOrder, path) {
    for (const node of visitedNodesInOrder) {
      if (node.isStart || node.isEnd) continue;
      if (node.element) {
        node.element.classList.add("node-visited");
      }
    }

    for (const node of path) {
      if (node.isStart || node.isEnd) continue;
      if (node.element) {
        node.element.classList.remove("node-visited");
        node.element.classList.add("node-path");
      }
    }
  }

  setSpeed(speed) {
    this.animationSpeed = speed;
  }

  stop() {
    this.isAnimating = false;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  clearVisualization() {
    const allNodes = this.grid.getAllNodes();

    for (const node of allNodes) {
      if (node.element) {
        node.element.classList.remove("node-visited", "node-path");
      }
    }
  }
}
