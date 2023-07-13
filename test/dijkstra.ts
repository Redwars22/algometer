import Algometer from "../base/algometer";

// Dijkstra's Algorithm
function dijkstra(graph: { [key: string]: { [key: string]: number } }, startNode: string): { [key: string]: number } {
    // Step 1: Initialize distances and visited array
    const distances: { [key: string]: number } = {};
    const visited: { [key: string]: boolean } = {};
  
    for (let node in graph) {
      distances[node] = Infinity; // Set initial distance to infinity for all nodes
      visited[node] = false; // Mark all nodes as unvisited
    }
  
    distances[startNode] = 0; // Set distance of the start node to 0
  
    // Step 2: Traverse the graph
    while (true) {
      let closestNode: string | null = null;
  
      // Find the closest unvisited node
      for (let node in graph) {
        if (!visited[node] && (closestNode === null || distances[node] < distances[closestNode])) {
          closestNode = node;
        }
      }
  
      if (closestNode === null) {
        break; // Exit the loop if all nodes have been visited
      }
  
      visited[closestNode] = true; // Mark the current node as visited
  
      // Step 3: Update distances to neighboring nodes
      for (let neighbor in graph[closestNode]) {
        let distance = graph[closestNode][neighbor];
        let totalDistance = distances[closestNode] + distance;
  
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance; // Update the distance if a shorter path is found
        }
      }
    }
  
    return distances;
  }
  
  // Example usage:
  const graph: { [key: string]: { [key: string]: number } } = {
    A: { B: 5, C: 2 },
    B: { A: 5, C: 1, D: 3 },
    C: { A: 2, B: 1, D: 4 },
    D: { B: 3, C: 4 },
  };
  
  const startNode: string = 'A';
  const distances: { [key: string]: number } = dijkstra(graph, startNode);
  
  Algometer(()=> console.log(distances));
  