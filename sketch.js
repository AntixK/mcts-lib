let g;

function setup() {
    // put setup code here

    let cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    cnv.position((SCREEN_WIDTH - CANVAS_WIDTH) / 2, 10);
    cnv.style('display', 'block');

    background(51);
    // g = new Grid(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    // g._render();

    // g = new HexGrid(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    g = new HexRhombus(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    g._render();

    let d = new Disk(g.cells[1].pos,
        PLAYER_COLOURS['R'],
        DISK_RADIUS);
    d._render();

    let d2 = new Marble(g.cells[2].pos,
        PLAYER_COLOURS['C'],
        DISK_RADIUS);
    d2._render();

    let d1 = new Disk(g.cells[17].pos,
        PLAYER_COLOURS['Y'],
        DISK_RADIUS);
    d1._render();

    // let d3 = new Tile(g.cells[16].pos,
    //     PLAYER_COLOURS['Y']);
    // d3._render();
}

function draw() {
    // put drawing code here
}