exports = module.exports = {

    build: function (width, height, density) {
        return [
            [0, 0, 1],
            [0, 1, 1],
            [1, 1, 0]
        ];
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
