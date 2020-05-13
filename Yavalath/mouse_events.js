'use strict';

function mouseClicked() {

    // let moveids = game._get_moves_for_player(piece.id);
    let moveids = [...Array(game.board.cells.length).keys()];

    for (let cellid of moveids) {
        let d = dist(mouseX,
            mouseY,
            game.board.cells[cellid].x,
            game.board.cells[cellid].y);

        if (d < game.board.size / 3) {
            /*
            piceID is only required for games where a piece is moved from one to another.
            In other placement oriented games, pieceid is null;
             */
            let move = new Move({ pieceid: null, cellid: cellid });

            game.curr_state = game._get_next_state(game.curr_state, move);

            game.curr_player.pieces.push(new Marble(game.board.cells[cellid],
                PLAYER_COLOURS['C'],
                DISK_RADIUS))

            game.curr_player.piece_moved = true;
        }
    }

}