maze = require('../maze.js')
should = require('chai').should()

Maze = maze.Obj.Maze
Square = maze.Obj.Square
Path = maze.Obj.Path

describe 'Square', ->

  square = new Square(1, 0)

  describe '#init()', ->
    it 'should return a square with appropriate position', ->
      square.should.have.property('x')
      square.x.should.equal(1)
      square.should.have.property('y')
      square.y.should.equal(0)

  describe '#left()', ->
    it 'should return the left neighbour square', ->
      square.left().x.should.equal(0)
      square.left().y.should.equal(0)

  describe '#right()', ->
    it 'should return the right neighbour square', ->
      square.right().x.should.equal(2)
      square.right().y.should.equal(0)

  describe '#up()', ->
    it 'should return the up neighbour square', ->
      square.up().x.should.equal(1)
      square.up().y.should.equal(-1)

  describe '#down()', ->
    it 'should return the down neighbour square', ->
      square.down().x.should.equal(1)
      square.down().y.should.equal(1)

describe 'Path', ->

  lines =
    [[0, 0, 1]
      [0, 1, 1]
      [1, 1, 0]]
  lines = new Maze(lines)
  start = new Square(1,1)

  describe '#extend()', ->
    it 'should return extended paths from one', ->
      path = new Path([start])
      extendedPaths = path.extend(lines)
      extendedPaths.should.have.length(2)
      path1 = extendedPaths[0]
      path1.toArray().should.have.length(2)
      path1.toArray().should.deep.equal([[1,1], [2,1]])
      path2 = extendedPaths[1]
      path2.toArray().should.have.length(2)
      path2.toArray().should.deep.equal([[1,1], [1,2]])

      extendedPaths = path1.extend(lines)
      extendedPaths.should.have.length(1)
      path3 = extendedPaths[0]
      path3.toArray().should.have.length(3)
      path3.toArray().should.deep.equal([[1,1], [2,1], [2,0]])

describe 'maze', ->

  describe '#build()', ->

    it 'should build a 3x3 maze', ->
      lines = maze.build(3, 3, 0.5)
      lines.should.have.length(3)
      line.should.have.length(3) for line in lines

    it 'should build a 2x5 maze', ->
      lines = maze.build(2, 5, 0.5)
      lines.should.have.length(5)
      line.should.have.length(2) for line in lines

    it 'should fill squares with 0 or 1', ->
      lines = maze.build(2, 2, 0.5)
      for line in lines
        for square in line
          square.should.be.a('number')
          [0, 1].should.include(square)

    it 'should build a maze depending on density : with walls only', ->
      lines = maze.build(10, 10, 0)
      for line in lines
        for square in line
          square.should.be.a('number')
          square.should.equal(0)

    it 'should build a maze depending on density : with paths only', ->
      lines = maze.build(10, 10, 1)
      for line in lines
        for square in line
          square.should.be.a('number')
          square.should.equal(1)

    it 'should build a maze depending on density', ->
      flattenAndSum = (lines) -> (lines.reduce (t, s) -> t.concat(s)).reduce( (t,s) -> t + s)
      sum1 = flattenAndSum(maze.build(10, 10, 0.2))
      sum2 = flattenAndSum(maze.build(10, 10, 0.8))
      sum1.should.be.below(sum2) # this test depends on probability

  describe '#solve()', ->

    it 'should solve a 3x3 maze', ->
      lines =
        [[0, 0, 1]
         [0, 1, 1]
         [1, 1, 0]]
      start = [2, 0]
      finish = [0, 2]
      path = maze.solve(lines, start, finish)
      path.should.deep.equal([[2, 0], [2, 1], [1, 1], [1, 2], [0, 2]])

    it 'should solve a maze when finish point is reached', ->
      lines =
        [[0, 0, 1]
         [0, 1, 1]
         [1, 1, 0]]
      start = [2, 0]
      finish = [1, 2]
      path = maze.solve(lines, start, finish)
      path.should.deep.equal([[2, 0], [2, 1], [1, 1], [1, 2]])

    it 'should return undefined when finish point is not reachable', ->
      lines =
        [[1, 0, 1]
         [0, 1, 1]
         [1, 1, 0]]
      start = [2, 0]
      finish = [0, 0]
      path = maze.solve(lines, start, finish)
      should.not.exist(path)

  describe '#highlight()', ->

    it 'should highlight a path in maze', ->
      lines =
        [[1, 1, 1]
         [0, 1, 1]
         [1, 1, 0]]
      start = [2, 0]
      finish = [0, 2]
      path = maze.solve(lines, start, finish)
      highlight = maze.highlight(lines, path)
      highlight.should.deep.equal(
        [[1, 2, 2]
         [0, 2, 1]
         [2, 2, 0]])
