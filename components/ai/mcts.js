"use strict"

/* UCT = MCTS + UCB1 */

/*

Note: The following needs to be implemented in asg:
    - game._get_winner() ------------> Done!
    - game._get_moves_for_state() ---> Done!
    - game. _get_next_state() -------> Done!
*/

class UCT {

    constructor(UCB1_bias = 2.0) {

        this.UCB1_bias = UCB1_bias;
        this.nodes = new Map(); // Hashmap for State and corresponding MCTSNode

    }

    // If given state does not exist, create node. (For Root node)
    _make_node(state, game) {

        if (!this.nodes.has(state.hash())) {

            let unexpanded_moves = game._get_moves_for_state(state).slice();

            let node = new MCTSNode(null, null, state, unexpanded_moves);

            this.nodes.set(state.hash(), node);
        }
    }

    /** From given state, repeatedly run MCTS to build statistics. */
    run(game, timeout = 3) {

        let state = game.curr_state;
        this._make_node(state, game);

        let end = Date.now() + timeout * 1000;
        while (Date.now() < end) {

            let node = this.select(state);
            let winner = game._get_winner(node.state);

            // Handle leaf node
            if (node._is_leaf() === false && winner === null) {
                node = this.expand(node, game);
                winner = this.simulate(node, game);
            }
            this.backpropagate(node, winner);
        }
    }

    _flip_player(player_id) {
        return 1 - player_id;
    }

    /** Phase 1, Selection: Select until not fully expanded OR leaf */
    select(state) {

        let node = this.nodes.get(state.hash())
        while (node._is_fully_expanded() && !node._is_leaf()) {
            let plays = node._get_all_moves();

            let bestPlay;
            let bestUCB1 = -Infinity;

            for (let play of plays) {
                let childUCB1 = node._get_child_node(play)
                    ._get_UCB1(this.UCB1_bias);

                if (childUCB1 > bestUCB1) {
                    bestPlay = play;
                    bestUCB1 = childUCB1;
                }
            }
            node = node._get_child_node(bestPlay)
        }
        return node
    }

    /** Phase 2, Expansion: Expand a random unexpanded child node */
    expand(node, game) {

        let plays = node._get_unexpanded_moves();

        let index = Math.floor(Math.random() * plays.length);
        let play = plays[index];

        let childState = game._get_next_state(node.state, play);

        let childUnexpandedPlays = game._get_moves_for_state(childState);

        let childNode = node._expand(play, childState, childUnexpandedPlays);
        this.nodes.set(childState.hash(), childNode);
        return childNode;
    }


    /** Phase 3, Simulation: Play game to terminal state, return winner */
    simulate(node, game) {
        let state = node.state;
        let winner = game._get_winner(state);

        while (winner === null) {

            let plays = game._get_moves_for_state(state);
            let play = plays[Math.floor(Math.random() * plays.length)];

            state = game._get_next_state(state, play);
            winner = game._get_winner(state);

        }
        return winner;
    }

    /** Phase 4, Backpropagation: Update ancestor statistics */


    backpropagate(node, winner) {

        while (node !== null) {
            node.n_plays += 1;

            // Parent's choice
            /*
            ===============================
                MAKE CHANGE!!!!!! it is from 1-2 and not -1 , 1
            =============================  

            */
            if (node.state.isPlayer(this._flip_player(winner))) {
                node.n_wins += 1;
            }

            node = node.parent;
        }
    }

    /** Get the best move from available statistics. */
    _get_best_move(game) {

        let state = game.curr_state;
        this._make_node(state, game);

        // If not all children are expanded, not enough information
        if (this.nodes.get(state.hash())._is_fully_expanded() === false)
            console.error("Not enough information!");

        let node = this.nodes.get(state.hash());
        let allPlays = node._get_all_moves();

        let bestPlay;
        let max = -Infinity;

        for (let play of allPlays) {
            let childNode = node._get_child_node(play);

            if (childNode.n_plays > max) {

                bestPlay = play;
                max = childNode.n_plays
            }
        }

        return bestPlay;
    }

    _get_move(game) {
        this.run(game, 1);

        // let stats = this.getStats(game.curr_state);
        // console.log(stats);

        let best_move = this._get_best_move(game)

        return best_move;
    }

    getStats(state) {
        let node = this.nodes.get(state.hash())
        let stats = {
            n_plays: node.n_plays,
            n_wins: node.n_wins,
            children: []
        }

        for (let child of node.children.values()) {
            if (child.node === null)
                stats.children.push({
                    move: child.move,
                    n_plays: null,
                    n_wins: null
                })
            else
                stats.children.push({
                    move: child.move,
                    n_plays: child.node.n_plays,
                    n_wins: child.node.n_wins
                })
        }
        return stats
    }

}





/* =================================================================================== */


class MCTSNode {

    constructor(parent, move, state, possible_moves) {

        this.parent = parent; // Parent MCTS Node of the current node
        this.move = move; // Move made to reach this from the parent node.

        this.state = state; // Current board state

        /* Note: move and state must provide a 'hash()' so as to track
        the list of states and moves done to reach this current state; as
        there may be multiple ways of reaching a given state. 
        */

        this.n_plays = 0;
        this.n_wins = 0;

        this.children = new Map(); // Hashmap is optimal for this kind of tracking

        // Initialize the children with null nodes
        for (let move of possible_moves) {
            this.children.set(move.hash(), { move: move, node: null })
        }

    }

    _get_child_node(move) {
        let child = this.children.get(move.hash());

        if (child === undefined) {
            console.log("no such move!");
        } else if (child.node === null) {
            console.error("Child not expanded");
        }

        return child.node;

    }

    _get_all_moves() {
        let all_moves = [];
        for (let child of this.children.values()) {
            all_moves.push(child.move);

        }

        return all_moves;

    }

    _expand(move, child_state, unexpanded_moves) {

        if (!this.children.has(move.hash())) console.error("No such move!");

        let child_node = new MCTSNode(this, move, child_state, unexpanded_moves);
        this.children.set(move.hash(), { move: move, node: child_node });

        return child_node;
    }

    _get_unexpanded_moves() {
        let moves = [];
        for (let child of this.children.values()) {
            if (child.node === null) {
                moves.push(child.move);
            }
        }

        return moves;
    }

    _is_fully_expanded() {
        for (let child of this.children.values()) {
            if (child.node === null) return false;
        }

        return true;
    }

    _is_leaf() {
        if (this.children.size === 0) return true
        else return false

    }

    _get_UCB1(bias) {
        return (this.n_wins / this.n_plays) +
            Math.sqrt(bias * Math.log(this.parent.n_plays) / this.n_plays);

    }

}