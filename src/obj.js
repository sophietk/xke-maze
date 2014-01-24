var _ = require('underscore');

var PATH = 1;

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

exports = module.exports = {
    Maze: Maze,
    Square: Square,
    Path: Path
};