class Worm {
    constructor(x, y, mF = 0.2, mV = 1.5) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.accln = createVector(0, 0);
        this.radius = 30;

        this.maxForce = mF;
        this.maxVel = mV;
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
    }

    update() {
        this.vel.add(this.accln);
        this.vel.limit(this.maxVel);

        this.pos.add(this.vel);

        this.accln.mult(0);
    }

    repelOthers(others, selfIndex) {
        for (let i = 0; i < others.length; i++) {
            if (i !== selfIndex) {
                if (dist(others[i].pos.x, others[i].pos.y, this.pos.x, this.pos.y) < 12) {
                    var repel = p5.Vector.sub(this.pos, others[i].pos);
                    repel.limit(this.maxForce);
                    this.applyForce(repel);
                }
            }
        }
    }

    display() {

        push();

        translate(this.pos);

        noStroke();
        ellipse(0, 0, this.radius, this.radius)

        pop();
    }

    shadows(d) {
        push();

        translate(this.pos);

        fill(40);
        ellipse(d, d, this.radius, this.radius);

        pop();
    }
}