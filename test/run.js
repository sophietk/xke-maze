var maze = require('../maze.js'),
    assert = require('assert');

describe('maze', function () {
    describe('#build()', function () {
        it('should build a maze with appropriate size', function () {
            var lines = maze.build(3, 3, 0);
            assert.equal(3, lines.length);
            for (var i in lines) {
                var line = lines[i];
                assert(3, line.length);
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
            assert.deepEqual([[2, 0], [2, 1], [1, 1], [1, 0], [0, 0]], path);
        })
    })
});
