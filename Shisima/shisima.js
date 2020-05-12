"use strict"

// CANVAS_WIDTH = 700;
// CANVAS_HEIGHT = 700;

class Shisima extends AbstractStrategyGame {

    constructor(ai = UCT) {

        let state = [null, 0, 0, 0, null, 1, 1, 1, null]; // Initial State of the game
        // super([new HumanPlayer(), new AIPlayer(new RandomAI())], state);
        // super([new AIPlayer(new UCT()), new HumanPlayer()], state);
        super([new HumanPlayer(), new AIPlayer(new ai())], state);


        this.board = [];

        this.curr_player.piece_moved = false;
    }

    _reset_canvas() {
        let cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        // Position the canvas to the centre of the screen.
        cnv.position((SCREEN_WIDTH - CANVAS_WIDTH) / 2, 90);
        background(BGN_COLOUR);

        // Construct the board
        this.board = new RadialPoly(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 200, 8);

        // Place the pieces
        for (let i = 0; i < 3; ++i) {
            this.players[0].pieces.push(new Disk(this.board.cells[i + 1],
                PLAYER_COLOURS['P'],
                DISK_RADIUS,
                i + 1));
        }

        for (let i = 0; i < 3; ++i) {
            this.players[1].pieces.push(new Disk(this.board.cells[i + 5],
                PLAYER_COLOURS['Y'],
                DISK_RADIUS,
                i + 5));
        }

    }

    _get_moves_for_player(id) {
        let neighbours = this.board._neighbours(id);


        // console.log(neighbours);
        // Check if any of the neighbours are occupied

        let moves = [];
        // console.log(neighbours.filter(function(el) {
        //     return !this.players[0].pieces.includes(el);
        // }));

        for (let i of neighbours) {
            let flag = false;
            for (let j = 0; j < this.players[0].pieces.length; ++j) {
                if (i == this.players[0].pieces[j].id ||
                    i == this.players[1].pieces[j].id) {
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                moves.push(i);
            }
        }

        // console.log(moves);
        return moves;
    }

    arrayContains(a, b) {
        return a.every(i => b.includes(i));

    }

    _is_over() {
        // Player 1

        let ids = [];
        for (let p of this.players[0].pieces) {
            /* Best way to find the index from an array of objects */
            let id = this.board.cells.findIndex(o => o.x === p.pos.x && o.y === p.pos.y)
            ids.push(id);
        }

        // console.log(ids);
        if (this.arrayContains(ids, [0, 1, 5]) ||
            this.arrayContains(ids, [0, 2, 6]) ||
            this.arrayContains(ids, [0, 3, 7]) ||
            this.arrayContains(ids, [0, 4, 8])) {

            return 1;
        }

        // player 2
        ids = []
        for (let p of this.players[1].pieces) {
            let id = this.board.cells.findIndex(o => o.x === p.pos.x && o.y === p.pos.y)
            ids.push(id);
        }

        // console.log(ids);
        if (this.arrayContains(ids, [0, 1, 5]) ||
            this.arrayContains(ids, [0, 2, 6]) ||
            this.arrayContains(ids, [0, 3, 7]) ||
            this.arrayContains(ids, [0, 4, 8])) {
            return 2;
        }

        return false;

    }

    _get_winner(state) {

        let board = state.board_state;

        if ((board[0] === 0 && board[1] === 0 && board[5] === 0) ||
            (board[0] === 0 && board[2] === 0 && board[6] === 0) ||
            (board[0] === 0 && board[3] === 0 && board[7] === 0) ||
            (board[0] === 0 && board[4] === 0 && board[8] === 0)) {
            return 0;
        }

        if ((board[0] === 1 && board[1] === 1 && board[5] === 1) ||
            (board[0] === 1 && board[2] === 1 && board[6] === 1) ||
            (board[0] === 1 && board[3] === 1 && board[7] === 1) ||
            (board[0] === 1 && board[4] === 1 && board[8] === 1)) {
            return 1;
        }

        return null;

    }

    _get_moves_for_state(state) {

        let all_possible_moves = [];

        for (let id = 0; id < state.board_state.length; ++id) {

            if (state.board_state[id] === state.player_id) {
                let neighbours;

                if (id == 0) { // If center piece, then all the vertices are neighbours
                    neighbours = Array(state.board_state.length - 1).fill().map((d, i) => i + 1);
                } else if (id == 1) {
                    neighbours = [0, id + 1, state.board_state.length - 1];
                } else if (id == state.board_state.length - 1) {
                    neighbours = [0, id - 1, 1];
                } else {
                    neighbours = [0, id + 1, id - 1];
                }

                for (let n of neighbours) {

                    if (state.board_state[n] === null) {
                        all_possible_moves.push(new Move({ pieceid: id, cellid: n }));
                    }
                }

            }

        }

        return all_possible_moves;

    }


    _render() {
        background(BGN_COLOUR);
        this.board._render();
        this.players[0]._render();
        this.players[1]._render();

    }

}