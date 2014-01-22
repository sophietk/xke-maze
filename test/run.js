var maze = require('../maze.js'),
    should = require('chai').should();

describe('maze', function () {

    describe('#build()', function () {

        it('should build a maze with appropriate size', function () {
            var lines = maze.build(3, 3, 0);
            lines.should.have.length(3);
            for (var i in lines) {
                var line = lines[i];
                line.should.have.length(3);
            }
        })
    })

    describe('#solve()', function () {
        it('should solve a 3x3 maze', function () {
            var lines = [
                    [0, 0, 1],
                    [0, 1, 1],
                    [1, 1, 0]
                ],
                start = [0, 2],
                finish = [2, 0];
            var path = maze.solve(lines, start, finish);
            path.should.be.deep.equal([[2, 0], [2, 1], [1, 1], [1, 0], [0, 0]]);
        })
    })
});
