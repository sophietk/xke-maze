Maze = require('../src/obj.js').Maze
Square = require('../src/obj.js').Square
Path = require('../src/obj.js').Path
should = require('chai').should()

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
