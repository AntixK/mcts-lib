"use strict"


class HumanPlayer {

    constructor() {
        this.pieces = [];
        this.piece_moved = false;
    }

    _make_move(game) {
        if (this.piece_moved) return true;
        else return false;
    }


    _render() {
        for (let p of this.pieces) {
            p._render();
        }
    }

}