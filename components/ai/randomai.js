"use strict"

class RandomAI {

    _get_move(game) {

        let all_possible_moves = [];

        for (let p of game.curr_player.pieces) {
            let possible_moves = game._get_moves_for_player(p.id);

            for (let m of possible_moves) {
                all_possible_moves.push({
                    pieceid: p.id,
                    cellid: m
                })
            }

        }

        let random_move = all_possible_moves[Math.floor(Math.random() *
            all_possible_moves.length)];

        return new Move(random_move);
    }
}