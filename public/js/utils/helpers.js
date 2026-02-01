/**
 * Calculate Manhattan distance between two nodes
 */
export function manhattanDistance(A, B) {
  return Math.abs(A.row - B.row) + Math.abs(A.col - B.col);
}

/**
 * Calculate Euclidean distance between two nodes
 */
export function euclideanDistance(A, B) {
  const dx = A.row - B.row;
  const dy = A.col - B.col;

  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Reconstruct the shortest path from end node to start node
 */
export function reconstructPath(endNode) {
  const path = [];

  let currentNode = endNode;
  while (currentNode != null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return path;
}

/**
 * Get all nodes in the order they were visited
 */
export function getVisitedNodesInOrder(grid) {
  const visitedNodes = [];
  const allNodes = grid.getAllNodes();

  for (const node of allNodes) {
    if (node.isVisited) {
      visitedNodes.push(node);
    }
  }

  return visitedNodes;
}

/**
 * Reset all nodes for a fresh algorithm run
 */
export function resetNodesForPathfinding(grid) {
  const allNodes = grid.getAllNodes();

  for (const node of allNodes) {
    node.isVisited = false;
    node.distance = Infinity;
    node.heuristic = 0;
    node.totalDistance = Infinity;
    node.previousNode = null;
  }
}
