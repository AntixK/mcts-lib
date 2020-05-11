"use strict"


class State {

    /*
    Note: Player here is the current player to play.
    */
    constructor(board_state, player, move_history) {
        this.board_state = board_state;

        this.player_id = player; // Note: this playe is {1, 2}, rather than {0, 1} used in asg.js
        this.move_history = move_history;

    }

    isPlayer(player_id) {
        return (player_id === this.player_id)
    }

    hash() {
        return JSON.stringify(this.move_history);
    }
}