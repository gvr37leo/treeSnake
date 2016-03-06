var Player = function(id,snake){
    this.id = id;
    this.snake = snake;
    this.score = 0;
    this.highscore = 0;
};

module.exports = Player;