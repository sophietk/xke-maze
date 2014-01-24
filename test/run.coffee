maze = require('../maze.js')
should = require('chai').should()

describe 'Square', ->

  square = new maze.obj.Square(1, 0)

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
  lines = new maze.obj.Maze(lines)
  start = new maze.obj.Square(1,1)

  describe '#extend()', ->
    it 'should return extended paths from one', ->
      path = new maze.obj.Path([start])
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

    it 'should build a maze with size 3x3', ->
      lines = maze.build(3, 3, 0.5)
      lines.should.have.length(3)
      line.should.have.length(3) for line in lines

    it 'should build a maze with size 2x5', ->
      lines = maze.build(2, 5, 0.5)
      lines.should.have.length(5)
      line.should.have.length(2) for line in lines

    it 'should fill squares with 0 or 1', ->
      lines = maze.build(2, 2, 0.5)
      for line in lines
        for square in line
          square.should.be.a('number')
          [0, 1].should.include(square)

  describe '#solve()', ->

    it 'should throw error when start/finish argument is not a position', ->
      (-> maze.solve([[0]], 'test', [0, 0])).should.throw(Error, 'to be an array')
      (-> maze.solve([[0]], [0, 0], [0, 0, 1])).should.throw(Error, 'to have a length of 2')

    it 'should throw error when start/finish argument is not in maze', ->
      (-> maze.solve([[1]], [0, 1], [0, 0])).should.throw(Error, 'should be in maze')
      (-> maze.solve([[1]], [0, 0], [1, 0])).should.throw(Error, 'should be in maze')
      (-> maze.solve([[0]], [0, 0], [0, 0])).should.throw(Error, 'should be an available square')

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
