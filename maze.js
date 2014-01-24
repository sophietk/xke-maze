var _ = require('underscore'),
    assert = require('chai').assert;
_.str = require('underscore.string');

/*

 maze representation :

 ┼────────── x
 |0,0    n,0
 |
 |
 |0,m    n,m
 y

 */

var Maze = function (arrayArray) {
    this.lines = arrayArray;
    this.square = function (square) {
        return this.lines[square.y] !== undefined ? this.lines[square.y][square.x] : undefined;
    };
    this.width = function () {
        return this.lines[0].length; // TODO review
    };
    this.height = function () {
        return this.lines.length;
    };
};

var Square = function (x, y) {
    this.x = x;
    this.y = y;
    this.left = function () {
        return new Square(this.x - 1, this.y);
    };
    this.right = function () {
        return new Square(this.x + 1, this.y);
    };
    this.up = function () {
        return new Square(this.x, this.y - 1);
    };
    this.down = function () {
        return new Square(this.x, this.y + 1);
    };
    this.neighbours = function () {
        return [this.left(), this.right(), this.up(), this.down()];
    };
    this.equals = function (otherSquare) {
        return this.x === otherSquare.x && this.y === otherSquare.y;
    };
    this.toArray = function () {
        return [this.x, this.y];
    };
};

var Path = function (squareArray) {
    this.array = squareArray.slice() || []; // copy
    this.push = function (square) {
        this.array.push(square);
        return this;
    };
    this.contains = function (square) {
        return _.find(this.array, function (pathSquare) {
            return square.equals(pathSquare);
        }) !== undefined;
    };
    this.extend = function (maze) {
        var newPaths = [],
            lastSquare = _.last(this.array);
        _.each(lastSquare.neighbours(), function (neighbour) {
            if (!this.contains(neighbour) && maze.square(neighbour) === PATH) newPaths.push(new Path(this.array).push(neighbour));
        }, this);
        return newPaths;
    };
    this.toArray = function () {
        return _.map(this.array, function (square) {
            return square.toArray();
        });
    }
};

var WALL = 0,
    PATH = 1;

exports = module.exports = {

    // for testing
    obj: {
        Maze: Maze,
        Square: Square,
        Path: Path
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

        var paths = [new Path([start])],
            pathOK;

        while_loop:
            while (true) {
                var newPaths = [];
                for (var i in paths) {
                    var pathI = paths[i],
                        extendedPathsI = pathI.extend(maze);
                    if (extendedPathsI.length > 0) newPaths = _.union(newPaths, extendedPathsI);

                    pathOK = _.find(extendedPathsI, function (path) {
                        return path.contains(finish)
                    });
                }
                if (newPaths.length === 0 || pathOK !== undefined) break;
                paths = newPaths;
            }

        return pathOK.toArray();
    }
};
