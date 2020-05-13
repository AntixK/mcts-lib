"use strict"


class Move {
    constructor(move) {
        /*
        piceid is only required for games where a piece is moved from one to another.
        In other placement oriented games, pieceid is null;
            */
        this.move = move; // {pieceid: <piece_id>, cellid: <cell_id>}
    }

    hash() {
        return JSON.stringify(this.move);
    }
}