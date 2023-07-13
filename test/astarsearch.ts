import Algometer from "../base/algometer";

// A* Search Algorithm
class PriorityQueue<T> {
    private elements: [T, number][] = [];
  
    enqueue(element: T, priority: number) {
      this.elements.push([element, priority]);
      this.elements.sort((a, b) => a[1] - b[1]);
    }
  
    dequeue(): T | undefined {
      return this.elements.shift()?.[0];
    }
  
    isEmpty(): boolean {
      return this.elements.length === 0;
    }
  }
  
  interface GraphNode {
    id: string;
    neighbors: { [key: string]: number };
  }
  
  interface HeuristicFunction {
    (node: GraphNode, goal: GraphNode): number;
  }
  
  function aStarSearch(graph: { [key: string]: GraphNode }, startNode: string, goalNode: string, heuristic: HeuristicFunction): string[] {
    const openSet = new PriorityQueue<string>();
    const cameFrom: { [key: string]: string | null } = {};
    const gScore: { [key: string]: number } = {};
    const fScore: { [key: string]: number } = {};
    const visitedSet: { [key: string]: boolean } = {}; // Track visited nodes
  
    for (let node in graph) {
      gScore[node] = Infinity;
      fScore[node] = Infinity;
    }
  
    gScore[startNode] = 0;
    fScore[startNode] = heuristic(graph[startNode], graph[goalNode]);
  
    openSet.enqueue(startNode, fScore[startNode]);
  
    while (!openSet.isEmpty()) {
      const currentNode = openSet.dequeue();
  
      if (currentNode === goalNode) {
        return reconstructPath(cameFrom, currentNode);
      }
  
      if (currentNode === undefined) {
        break;
      }
  
      visitedSet[currentNode] = true; // Mark current node as visited
  
      const neighbors = graph[currentNode].neighbors;
  
      for (let neighbor in neighbors) {
        const tentativeGScore = gScore[currentNode] + neighbors[neighbor];
  
        if (tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = currentNode;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = gScore[neighbor] + heuristic(graph[neighbor], graph[goalNode]);
  
          if (!visitedSet[neighbor]) {
            openSet.enqueue(neighbor, fScore[neighbor]);
          }
        }
      }
    }
  
    return []; // No path found
  }
  
  function reconstructPath(cameFrom: { [key: string]: string | null }, currentNode: string): string[] {
    const path = [currentNode];
  
    while (cameFrom[currentNode] !== null) {
      currentNode = cameFrom[currentNode]!;
      path.unshift(currentNode);
    }
  
    return path;
  }
  
  // Example usage:
  const graph: { [key: string]: GraphNode } = {
    A: { id: "A", neighbors: { B: 5, C: 2 } },
    B: { id: "B", neighbors: { A: 5, C: 1, D: 3 } },
    C: { id: "C", neighbors: { A: 2, B: 1, D: 4 } },
    D: { id: "D", neighbors: { B: 3, C: 4 } },
  };
  
  const startNode = "A";
  const goalNode = "D";
  const heuristic: HeuristicFunction = (node, goal) => {
    // Heuristic function (Euclidean distance)
    const dx = Math.abs(node.id.charCodeAt(0) - goal.id.charCodeAt(0));
    const dy = Math.abs(parseInt(node.id[1]) - parseInt(goal.id[1]));
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  const path = aStarSearch(graph, startNode, goalNode, heuristic);

  Algometer(()=> console.log(path))