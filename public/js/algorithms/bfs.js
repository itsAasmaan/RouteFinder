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

export function bfs(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const queue = [];

  startNode.distance = 0;
  startNode.isVisited = true;
  queue.push(startNode);

  while (queue.length) {
    const currentNode = queue.shift();
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

    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }

  return {
    visitedNodesInOrder,
    path: [],
    success: false,
  };
}