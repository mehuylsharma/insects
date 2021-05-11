class Ant {
    constructor(x, y, maxVel = 3, maxForce = 0.15, rad = 20) {
        this.pos = createVector(x, y);
        //this.frontSeg = createVector(0, 10);
        this.rW = rad*0.6;
        this.rH = rad*1.6;
        this.maxVel = maxVel;
        this.maxForce = maxForce;
        this.r = rad;
        this.percRad = random(rad*3, rad*8);
        this.wallDist = 20;

        this.vel = createVector(0, 0);
        this.accln = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    }

    checkForWalls() {
        var desired = null;

        if (this.pos.x < this.wallDist) {
            desired = createVector(this.maxVel, this.vel.y);
        } else if (this.pos.x > width - this.wallDist) {
            desired = createVector(-this.maxVel, this.vel.y);
        }

        if (this.pos.y < this.wallDist) {
            desired = createVector(this.vel.x, this.maxVel);
        } else if (this.pos.y > height - this.wallDist) {
            desired = createVector(this.vel.x, -this.maxVel);
        }

        this.applyForce(desired);
    }

    repelOthers(others, selfIndex) {
        for (let i = 0; i < others.length; i++) {
            if (i !== selfIndex) {
                if (dist(others[i].pos.x, others[i].pos.y, this.pos.x, this.pos.y) < this.percRad) {
                    var repel = p5.Vector.sub(this.pos, others[i].pos);
                    repel.limit(this.maxForce*2.5);
                    this.applyForce(repel);
                }
            }
        }
    }

    applyForce(vec) {
        this.accln.add(vec);
    }

    seek(target) {
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxVel);

        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }

    update() {
        this.vel.add(this.accln);
        this.vel.limit(this.maxVel);

        this.pos.add(this.vel);

        this.accln.mult(0);
    }

    display() {
        var theta = this.vel.heading() - PI/2;
/* 
        this.frontSeg.x = 10*(theta*(1/Math.PI));
        this.frontSeg.y = 10 - Math.abs(this.frontSeg.x); */

        this.update();

        push();

        translate(this.pos.x, this.pos.y);
        rotate(theta);

        stroke(255);
        strokeWeight(1.5);
        noFill();

        triangle(-this.rW, -1/3*this.rH, this.rW, -1/3*this.rH, 0, 2/3*this.rH);

        /* 
        ellipse(this.frontSeg.x, this.frontSeg.y, this.r*1.5, this.r*1.5);
        ellipse(0, 0, this.r, this.r);
        ellipse(0, -10, this.r*2, this.r*2); */

        pop();
    }
}