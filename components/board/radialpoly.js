'use strict';


class RadialPoly {

    constructor(posx, posy, size, nsides = 8) {

        // Cells to be used in the game
        this.cells = polygon(posx, posy, size, nsides);
        this.nsides = nsides;

        // vertices for rendering the board
        this.vertices = [];

        /* ======= Deep Copying the vertices ======= */
        for (let c of this.cells) {
            this.vertices.push(createVector(c.x, c.y));
        }
        this.vertices.push(this.vertices[1]);
    }

    _neighbours(pos) {

        if (pos instanceof p5.Vector) {
            var id = this.cells.findIndex(o => o.x === pos.x && o.y === pos.y);
        } else {
            var id = pos;
        }

        if (id == 0) { // If center piece, then all the vertices are neighbours
            return Array(this.nsides + 1 - 1).fill().map((d, i) => i + 1);
        } else if (id == 1) {
            return [0, id + 1, this.cells.length - 1];
        } else if (id == this.cells.length - 1) {
            return [0, id - 1, 1];
        } else {
            return [0, id + 1, id - 1];
        }

    }

    _render() {

        stroke(255);
        strokeWeight(5);
        noFill();
        beginShape(TRIANGLE_FAN);
        for (let v of this.vertices) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);

        fill(255);
        for (let v of this.vertices) {
            circle(v.x, v.y, 10);
        }

    }

}