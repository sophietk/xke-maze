maze = require('../maze.js')
should = require('chai').should()

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

    it 'should solve a 3x3 maze', ->
      lines =
        [[0, 0, 1]
          [0, 1, 1]
          [1, 1, 0]]
      start = [0, 2]
      finish = [2, 0]
      path = maze.solve(lines, start, finish)
      path.should.deep.equal([[2, 0], [2, 1], [1, 1], [1, 0], [0, 0]])