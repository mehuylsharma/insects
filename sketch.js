/// <reference path="./p5.global-mode.d.ts" />

const antsTotal = 15;
const changeTimer = 30;

var ants = [];
var targets = [];
var timer = 0;
var gizmos = false;
var shadows = false;
var gizmoButton = null;

function setup() {
    createCanvas(1000, 650);
    for (let i = 0; i < antsTotal; i++) {
        ants[i] = new Ant(random(width), random(height));
        targets[i] = createVector(random(width), random(height));
    }
    gizmoButton = createButton('Gizmos');
}

function draw() {
    background(50);

    //Ant functions

    for (let i = 0; i < antsTotal; i++) {
        ants[i].checkForWalls();
        ants[i].seek(targets[i]);
        ants[i].display();
        ants[i].repelOthers(ants, i);
    }
    
    if (timer > changeTimer) {
        for (let i = 0; i < antsTotal; i++) {
            targets[i] = createVector(random(80, width-80), random(80, height - 80));
        }
        timer = 0;
    }

    gizmoButton.mouseClicked(() => {
        gizmos = !gizmos;
    })

    if (gizmos) {
        //Draw Gizmos

        for (let i = 0; i < antsTotal; i++) {
            var t = targets[i];
            var s = ants[i];

            //Target
            fill(color(0, 200, 155));
            circle(t.x, t.y, 5);

            //Line to the Target
            stroke(color(0, 200, 200));
            line(t.x, t.y, s.pos.x, s.pos.y);

            //Perception Radius
            stroke(color(200, 0, 200));
            noFill();
            circle(s.pos.x, s.pos.y, s.percRad);
        }
    }

    timer++;
}