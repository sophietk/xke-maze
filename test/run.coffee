maze = require('../maze.js')
should = require('chai').should()

describe 'maze', ->

  describe '#build()', ->

    it 'should build a maze with appropriate size', ->
      lines = maze.build(3, 3, 0)
      lines.should.have.length(3)
      line.should.have.length(3) for line in lines

  describe '#solve()', ->

    it 'should solve a 3x3 maze', ->
      lines =
        [[0, 0, 1]
          [0, 1, 1]
          [1, 1, 0]]
      start = [0, 2]
      finish = [2, 0]
      path = maze.solve(lines, start, finish)
      path.should.deep.equal([[2, 0], [2, 1], [1, 1], [1, 0], [0, 0]])