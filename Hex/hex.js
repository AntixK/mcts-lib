"use strict"

const BOARD_SIZE = 9;

class Hex extends AbstractStrategyGame {

    constructor(ai = UCT) {
        let state = [...Array(BOARD_SIZE * BOARD_SIZE)].map((x, i) => null);

        super([new HumanPlayer(), new AIPlayer(new ai(), PLAYER_COLOURS['Y'])], state);

        this.board = [];
        this.curr_player.piece_moved = false;
    }

    _reset_canvas() {
        let cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        // Position the canvas to the centre of the screen.
        cnv.position((SCREEN_WIDTH - CANVAS_WIDTH) / 2, 90);
        background(BGN_COLOUR);

        this.board = new HexRhombus(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2,
            HEXGRID_SIZE_SMALL, BOARD_SIZE);
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

    _DFS(queue, final_ids, state, player_id) {

        let visited_nodes = [];

        while (queue.length > 0) {


            let node = queue.pop();
            visited_nodes.push(node);

            // get all neighbours
            let neighbours = this.board._neighbours(node);
            let actual_neighbours = [];


            // filter those unvisited neighbours that belong to the player
            for (let n of neighbours) {
                // console.log(n, state.board_state[n]);
                if (state.board_state[n] === player_id &&
                    visited_nodes.indexOf(n) === -1) {
                    actual_neighbours.push(n);
                }
            }

            // check if any of them are goal states
            for (let n of actual_neighbours) {
                let d = final_ids.indexOf(n);

                if (d > -1) {
                    return player_id; // Player one is the winner
                } else { // if not append them to the queue
                    queue.push(n);
                }
            }
        }

        return null;
    }

    _get_winner(state) {

        /* Do DFS on the board state for each of the players
        and check if they have reached the other side.
        */

        // player 2
        let queue = new Array(); // FIFO

        // Final ids
        let final_ids = [];
        for (let i = 1; i <= BOARD_SIZE; ++i) {
            final_ids.push(i * BOARD_SIZE - 1);
        }

        // Add initial ids
        for (let i = 0; i < BOARD_SIZE; ++i) {
            /*
            Load up the initial state only if theres any 
            piece in the top row. Speeds up the process.
            */
            if (state.board_state[i * BOARD_SIZE] === 1) {
                queue.push(i * BOARD_SIZE);
            }
        }

        // Run DFS for player 2
        let w = this._DFS(queue, final_ids, state, 1);

        if (w === null) {
            // player 1
            queue = new Array(); // FIFO

            // Final ids
            final_ids = [];
            for (let i = 0; i < BOARD_SIZE; ++i) {
                final_ids.push(i + BOARD_SIZE * (BOARD_SIZE - 1));
            }

            // console.log(final_ids);
            // Add initial ids
            for (let i = 0; i < BOARD_SIZE; ++i) {
                /*
                Load up the initial state only if theres any 
                piece in the top row. Speeds up the process.
                */
                if (state.board_state[i] === 0) {
                    queue.push(i);
                }
            }

            // Run DFS for player 1
            w = this._DFS(queue, final_ids, state, 0);
        }

        return w;

    }

    _render() {
        background(BGN_COLOUR);
        this.board._render();
        this.players[0]._render();
        this.players[1]._render();

    }
}