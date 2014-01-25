maze = require('../src/index.js')
should = require('chai').should()

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

    it 'should throw error when start/finish argument is not a position', ->
      (-> maze.solve([[0]], 'test', [0, 0])).should.throw(Error, 'to be an array')
      (-> maze.solve([[0]], [0, 0], [0, 0, 1])).should.throw(Error, 'to have a length of 2')

    it 'should throw error when start/finish argument is not in maze', ->
      (-> maze.solve([[1]], [0, 1], [0, 0])).should.throw(Error, 'should be in maze')
      (-> maze.solve([[1]], [0, 0], [1, 0])).should.throw(Error, 'should be in maze')
      (-> maze.solve([[0]], [0, 0], [0, 0])).should.throw(Error, 'should be an available square')

    it 'should throw error when start=finish', ->
      (-> maze.solve([[1]], [0, 0], [0, 0])).should.throw(Error, 'should not be the same positions')

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
