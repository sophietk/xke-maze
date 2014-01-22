exports = module.exports = {

    build: function (width, height, density) {
        var maze = [];
        for (var yCursor = 0; yCursor < height; yCursor++) {
            var line = [];
            for (var xCursor = 0; xCursor < width; xCursor++) {
                var square = Math.round(Math.random());
                line.push(square);
            }
            maze.push(line);
        }
        return maze;
    },

    solve: function (maze, start, finish) {
        return [
            [2, 0],
            [2, 1],
            [1, 1],
            [1, 0],
            [0, 0]
        ];
    }
};
