'use strict';


class AbstractStrategyGame {

    constructor(players, state_representation) {

        this.players = players;
        this.curr_player_id = 0;
        this.curr_player = this.players[this.curr_player_id];

        this.curr_state = new State(state_representation, this.curr_player_id, []);
    }

    get curr_opponent_id() {
        return 1 - this.curr_player_id;
    }

    get curr_opponent() {
        return this.players[this.curr_opponent_id];
    }

    _switch_player() {
        if (this._is_move_complete()) {
            this._reset_move_flags()

            this.curr_player = this.curr_opponent;
            this.curr_player_id = this.curr_opponent_id;
        }
    }

    play() {

        this._render();

        if (this._is_over()) {
            console.log(this._is_over(), " is the winner")
            return this._is_over();
        } else {

            this._make_move();
            this._switch_player();
        }
        return false;

    }

    _is_move_complete() {
        return this.curr_player.piece_moved;
    }

    _make_move() {
        this.curr_player._make_move(this);
    }

    _reset_move_flags() {
        this.curr_player.piece_moved = false;
    }


    _get_next_state(state, move) {

        let new_player = 1 - state.player_id;

        let new_history = state.move_history.slice();
        new_history.push(move);

        // console.log(state.board_state);
        let curr_move = move.move;
        let new_board_state = state.board_state.slice();

        new_board_state[curr_move.cellid] = state.player_id;
        new_board_state[curr_move.pieceid] = null;

        return new State(new_board_state, new_player, new_history);

    }


    /* Abstract Functions (To be implemted by the user) */
    /* ================================================= */

    _get_moves_for_player(id) {
        console.error("Not Implemented");
    }

    __get_moves_for_state(state) {
        console.error("Not Implemented");

    }

    _is_over() {
        console.error("Not Implemented");
    }

    _get_winner(state) {
        console.error("Not Implemented");

    }

    _reset_canvas() {
        console.error("Not Implemented");
    }

    _render() {
        console.error("Not Implemented");
    }



}