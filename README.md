maze.js [![Build Status](https://drone.io/github.com/sophietk/xke-maze/status.png)](https://drone.io/github.com/sophietk/xke-maze/latest)
=======

A maze generator and solver

### build(width, height, density)
```
> var myMaze = maze.build(5, 9, 0.6)

[ [ 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1 ],
  [ 1, 0, 1, 1, 0 ],
  [ 0, 1, 1, 1, 1 ],
  [ 0, 0, 0, 1, 1 ],
  [ 1, 1, 0, 1, 1 ],
  [ 0, 1, 1, 1, 1 ],
  [ 0, 1, 1, 0, 1 ],
  [ 0, 0, 1, 0, 0 ] ]
```

### solve(maze, start, finish)
```
> var solution = maze.solve(myMaze, [0, 2], [0, 5])

[ [ 0, 2 ],
  [ 0, 1 ],
  [ 1, 1 ],
  [ 2, 1 ],
  [ 3, 1 ],
  [ 3, 2 ],
  [ 3, 3 ],
  [ 3, 4 ],
  [ 3, 5 ],
  [ 3, 6 ],
  [ 2, 6 ],
  [ 1, 6 ],
  [ 1, 5 ],
  [ 0, 5 ] ]
```

### highlight(maze, solution)
```
> maze.highlight(myMaze, solution)

[ [ 1, 1, 1, 1, 1 ],
  [ 2, 2, 2, 2, 1 ],
  [ 2, 0, 1, 2, 0 ],
  [ 0, 1, 1, 2, 1 ],
  [ 0, 0, 0, 2, 1 ],
  [ 2, 2, 0, 2, 1 ],
  [ 0, 2, 2, 2, 1 ],
  [ 0, 1, 1, 0, 1 ],
  [ 0, 0, 1, 0, 0 ] ]
```

### use
#### As a node module:
- in package.json
```
  "dependencies": {
    "maze": "git://github.com/sophietk/xke-maze.git"
  }
```
- in js files
```
var maze = require('maze')
```
#### In browser:
```
<script type="text/javascript" src="maze.js"></script>
```
(see [example.html](http://rawgithub.com/sophietk/xke-maze/master/example.html))
