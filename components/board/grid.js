'use strict';


class Grid {

    constructor(posx, posy, size = GRID_SIZE, nrows = 15, ncols = 15) {

        this.cells = [];
        this.nrows = nrows;
        this.ncols = ncols;
        this.size = size;

        let x = posx - (((nrows - 1) / 2) * size);
        let y = posy - (((ncols - 1) / 2) * size);

        for (let i = 0; i < ncols; ++i) {
            for (let j = 0; j < nrows; ++j) {
                this.cells.push(new PointCell(createVector(x, y)));

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

    _hovered() {

        for (let cell of this.cells) {

            let d = dist(mouseX, mouseY, cell.pos.x, cell.pos.y);

            if (d < GRID_SIZE / 2) {
                cell._set_size(POINTCELL_SIZE + 4);
                this.is_hover = true;
                return this.is_hover;
            } else {
                cell._set_size(POINTCELL_SIZE);
                this.is_hover = false;
            }
        }
        return this.is_hover;
    }

    _render() {
        stroke(255);
        strokeWeight(1);
        for (let i = 0; i < this.nrows; ++i) {

            // Horizontal lines
            let last = this.nrows * (this.ncols - 1) + i;
            line(this.cells[i].pos.x, this.cells[i].pos.y,
                this.cells[last].pos.x, this.cells[last].pos.y);
        }

        for (let i = 0; i < this.ncols; ++i) {

            // Vertical lines
            let last = this.nrows * i + (this.nrows - 1);
            line(this.cells[this.nrows * i].pos.x, this.cells[this.nrows * i].pos.y,
                this.cells[last].pos.x, this.cells[last].pos.y);

        }

        for (let v of this.cells) {
            v._render();
        }

    }
}