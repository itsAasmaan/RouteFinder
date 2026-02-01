/**
 * Dijkstra's Shortest Path Algorithm
 * Guarantees shortest path for weighted grids
 * Time Complexity: O((V + E) log V) with binary heap
 *
 * Features:
 * - Handles weighted nodes
 * - Guarantees shortest path
 * - Uses priority queue for efficiency
 *
 * @param {Grid} grid - The grid object
 * @param {Node} startNode - Starting node
 * @param {Node} endNode - Target node
 * @returns {Object} - { visitedNodesInOrder, path, success }
 */

import { PriorityQueue } from "../utils/PriorityQueue.js";
import { reconstructPath } from "../utils/helpers.js";

export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const priorityQueue = new PriorityQueue();

  startNode.distance = 0;
  priorityQueue.enqueue(startNode, 0);

  const allNodes = grid.getAllNodes();
  for (const node of allNodes) {
    if (node !== startNode) {
      node.distance = Infinity;
    }
  }
  while (!priorityQueue.isEmpty()) {
    const currentNode = priorityQueue.dequeue();
    if (currentNode.isVisited) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === endNode) {
      const path = reconstructPath(endNode);
      return {
        visitedNodesInOrder,
        path,
        success: true,
      };
    }

    updateNeighbors(currentNode, grid, priorityQueue);
  }

  return {
    visitedNodesInOrder,
    path: [],
    success: false,
  };
}

/**
 * Update distances to all unvisited neighbors
 */
function updateNeighbors(node, grid, priorityQueue) {
  const neighbors = node.getNeighbors(grid.grid);

  for (const neighbor of neighbors) {
    if (neighbor.isVisited) continue;
    const newDistance = node.distance + neighbor.weight;
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
      priorityQueue.enqueue(neighbor, newDistance);
    }
  }
}

/**
 * Get total path cost (sum of weights)
 */
export function getPathCost(path) {
  if (path.length === 0) return 0;

  let cost = 0;
  for (const node of path) {
    cost += node.weight;
  }

  return cost;
}
