'use strict';


class Grid {

    constructor(posx, posy, size = GRID_SIZE, nrows = 15, ncols = 15) {

        this.cells = [];
        this.nrows = nrows;
        this.ncols = ncols;

        let x = posx - (((nrows - 1) / 2) * size);
        let y = posy - (((ncols - 1) / 2) * size);

        for (let i = 0; i < ncols; ++i) {
            for (let j = 0; j < nrows; ++j) {
                this.cells.push(createVector(x, y));

                y += size;
            }

            x += size;
            y = posy - ((ncols - 1) / 2) * size;
        }

    }

    _rc2ind(row, col) {

        if (row >= 0 && col >= 0) {
            return (row * this.nrows) + col;
        }
    }

    _ind2rc(ind) {
        return [Math.floor(ind / this.nrows), ind % this.nrows];
    }

    _neighbours(pos) {

        if (pos instanceof p5.Vector) {
            var id = this.cells.findIndex(o => o.x === pos.x && o.y === pos.y);
        } else {
            var id = pos;
        }

        let [row, col] = this._ind2rc(id);

        let neighbours = [];
        let n_ids = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
            [row - 1, col - 1],
            [row + 1, col + 1],
            [row - 1, col + 1],
            [row + 1, col - 1]
        ];

        for (let ids of n_ids) {
            let id = this._rc2ind(ids[0], ids[1]);
            if (typeof this.cells[id] !== 'undefined') {
                neighbours.push(id);
            }
        }

        return neighbours;
    }

    _render() {
        stroke(255);

        strokeWeight(1);
        for (let i = 0; i < this.nrows; ++i) {

            // Horizontal lines
            let last = this.nrows * (this.ncols - 1) + i;
            line(this.cells[i].x, this.cells[i].y, this.cells[last].x, this.cells[last].y);
        }

        for (let i = 0; i < this.ncols; ++i) {

            // Vertical lines
            let last = this.nrows * i + (this.nrows - 1);
            line(this.cells[this.nrows * i].x, this.cells[this.nrows * i].y, this.cells[last].x, this.cells[last].y);

        }

        strokeWeight(10);
        for (let v of this.cells) {
            point(v.x, v.y);
        }

    }
}