'use strict';

class HexRhombus {

    constructor(posx, posy, size = 45, side_length = 11) {

        if (side_length > 11) {
            console.error('side_length must be <= 11');
        }

        this.cells = [];

        this.size = size;
        this.side_length = side_length;

        let t = (side_length - 1) * size;
        let r = (Math.sqrt(3) / 4) * t;

        let x = (posx - (size / 2)) - r; // (size / 2) is an offset
        let y = posy - 4 * r / 7; // Fraction found through trial and error
        let prev_y = posy - 4 * r / 7;

        for (let i = 0; i < side_length; ++i) {
            for (let j = 0; j < side_length; ++j) {
                this.cells.push(new HexCell(
                    createVector(x, y), HEXCELL_SIZE_SMALL));

                y += size;
            }

            x += size;
            y = prev_y - (size / 2);
            prev_y -= (size / 2)
        }
    }

    _hovered() {

        for (let cell of this.cells) {

            let d = dist(mouseX, mouseY, cell.pos.x, cell.pos.y);

            if (d < HEXGRID_SIZE_SMALL / 2) {
                cell._set_size(HEXCELL_SIZE_SMALL + 4);
                this.is_hover = true;
                return this.is_hover;
            } else {
                cell._set_size(HEXCELL_SIZE_SMALL);
                this.is_hover = false;
            }
        }
        return this.is_hover;
    }


    _render() {

        // Player Sides
        stroke(PLAYER_COLOURS['R']);
        strokeWeight(10);
        line(this.cells[0].pos.x - 40,
            this.cells[0].pos.y,
            this.cells[this.side_length - 1].pos.x - 40,
            this.cells[this.side_length - 1].pos.y);

        line(this.cells[this.cells.length - this.side_length].pos.x + 40,
            this.cells[this.cells.length - this.side_length].pos.y,
            this.cells[this.cells.length - 1].pos.x + 40,
            this.cells[this.cells.length - 1].pos.y);

        stroke(PLAYER_COLOURS['Y']);
        strokeWeight(10);
        line(this.cells[0].pos.x,
            this.cells[0].pos.y - 45,
            this.cells[this.cells.length - 2 * this.side_length].pos.x,
            this.cells[this.cells.length - 2 * this.side_length].pos.y - 45);

        line(this.cells[2 * this.side_length - 1].pos.x,
            this.cells[2 * this.side_length - 1].pos.y + 45,
            this.cells[this.cells.length - 1].pos.x,
            this.cells[this.cells.length - 1].pos.y + 45);
        erase();
        noStroke();
        for (let v of this.cells) {

            if (v !== null) {
                v._render();
            }

        }
        noErase();

    }
}