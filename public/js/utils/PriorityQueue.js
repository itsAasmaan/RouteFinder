export class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  /**
   * Add a node to the priority queue
   */
  enqueue(node, priority) {
    const element = { node, priority };
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Remove and return the node with highest priority (lowest value)
   */
  dequeue() {
    if (this.isEmpty()) return null;

    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }

    return min.node;
  }

  /**
   * Check if queue is empty
   */
  isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * Get size of queue
   */
  size() {
    return this.heap.length;
  }

  /**
   * Bubble up element to maintain heap property
   */
  bubbleUp(index) {
    const element = this.heap[index];

    while (index > 0) {
      const pi = Math.floor((index - 1) / 2);
      const parent = this.heap[pi];

      if (element.priority >= parent.priority) {
        break;
      }

      this.heap[index] = parent;
      index = pi;
    }

    this.heap[index] = element;
  }

  /**
   * Sink down element to maintain heap property
   */
  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let swap = null;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < this.heap[swap].priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.heap[index] = this.heap[swap];
      index = swap;
    }

    this.heap[index] = element;
  }

  /**
   * Clear the queue
   */
  clear() {
    this.heap = [];
  }

  /**
   * Check if queue contains a node
   */
  contains(node) {
    return this.heap.some((element) => element.node === node);
  }

  /**
   * Update priority of a node if it exists
   */
  updatePriority(node, newPriority) {
    const index = this.heap.findIndex((element) => element.node === node);

    if (index === -1) return;

    const oldPriority = this.heap[index].priority;
    this.heap[index].priority = newPriority;

    if (newPriority < oldPriority) {
      this.bubbleUp(index);
    } else {
      this.sinkDown(index);
    }
  }
}
