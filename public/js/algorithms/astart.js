/**
 * A* (A-Star) Search Algorithm
 * Combines Dijkstra with heuristic for more efficient pathfinding
 * Time Complexity: O((V + E) log V) with binary heap
 *
 * Key Formula: f(n) = g(n) + h(n)
 * - g(n) = actual cost from start to node n (like Dijkstra)
 * - h(n) = estimated cost from node n to end (heuristic)
 * - f(n) = estimated total cost through node n
 *
 * @param {Grid} grid - The grid object
 * @param {Node} startNode - Starting node
 * @param {Node} endNode - Target node
 * @returns {Object} - { visitedNodesInOrder, path, success }
 */
import { manhattanDistance, reconstructPath } from "../utils/helpers.js";
import { PriorityQueue } from "../utils/PriorityQueue.js";

export function astar(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const priorityQueue = new PriorityQueue();

  startNode.distance = 0;
  startNode.heuristic = manhattanDistance(startNode, endNode);
  startNode.totalDistance = startNode.distance + startNode.heuristic;

  priorityQueue.enqueue(startNode, startNode.totalDistance);

  const allNodes = grid.getAllNodes();

  for (const node of allNodes) {
    if (node !== startNode) {
      node.distance = Infinity;
      node.heuristic = manhattanDistance(node, endNode);
      node.totalDistance = Infinity;
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

    updateNeighbors(currentNode, grid, priorityQueue, endNode);
  }

  return {
    visitedNodesInOrder,
    path: [],
    success: false,
  };
}

/**
 * Update distances and heuristics for all unvisited neighbors
 */
function updateNeighbors(node, grid, priorityQueue, endNode) {
  const neighbors = node.getNeighbors(grid.grid);

  for (const neighbor of neighbors) {
    if (neighbor.isVisited) continue;

    const newDistance = node.distance + neighbor.weight;
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.heuristic = manhattanDistance(neighbor, endNode); 
      neighbor.totalDistance = neighbor.distance + neighbor.heuristic;
      neighbor.previousNode = node;
      priorityQueue.enqueue(neighbor, neighbor.totalDistance);
    }
  }
}