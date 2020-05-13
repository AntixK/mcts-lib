"use strict"

class RandomAI {

    _get_move(game) {

        let all_possible_moves = [];

        all_possible_moves = game._get_moves_for_state(game.curr_state);

        console.log(all_possible_moves);

        let random_move = all_possible_moves[Math.floor(Math.random() *
            all_possible_moves.length)];

        return random_move;
    }
}