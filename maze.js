var _ = require('underscore'),
    assert = require('chai').assert;
_.str = require('underscore.string');

var Maze = function(array) {
    this.lines = array;
    this.square = function(square) {
        return this.lines[square.y] !== undefined ? this.lines[square.y][square.x] : undefined;
    };
    this.width = function() {
        return this.lines[0].length; // TODO review
    };
    this.height = function() {
        return this.lines.length;
    };
};

var Square = function (x, y) {
    this.x = x;
    this.y = y;
    this.left = function() {
        return new Square(this.x - 1, this.y);
    };
    this.right = function() {
        return new Square(this.x + 1, this.y);
    };
    this.up = function() {
        return new Square(this.x, this.y - 1);
    };
    this.down = function() {
        return new Square(this.x, this.y + 1);
    };
    this.equals = function(otherSquare) {
        return this.x === otherSquare.x && this.y === otherSquare.y;
    };
    this.toString = function() {
        return _.str.sprintf('%s,%s', this.x, this.y);
    };
    this.toArray = function() {
        return [this.x, this.y];
    };
    return this;
};

var WALL = 0,
    PATH = 1;

exports = module.exports = {

    obj: {
        Square: Square
    },

    build: function (width, height, density) {
        var maze = [];
        for (var yCursor = 0; yCursor < height; yCursor++) {
            var line = [];
            for (var xCursor = 0; xCursor < width; xCursor++) {
                var square = _.sample([WALL, PATH]);
                line.push(square);
            }
            maze.push(line);
        }
        return maze;
    },

    solve: function (maze, start, finish) {
        assert.typeOf(maze, 'array');
        for (var i in maze) assert.typeOf(maze[i], 'array');
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

        var pathContains = function(path, square) {
            return _.find(path, function(otherSquare) { return square.equals(otherSquare);}) !== undefined;
        };

        var extendPath = function(maze, path) {
            var newPaths = [],
                lastSquare = _.last(path);
            if (!pathContains(path, lastSquare.left()) && maze.square(lastSquare.left()) === PATH) newPaths.push(_.union(path, lastSquare.left()));
            if (!pathContains(path, lastSquare.right()) && maze.square(lastSquare.right()) === PATH) newPaths.push(_.union(path, lastSquare.right()));
            if (!pathContains(path, lastSquare.up()) && maze.square(lastSquare.up()) === PATH) newPaths.push(_.union(path, lastSquare.up()));
            if (!pathContains(path, lastSquare.down()) && maze.square(lastSquare.down()) === PATH) newPaths.push(_.union(path, lastSquare.down()));

            return newPaths;
        };

        var paths = [[start]];

        while (paths.length > 0) {
            var newPaths = [];
            for (var i in paths) {
                var pathsI = extendPath(maze, paths[i]);
                if (pathsI.length > 0) newPaths = _.union(newPaths, pathsI);
            }
            if (newPaths.length === 0) {break};
            paths = newPaths;
            console.log(paths);
        }

        var aPath = _.last(paths);
        return _.map(aPath, function(square) {return square.toArray(); });
    }
};
