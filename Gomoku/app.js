"use strict"

let game;
let ai_type;

function setup() {
    // UI
    let restart_button = createButton('Restart');
    restart_button.position((SCREEN_WIDTH - CANVAS_WIDTH) / 2 - 170, 650);
    restart_button.class('button ');
    restart_button.mousePressed(restart);

    ai_type = createRadio();
    ai_type.class('radio')
    ai_type.option('Random');
    ai_type.option('MCTS-UCT');
    ai_type.style('width', '150px');
    ai_type.position((SCREEN_WIDTH - CANVAS_WIDTH) / 2 - 170, 250);
    ai_type.value('Random');
    textAlign(CENTER);
    fill(255, 0, 0);

    let val = ai_type.value();
    let ai_algo;

    if (val == 'Random') {
        ai_algo = RandomAI;
    } else {
        ai_algo = UCT;
    }

    game = new Gomoku(ai_algo);
    game._reset_canvas();
    game._render();

}

function draw() {
    let w = game.play();
    if (w) {
        // overlay
        fill(255);
        rect(0, 30, CANVAS_WIDTH, 70);

        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('Player ' + w + ' Wins!', CANVAS_WIDTH / 2, 70);

        noLoop();

    }
}

function restart() {
    let val = ai_type.value();
    let ai_algo;

    if (val == 'Random') {
        ai_algo = RandomAI;
    } else {
        ai_algo = UCT;
    }

    game = new Gomoku(ai_algo);
    game._reset_canvas();
    game._render();

    loop();
}