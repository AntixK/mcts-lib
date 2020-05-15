"use strict"


class AIPlayer {

    constructor(ai_algo, colour = null) {
        this.ai_algo = ai_algo;
        this.pieces = [];
        this.piece_moved = false;
        this.colour = colour;
    }

    _make_move(game) {
        let move = this.ai_algo._get_move(game);

        /* Representation of move

        {pieceid: <piece_id>, 
         cellid: <cell_id>}
        
        */
        game.curr_state = game._get_next_state(game.curr_state, move);

        move = move.move;

        if (move.pieceid === null) { // Handle cases where pieces are only placed
            this.pieces.push(new Marble(game.board.cells[move.cellid].pos,
                this.colour,
                DISK_RADIUS));

        } else { // Handle cases where the pieces are only moved.
            for (let p of this.pieces) {
                if (p.id == move.pieceid) {
                    p._set_pos(game.board.cells[move.cellid], move.cellid);
                }
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