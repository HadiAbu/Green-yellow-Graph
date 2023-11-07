import { Node, Link } from "../Types/Types";

class Vertex {
  id: string;
  color: string;
  adjList: string[];

  constructor(id: string) {
    this.id = id;
    this.color = "white"; // before adding edges, the node color is white
    this.adjList = []; // empty array for neighbors
  }
  setColor(color: string) {
    this.color = color;
  }
  // checks of a node has a neighbor with the given id
  hasNeighbor(vertexId: string) {
    let indexOfVertex = this.adjList.findIndex((x) => x === vertexId);
    return indexOfVertex !== -1;
  }
  //adds a neighbor if it doesn't already exist
  addNeighbor(vertexId: string) {
    !this.hasNeighbor(vertexId) && this.adjList.push(vertexId);
  }
}

class Graph {
  //<key,Value> pairs for vertexes where key is the vertex ID and the value is th vertex with all it's data
  vertexes: Map<string, Vertex>;
  totalVertexes: number;
  isGreenYellow: Boolean;
  isConnected: Boolean;

  constructor(paths: string[]) {
    this.vertexes = new Map();
    this.totalVertexes = 0;
    this.isGreenYellow = true; // this is true unless we find an edge that breaks the rule
    this.isConnected = true; // this is true unless we find an exception that breaks the rule

    for (let i = 0; i < paths.length; i++) {
      let vertexesArray = paths[i].split("-");
      // Early check if we have only one Vertex:
      // if (vertexesArray.length === 1) {
      //   console.log("Graph is connected and green-yellow");
      // }
      for (let j = 0; j < vertexesArray.length; j++) {
        this.addVertex(vertexesArray[j]);
      }
      for (let j = 0; j < vertexesArray.length - 1; j++) {
        let v1 = this.getVertex(vertexesArray[j]),
          v2 = this.getVertex(vertexesArray[j + 1]);
        this.addEdge(v1, v2);
      }
    }
  }
  getVertex(id: string) {
    return this.vertexes.get(id);
  }
  addVertex(id: string) {
    //check if the vertex already exists, and if not add it to the vertexes array
    if (!this.vertexes.get(id)) {
      let v = new Vertex(id);
      this.vertexes.set(id, v);
      this.totalVertexes += 1;
    }
  }
  addEdge(source: Vertex | undefined, target: Vertex | undefined) {
    if (source === undefined || target === undefined) return;
    // if the source and the target are the same vertex, don't do anything
    if (source.id === target.id) return;
    // if the vertex 'source' does not exist in the graph we need to add it
    if (!this.vertexes.get(source.id)) {
      this.addVertex(source.id);
    }
    // if the vertex 'target' does not exist in the graph we need to add it
    if (!this.vertexes.get(target.id)) {
      this.addVertex(target.id);
    }

    // undirected grapgh, so we need to add both vertexes as neighbors to each other
    source.addNeighbor(target.id);
    target.addNeighbor(source.id);

    if (source.color === "white") {
      source.setColor("green");
      target.setColor("yellow");
    } else if (source.color === "yellow" && target.color !== "yellow") {
      target.setColor("green");
    } else if (source.color === "green" && target.color !== "green") {
      target.setColor("yellow");
    } else {
      this.isGreenYellow = false;
    }
  }

  DFS(source: Vertex | undefined, visited: Map<string, Boolean>) {
    //mark the vertex visited
    source && visited.set(source.id, true);
    if (source) {
      //travel the neighbors
      for (let i = 0; i < source.adjList.length; i++) {
        let neighbor: Vertex | undefined = this.vertexes.get(source.adjList[i]);
        if (neighbor === undefined || visited.get(neighbor.id) == null) {
          //make recursive call from neighbor
          this.DFS(neighbor, visited);
        }
      }
    }
  }

  isConnectedGraph(source: string): Boolean {
    const visited = new Map<string, Boolean>();
    this.DFS(this.getVertex(source), visited);
    //checking if all vertexes are in the visited object
    this.vertexes.forEach(({ id }) => {
      //if one vertex is not in the visited array, return false
      if (!visited.get(id)) {
        this.isConnected = false;
      }
    });

    return this.isConnected;
  }
  isGreenYellowGraph() {
    return this.isConnected && this.isGreenYellow;
  }
  buildGraphData() {
    let nodes: Node[] = [];
    let links: Link[] = [];

    this.vertexes.forEach((node) => {
      nodes.push({
        id: node.id,
        color: node.color,
        fontColor: "white",
        size: 90, // some default graph settings
        fontSize: 20, // some default graph settings
        x: 10,
        y: 10,
      });
      node.adjList.forEach((edge) => {
        links.push({ source: node.id, target: edge });
      });
    });

    return {
      nodes: nodes,
      links: links,
    };
  }
}

export { Graph, Vertex };
