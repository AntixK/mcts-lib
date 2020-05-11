'use strict';


function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;

    let vertices = [];
    vertices.push(createVector(x, y));
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertices.push(createVector(sx, sy));
    }


    return vertices;
}