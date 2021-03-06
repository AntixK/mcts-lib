'use strict';

const BGN_COLOUR = 51;
const SCREEN_WIDTH = screen.width;
const SCREEN_HEIGHT = screen.height;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
var CANVAS_WIDTH = 750;
var CANVAS_HEIGHT = 750;

const DISK_RADIUS = 45; //CANVAS_HEIGHT * 60 / 800;
const MARBLE_RADIUS = 45; //CANVAS_HEIGHT * 60 / 800;
const TILE_SIZE = 18; //CANVAS_HEIGHT * 35 / 1000;

const GRID_SIZE = 50;
const HEXGRID_SIZE = 55;
const HEXGRID_SIZE_SMALL = 45;


const HEXCELL_SIZE = 32;
const HEXCELL_SIZE_SMALL = 25;


const RINGCELL_SIZE = 68;
const POINTCELL_SIZE = 10;
const DISKCELL_SIZE = 45;


const PLAYER_COLOURS = {
    P: [255, 65, 134],
    Y: [255, 204, 102],
    C: [18, 151, 147],
    B: [57, 118, 179],
    R1: [224, 79, 54],
    R: [250, 100, 100]
}