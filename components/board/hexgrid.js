'use strict';

class HexGrid {

    constructor(posx, posy, size = HEXGRID_SIZE, side_length = 5) {

        this.row_length = [5, 6, 7, 8, 9, 8, 7, 6, 5];
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
                this.cells.push(createVector(x, y));
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

    }


    _render() {
        noStroke();
        for (let v of this.cells) {

            if (v !== null) {
                fill(255);
                circle(v.x, v.y, this.size - 3);

                fill(BGN_COLOUR);
                circle(v.x, v.y, 25);
            }

        }

    }
}