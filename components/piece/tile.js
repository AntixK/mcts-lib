'use strict';

class Tile {

    constructor(pos, colour, size = TILE_SIZE, id = null) {

        this.id = id;
        this.pos = pos.copy();

        // Initial Position for reference
        this.init_pos = pos.copy();

        // Previous Position for dragging
        this.prev_pos = pos.copy();


        // Offset to track while being dragged
        this.xoffset = 0;
        this.yoffset = 0;

        this.colour = colour;
        this.shade = [];

        for (let c of this.colour) {
            this.shade.push(c - 45);
        }

        this.size = size;

        this.is_clicked = false;
        this.is_hover = false;

    }

    _clicked() {
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);

        if (d < this.size / 2) {
            this.xoffset = mouseX - this.pos.x;
            this.xoffset = mouseY - this.pos.y;

            this.is_clicked = true;
            this.size = TILE_SIZE;

        } else {
            this.xoffset = 0;
            this.yoffset = 0;
            this.is_clicked = false;

        }
        return this.is_clicked;
    }

    _reset_init_pos() {
        this.pos = this.init_pos.copy();
    }

    _set_pos(pos, id = null) {
        this.pos = pos.copy();
        this.init_pos = pos.copy();
        this.id = id;
    }

    _dragged() {
        if (this.is_clicked) {
            this.pos.x = mouseX - this.xoffset;
            this.pos.y = mouseY - this.yoffset;

        }

    }

    _hovered() {
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);

        if (d < this.size / 2) {
            this.size = TILE_SIZE + 4;
            this.is_hover = true;


        } else {
            this.size = TILE_SIZE;
            this.is_hover = false;
        }
        return this.is_hover;

    }

    _render() {
        rectMode(RADIUS);
        noStroke();
        fill(this.colour);
        rect(this.pos.x, this.pos.y, this.size, this.size, 5);

        strokeWeight(5);
        stroke(255);
        line(this.pos.x + this.size / 2,
            this.pos.y - this.size / 2,
            this.pos.x + this.size / 2,
            this.pos.y + this.size / 2);
    }

}