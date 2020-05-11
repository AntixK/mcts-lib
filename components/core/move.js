"use strict"


class Move {
    constructor(move) {
        this.move = move; // {pieceid: <piece_id>, cellid: <cell_id>}
    }

    hash() {
        return JSON.stringify(this.move);
    }
}