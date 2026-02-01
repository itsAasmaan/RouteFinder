/**
 * Breadth-First Search Algorithm
 * Guarantees shortest path for unweighted grids
 * Time Complexity: O(V + E) where V is vertices and E is edges
 *
 * @param {Grid} grid - The grid object
 * @param {Node} startNode - Starting node
 * @param {Node} endNode - Target node
 * @returns {Object} - { visitedNodesInOrder, path, success }
 */

import { reconstructPath } from "../utils/helpers.js";

export function dfs(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const stack = [];

  startNode.isVisited = true;
  stack.push(startNode);

  while (stack.length) {
    const currentNode = stack.pop();
    visitedNodesInOrder.push(currentNode);

    if (currentNode == endNode) {
      const path = reconstructPath(currentNode);

      return {
        visitedNodesInOrder,
        path,
        success: true,
      };
    }

    const neighbors = currentNode.getNeighbors(grid.grid);

    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }

  return {
    visitedNodesInOrder,
    path: [],
    success: false,
  };
}
