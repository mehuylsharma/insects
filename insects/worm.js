class Worm {
    constructor(x, y, segs, len) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.accln = createVector(0, 0);
        this.segments = segs;
        this.length = len;
        this.radius = (len/segs)*0.5;

        this.maxForce = 0.1;
        this.maxVel = 2;

        this.segs = [];

        for (let i = 0; i < 9; i++) {
            this.segs[i] = new Segment(this.radius, 20);
        }
    }

    applyForce(vec) {
        this.accln.add(vec);
    }

    seek(target) {
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxVel);

        var steer = p5.Vector.sub(desired, this.vel);
        steer.setMag(this.maxForce);

        this.applyForce(steer);

        for (let i = 0; i < 9; i++) {
            if (i == 0) {
                this.segs[i].pointInDirection(target);
            }
            
        }
    }

    update() {
        this.vel.add(this.accln);
        this.vel.limit(this.maxVel);

        this.pos.add(this.vel);

        this.accln.mult(0);

        for (let i = 0; i < 9; i++) {
            if (i == 0) {
                this.segs[i].chase(this.pos);
            } else {
                this.segs[i].chase(this.segs[i].initPos);
            }
            
        }
    }

    display() {

        push();

        translate(this.pos);

        ellipse(0, 0, this.radius, this.radius)

        pop();
    }
}

class Segment {
    constructor(r, l) {
        this.initPos = createVector(width/2, height/2);
        this.finalPos = createVector(0, r);
        this.length = l;
        this.maxSpeed = 0.1;
    }

    chase(vec) {
        this.finalPos = vec;
    }

    pointInDirection(target) {
        this.initPos.x = this.finalPos.x - (target.x - this.finalPos.x)/10;
        this.initPos.y = this.finalPos.y - (target.y - this.finalPos.y)/10;
    }

    display() {
        fill(255);
        stroke(255);
        strokeWeight(3);
        line(this.initPos.x, this.initPos.y, this.finalPos.x, this.finalPos.y);
    }
}