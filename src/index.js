var Maze = require('./obj.js').Maze,
    Square = require('./obj.js').Square,
    Path = require('./obj.js').Path,
    _ = require('underscore'),
    assert = require('chai').assert;

var WALL = 0,
    PATH = 1;

exports = module.exports = {

    build: function (width, height, density) {
        var maze = [];
        _.each(_.range(height), function () {
            var line = [];
            _.each(_.range(width), function () {
                var square = Math.random() <= density ? PATH : WALL;
                line.push(square);
            });
            maze.push(line);
        });
        return maze;
    },

    solve: function (maze, start, finish) {
        assert.typeOf(maze, 'array');
        _.each(maze, function (line) {
            assert.typeOf(line, 'array');
        });
        assert.typeOf(start, 'array');
        assert.lengthOf(start, 2);
        assert.typeOf(finish, 'array');
        assert.lengthOf(finish, 2);

        start = new Square(start[0], start[1]);
        finish = new Square(finish[0], finish[1]);
        maze = new Maze(maze);

        assert(start.y < maze.height(), 'start position should be in maze');
        assert(start.x < maze.width(), 'start position should be in maze');
        assert(finish.y < maze.height(), 'finish position should be in maze');
        assert(finish.x < maze.width(), 'finish position should be in maze');
        assert.equal(PATH, maze.square(start), 'start position should be an available square');
        assert.equal(PATH, maze.square(finish), 'finish position should be an available square');
        assert(!start.equals(finish), 'start and finish should not be the same positions');

        var paths = [new Path([start])];

        while (true) {
            paths = _.union(_.flatten(_.map(paths, function (path) {
                return path.extend(maze);
            })));
            if (paths.length === 0) return undefined;

            var pathOK = _.find(paths, function (path) {
                return path.contains(finish)
            });
            if (pathOK) return pathOK.toArray();
        }
    }
};
