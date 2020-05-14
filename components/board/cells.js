'use strict';


class RingCell {
    constructor(pos, size = RINGCELL_SIZE, colour = 255) {
        this.pos = pos;
        this.size = size;
        this.colour = colour;
    }

    _set_size(size) {

        this.size = size;
    }

    _render() {
        noStroke();
        fill(this.colour);
        circle(this.pos.x, this.pos.y, this.size);

        fill(BGN_COLOUR);
        circle(this.pos.x, this.pos.y, 25);
    }
}


class HexCell {
    constructor(pos, size = HEXCELL_SIZE, colour = 255) {
        this.pos = pos;
        this.size = size;
        this.colour = colour;

        this.vertices = polygon(pos.x, pos.y, this.size, 6);

        this.vertices.shift();
    }

    _set_size(size) {

        this.size = size;
        this.vertices = polygon(this.pos.x, this.pos.y, this.size, 6);

        this.vertices.shift();

    }

    _render() {
        stroke(this.colour);
        strokeWeight(5);
        noFill(this.colour);
        beginShape();
        // translate(width / 2, height / 2);
        for (let v of this.vertices) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
    }
}