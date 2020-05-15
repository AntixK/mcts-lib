"use strict"


class Yavalath extends AbstractStrategyGame {

    constructor(ai = UCT) {
        let state = [...Array(61)].map((x, i) => null);

        super([new HumanPlayer(), new AIPlayer(new ai(), PLAYER_COLOURS['Y'])], state);

        this.board = [];
        this.curr_player.piece_moved = false;
    }

    _reset_canvas() {
        let cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        // Position the canvas to the centre of the screen.
        cnv.position((SCREEN_WIDTH - CANVAS_WIDTH) / 2, 90);
        background(BGN_COLOUR);

        this.board = new HexGrid(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    }

    _get_moves_for_state(state) {

        let all_possible_moves = [];

        for (let id = 0; id < state.board_state.length; ++id) {

            if (state.board_state[id] === null) {

                all_possible_moves.push(new Move({ pieceid: null, cellid: id }));

            }
        }

        return all_possible_moves;
    }

    _get_winner(state) {

        let null_id = state.board_state.indexOf(null)

        if (null_id === -1) {
            return 'No one';
        }


    }

    _render() {
        background(BGN_COLOUR);
        this.board._render();
        this.players[0]._render();
        this.players[1]._render();

    }
}