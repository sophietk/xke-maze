"use strict";

(function () {

    // Dependencies
    var root = this,
        has_require = typeof require !== 'undefined',
        _ = root._;
    if (typeof _ === 'undefined') {
        if (has_require)  _ = require('underscore');
        else throw new Error('maze.js requires underscore');
    }

    /*

     maze representation :

     ┼────────── x
     |0,0    n,0
     |
     |
     |0,m    n,m
     y

     */

    var WALL = 0,
        PATH = 1,
        HIGHLIGHT = 2;

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

    var maze = {

        // for testing
        Obj: {
            Maze: Maze,
            Square: Square,
            Path: Path
        },

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
            start = new Square(start[0], start[1]);
            finish = new Square(finish[0], finish[1]);
            maze = new Maze(maze);

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
        },

        highlight: function (maze, path) {
            _.each(path, function (square) {
                maze[square[1]][square[0]] = HIGHLIGHT;
            });
            return maze;
        }
    };

    // Exports
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = maze;
        }
        exports.maze = maze;
    }
    else {
        root.maze = maze;
    }

}).call(this);