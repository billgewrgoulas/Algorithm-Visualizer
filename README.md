# Algorithm Visualizer

Angular app that visualizes various algorithms from my university assignments for maze generation and pathfinding in a spatial network. For the visualization a 2D grid graph was used and each movement can have a vertical or a horizontal direction.Moreover a node can have up to 4 neighbors, and the cost of each edge is 1.

## PathFinding Algorithms  

A*: A modified version of dijkstra's algorithm that chooses the best node to visit based on an heuristic function.  

BFS/DFS: BFS starts exploring all nodes from the closest to the furthest away nodes and guarantees the shortest path. DFS on the other hand starts from the furthest away nodes and does not guarantee the shortest path.  

Uniform Cost Search: Like Astar this algorithm is commonly used in AI. The algorithm starts with a priority queue that contains only one item, and inserts new items as they are discovered.

## Maze Generation

Recursive Division:  
The algorithm devides the maze's space horizontally or vertically at random each time and carves a passage between the two subfields to preserve the connectivity. 
It returns when a subfield reaches the minimum size.

Recursive Backtracker:  
This a randomized version of dfs. Each time the algorithm randomly chooses an unvisited neighbor recursively.

Randomized Prim's:  
This algorithm produces uniform spanning trees. Starting from a single node it chooses a neighbor and connects it randomly to one of the already visited node's. Then it repeats by selecting one of the visited's nodes neighbors.

Randomized Kruskal's:  
This algo also produces uniform spanning trees. Each time it picks up an edge randomly and if the two vertices are in different dissjoint sets it connects them.

Aldous Broder:  
Chooses a connected neighbor of the vertex and travel to it. If the neighbor has not yet been visited, add the traveled edge to the spanning tree. This repeats till all nodes have been visited. This algorithm is very inefficient.

## Best meeting point  

For this problem a combination of Non Random Access algorithm and an incremental version of Dijkstra's algorithhm was used. NRA is an algorithm used for topK queries and in this case we will be doing a top1 query. Each time the algorithm gets the next closest node from every starting node and checks if every starting node has reached one of those next closest nodes, updating the minimum distance as well as the maximum. If a node has been visited by all the starting nodes it is compared with the previous meeting point based on the maximum distance. The result is a node that has the minimum maximum distance. Due to the nature of NRA the worst case is O(k(V + ElogV)). However if the starting nodes are close the algorithm will terminate very fast.

## Fight the algorithm

For this problem Astar was used. Since the process is a separate thread it is possible to draw walls while the algorithm is running and redirect it to find the next closest path.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
