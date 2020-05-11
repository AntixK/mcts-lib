'use strict';

class Disk {

    constructor(pos, colour, radius = 75, id = null) {

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

        this.radius = radius;

        this.is_clicked = false;
        this.is_hover = false;

    }

    _clicked() {
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);

        if (d < this.radius / 2) {
            this.xoffset = mouseX - this.pos.x;
            this.xoffset = mouseY - this.pos.y;

            this.is_clicked = true;
            this.radius = DISK_RADIUS;

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

        if (d < this.radius / 2) {
            this.radius = DISK_RADIUS + 4;
            this.is_hover = true;


        } else {
            this.radius = DISK_RADIUS;
            this.is_hover = false;
        }
        return this.is_hover;

    }

    _render() {
        noStroke();
        fill(this.colour);
        circle(this.pos.x, this.pos.y, this.radius);
        fill(this.shade);
        circle(this.pos.x, this.pos.y, this.radius - 10);

        fill(this.colour);
        circle(this.pos.x + 5, this.pos.y, this.radius - 10);

    }

}