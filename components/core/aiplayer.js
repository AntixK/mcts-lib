"use strict"


class AIPlayer {

    constructor(ai_algo) {
        this.ai_algo = ai_algo;
        this.pieces = [];
        this.piece_moved = false;
    }

    _make_move(game) {
        let move = this.ai_algo._get_move(game);

        /* Representation of move

        {pieceid: <piece_id>, 
         cellid: <cell_id>}
        
        */
        game.curr_state = game._get_next_state(game.curr_state, move);

        move = move.move;

        for (let p of this.pieces) {
            if (p.id == move.pieceid) {
                p._set_pos(game.board.cells[move.cellid], move.cellid);
            }
        }

        this.piece_moved = true;
        return true;
    }

    _render() {
        for (let p of this.pieces) {
            p._render();
        }
    }

}