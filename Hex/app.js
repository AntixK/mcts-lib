"use strict"

let game;
let ai_type;
let first_player;


function setup() {
    // UI
    let restart_button = createButton('Start');
    restart_button.position((SCREEN_WIDTH - CANVAS_WIDTH) / 2 - 170, 650);
    restart_button.class('button');
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

    // ================================
    first_player = createRadio();
    first_player.class('radio')
    first_player.option('You', 0);
    first_player.option('Computer', 1);
    first_player.style('width', '150px');
    first_player.position((SCREEN_WIDTH - CANVAS_WIDTH) / 2 - 170, 550);
    first_player.value('You');
    textAlign(CENTER);
    fill(255, 0, 0);

    val = first_player.value();
    if (val == 0) {
        val = true;
    } else {
        val = false;
    }

    game = new Hex(ai_algo, val);
    game._reset_canvas();
    game._render();

    noLoop();

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

    val = first_player.value();
    if (val == 0) {
        val = true;
    } else {
        val = false;
    }

    game = new Hex(ai_algo, val);
    game._reset_canvas();
    game._render();

    loop();
}