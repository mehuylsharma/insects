/// <reference path="./p5.global-mode.d.ts" />

var antInfo = {
    on: false,
    total: 15,
    changeTimer: 45,
    population: [],
    targets: [],
    timer: 0,
    gizmos: false,
    gizmoBtn: null
}

var worms = [];

function setup() {
    createCanvas(1000, 650);

    //Setup ants
    for (let i = 0; i < antInfo.total; i++) {
        antInfo.population[i] = new Ant(random(width), random(height));
        antInfo.targets[i] = createVector(random(width), random(height));
    }
    antInfo.gizmoBtn = createButton('Ant Gizmos');

    //Setup worm
    worm = new Worm(width/2, height/2, 10, 500);
}

function draw() {
    background(175);

    if (antInfo.on) {
        ants();
    }

    //Worm
    var target = createVector(mouseX, mouseY);
    worm.seek(target);
    worm.update();
    worm.display();
    /* worm.segs.forEach(seg => seg.display()) */
}

function ants() {
    //Ant functions

    for (let i = 0; i < antInfo.total; i++) {
        antInfo.population[i].checkForWalls();
        antInfo.population[i].seek(antInfo.targets[i]);
        antInfo.population[i].display();
        antInfo.population[i].repelOthers(antInfo.population, i);
    }
    
    if (antInfo.timer > antInfo.changeTimer) {
        for (let i = 0; i < antInfo.total; i++) {
            antInfo.targets[i] = createVector(random(80, width-80), random(80, height - 80));
        }
        antInfo.timer = 0;
    }

    antInfo.gizmoBtn.mouseClicked(() => {
        antInfo.gizmos = !antInfo.gizmos;
    })

    if (antInfo.gizmos) {
        //Draw antInfo.gizmos

        for (let i = 0; i < antInfo.total; i++) {
            var t = antInfo.targets[i];
            var s = antInfo.population[i];

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

    antInfo.timer++;
}