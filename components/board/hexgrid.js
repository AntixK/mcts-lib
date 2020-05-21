'use strict';

class HexGrid {

    constructor(posx, posy, size = HEXGRID_SIZE, side_length = 5) {

        this.row_length = [5, 6, 7, 8, 9, 8, 7, 6, 5];

        // useful for analysing neighbouring cells
        this.cum_row_length = [5, 11, 18, 26, 35, 43, 50, 56, 61];
        this.cells = [];

        this.size = size;

        let t = (side_length - 1) * size;
        let r = (Math.sqrt(3) / 2) * t;

        let x = (posx - (size / 2)) - r; // (size / 2) is an offset
        let y = posy - (t / 2);
        let prev_y = posy - (t / 2);


        for (let j = 0; j < this.row_length.length; ++j) {
            let r = this.row_length[j];

            for (let i = 0; i < r; ++i) {
                this.cells.push(new HexCell(
                    createVector(x, y)));
                y += size;
            }

            x += size;

            if (j < Math.floor(this.row_length.length / 2)) {

                y = prev_y - (size / 2);
                prev_y -= (size / 2)
            } else {
                y = prev_y + (size / 2);
                prev_y += (size / 2)

            }
        }

        this.is_hover = false;

    }

    _get_neighbour(cellid, n_type) {

        // North
        if (n_type === 'N') {

            if (typeof cellid - 1 === 'undefined') {
                return null;
            } else {
                return cellid - 1;
            }
        }

        // South
        if (n_type === 'S') {

            if (typeof cellid + 1 === 'undefined') {
                return null;
            } else {
                return cellid + 1;
            }
        }
    }

    _hovered() {

        for (let cell of this.cells) {

            let d = dist(mouseX, mouseY, cell.pos.x, cell.pos.y);

            if (d < HEXGRID_SIZE / 2) {
                cell._set_size(HEXCELL_SIZE + 2);
                this.is_hover = true;
                return this.is_hover;
            } else {
                cell._set_size(HEXCELL_SIZE);
                this.is_hover = false;
            }
        }
        return this.is_hover;
    }

    _render() {
        noStroke();
        for (let v of this.cells) {

            if (v !== null) {
                v._render();
            }

        }

    }
}