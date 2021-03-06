class Ant {
    constructor(x, y, maxVel = 3, maxForce = 0.15, rad = 9) {
        this.pos = createVector(x, y);
        this.maxVel = maxVel;
        this.maxForce = maxForce;
        this.r = rad;
        this.percRad = random(rad*3, rad*8);
        this.wallDist = 20;

        this.vel = createVector(0, 0);
        this.accln = createVector(random(-0.5, 0.5), random(-0.5, 0.5));

        this.legs = [
            new Leg(6, 4, 9, 15, 13, -5), new Leg(-6, 4, -9, 15, -13, -5, 0, 0, 200),
            new Leg(3, 0, 6, 2, 8, 4, 0, 0, 50), new Leg(-3, 0, -6, 2, -8, 4, 0, 0, 200),
            new Leg(6, -3, 10, -20, 16, 0, 0, 0, 100), new Leg(-6, -3, -10, -20, -16, 0, 0, 0, 300)
        ];
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

        this.update();

        push();

        translate(this.pos);
        rotate(theta);

        //Shadows

        fill(5);
        noStroke();

        ellipse(5, 13, this.r, this.r);
        ellipse(5, 5, this.r/2, this.r/2);
        ellipse(5, -3, this.r*1.1, this.r*1.1);

        this.legs.forEach(leg => {
            leg.shadows(3, 5);
        })
        
        //Body

        fill(255);
        noStroke();

        ellipse(0, 8, this.r, this.r);
        ellipse(0, 0, this.r/2, this.r/2);
        ellipse(0, -8, this.r*1.1, this.r*1.1);

        pop();

        this.legs.forEach(leg => {
            leg.display(this.pos, theta);
        })
    }
}