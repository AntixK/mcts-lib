'use strict';

function mousePressed() {

    for (let piece of game.curr_player.pieces) {
        if (piece._clicked()) {
            // console.log(piece);
            return;
        }

    }
}

function mouseMoved() {

    for (let piece of game.curr_player.pieces) {

        if (piece._hovered()) {
            return;
        }

    }
}

function mouseDragged() {
    for (let piece of game.curr_player.pieces) {
        piece._dragged();
    }
}

function mouseReleased() {
    for (let piece of game.curr_player.pieces) {
        if (piece._clicked()) {

            let moveids = game._get_moves_for_player(piece.id);

            if (moveids.length > 0) {
                for (let cellid of moveids) {
                    let d = dist(mouseX,
                        mouseY,
                        game.board.cells[cellid].x,
                        game.board.cells[cellid].y);

                    if (d < MARBLE_RADIUS / 2) {

                        let move = new Move({ pieceid: piece.id, cellid: cellid });
                        game.curr_state = game._get_next_state(game.curr_state, move);

                        piece._set_pos(game.board.cells[cellid], cellid);
                        game.curr_player.piece_moved = true;
                        // console.log(game._get_moves_for_state(game.curr_state));



                        break;
                    }
                }
            }

            if (game.curr_player.piece_moved == false) {
                // console.log("hi");
                piece._reset_init_pos();
                // console.log(piece);
            }

            piece.is_clicked = false; // VERY IMPORTANT!!!!!
            return;

        }

    }
}