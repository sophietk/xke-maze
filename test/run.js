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
});
