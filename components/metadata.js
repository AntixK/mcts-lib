'use strict';

const BGN_COLOUR = 51;
const SCREEN_WIDTH = screen.width;
const SCREEN_HEIGHT = screen.height;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

const DISK_RADIUS = CANVAS_HEIGHT * 60 / 800;
const MARBLE_RADIUS = CANVAS_HEIGHT * 60 / 800;
const TILE_SIZE = CANVAS_HEIGHT * 35 / 1000;


const PLAYER_COLOURS = {
    P: [255, 65, 134],
    Y: [255, 204, 102],
    C: [18, 151, 147],
    B: [75, 120, 219],
    R: [224, 79, 54]
}