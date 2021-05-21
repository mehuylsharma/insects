/// <reference path="./p5.global-mode.d.ts" />

var antInfo = {
    on: true,
    total: 12,
    changeTimer: 45,
    population: [],
    targets: [],
    timer: 0,
    gizmos: false,
    gizmoBtn: null
}

var wormsInfo = {
    on: true,
    worms: [],
    target: null,
    changeTimer: 60,
    timer: 0,
    segments: 10,
    gizmos: false,
    gizmoBtn: null
}

function setup() {
    createCanvas(1000, 650);

    //Setup ants
    for (let i = 0; i < antInfo.total; i++) {
        antInfo.population[i] = new Ant(random(width), random(height));
        antInfo.targets[i] = createVector(random(width), random(height));
    }

    antInfo.gizmoBtn = createButton('Ant Gizmos');

    //Setup worm
    for (let i = 0; i < wormsInfo.segments; i++) {
        wormsInfo.worms[i] = new Worm(width/2, height/2+(i*10));
    }

    wormsInfo.target = createVector(random(width), random(height));
    wormsInfo.gizmoBtn = createButton('Worm Gizmos');
}

function draw() {
    background(145);

    if (antInfo.on) {
        ants();
    }

    if (wormsInfo.on) {
        worms();
    }
}

function worms() {
    //Draw shadows
    for (let i = 0; i < wormsInfo.segments; i++) {
        if (i !== 0) {
            wormsInfo.worms[i].shadows(-5);
        }
    }

    //Worm AI
    for (let i = 0; i < wormsInfo.segments; i++) {
        if (i == 0) {
            wormsInfo.worms[i].seek(wormsInfo.target);
        } else {
            wormsInfo.worms[i].seek(wormsInfo.worms[i-1].pos);
            wormsInfo.worms[i].repelOthers(wormsInfo.worms, i);
            wormsInfo.worms[i].display();
        }
        wormsInfo.worms[i].update();
    }

    //Change the target in changeTimer frames
    if (wormsInfo.timer > wormsInfo.changeTimer) {
        wormsInfo.target = createVector(random(width), random(height));

        if (wormsInfo.target.x < 0) {
            wormsInfo.target.x = -wormsInfo.target.x;
        } else if (wormsInfo.target.x > width) {
            wormsInfo.target.x = width - (wormsInfo.target.x - width);
        }

        if (wormsInfo.target.y < 0) {
            wormsInfo.target.y = -wormsInfo.target.y;
        } else if (wormsInfo.target.y > height) {
            wormsInfo.target.y = height - (wormsInfo.target.y - height);
        }

        wormsInfo.timer = 0;
    }

    wormsInfo.gizmoBtn.mouseClicked(() => {
        wormsInfo.gizmos = !wormsInfo.gizmos;
    })

    //Update Timer
    wormsInfo.timer++;

    //Draw Gizmos 
    if (wormsInfo.gizmos) {
        //Line to the target
        stroke(255);
        line(wormsInfo.worms[1].pos.x, wormsInfo.worms[1].pos.y, wormsInfo.target.x, wormsInfo.target.y);

        //Target
        ellipse(wormsInfo.target.x, wormsInfo.target.y, 5, 5);
    }
}

function ants() {
    //Ant AI
    for (let i = 0; i < antInfo.total; i++) {
        antInfo.population[i].checkForWalls();
        antInfo.population[i].seek(antInfo.targets[i]);
        antInfo.population[i].display();
        antInfo.population[i].repelOthers(antInfo.population.concat(wormsInfo.worms), i);
    }
    
    //Change the target in changeTimer frames
    if (antInfo.timer > antInfo.changeTimer) {
        for (let i = 0; i < antInfo.total; i++) {
            antInfo.targets[i] = createVector(random(80, width-80), random(80, height - 80));
        }
        antInfo.timer = 0;
    }

    antInfo.gizmoBtn.mouseClicked(() => {
        antInfo.gizmos = !antInfo.gizmos;
    })

    //Gizmos
    if (antInfo.gizmos) {
        for (let i = 0; i < antInfo.total; i++) {
            var t = antInfo.targets[i];
            var s = antInfo.population[i];

            //Target
            fill(255);
            circle(t.x, t.y, 5);

            //Line to the Target
            stroke(255);
            line(t.x, t.y, s.pos.x, s.pos.y);

            //Perception Radius
            stroke(color(0, 220, 220));
            noFill();
            circle(s.pos.x, s.pos.y, s.percRad);
        }
    }

    //Update timer
    antInfo.timer++;
}