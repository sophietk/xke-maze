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

        var paths = [new Path([start])],
            pathOK;

        // TODO : do recursive algorithm instead of loop
        while (true) {
            var newPaths = [];
            _.each(paths, function (pathI) {
                var extendedPathsI = pathI.extend(maze);
                if (extendedPathsI.length > 0) newPaths = _.union(newPaths, extendedPathsI);

                pathOK = _.find(extendedPathsI, function (path) {
                    return path.contains(finish)
                });
            });
            if (newPaths.length === 0 || pathOK !== undefined) break;
            paths = newPaths;
        }

        return pathOK ? pathOK.toArray() : undefined;
    }
};
