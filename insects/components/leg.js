class Leg {
    constructor(x1, y1, x2, y2, x3, y3, x4 = 0, y4 = 0, delay = 0) {
        this.current = createVector(x1, y1);
        this.currentYZero = y1;

        //Fixed Final is used to determine whether to "pull" on the leg or not
        this.final = createVector(x2, y2);
        this.fixedFinal = createVector(x2, y2);

        this.bound = createVector(x3, y3);
        this.fixedBound = createVector(x3, y3);

        this.steps = 20;

        //Used to determine which state the leg is in
        this.pullWalk = true;

        setTimeout(() => this.moveLeg(), delay);

        //Create own thigh
        this.thigh = new Thigh(x4, y4, this.current.x, this.current.y);
    }

    moveLeg() { 
        this.final.x = this.final.x + (this.bound.x - this.final.x)/this.steps;
        this.final.y = this.final.y + (this.bound.y - this.final.y)/this.steps;

        this.current.y = (this.currentYZero + this.final.y)*0.5;

        this.thigh.update(this.current);

        this.steps-=1;

        if (this.steps < 2) {
            if (this.pullWalk) {   
                this.bound.x = this.fixedFinal.x; 
                this.bound.y = this.fixedFinal.y;
            } else {
                this.bound.x = this.fixedBound.x; 
                this.bound.y = this.fixedBound.y;
            }
            this.steps = 25;
            this.pullWalk = !this.pullWalk;
        }

        setTimeout(() => this.moveLeg(), 0.1);
    }

    display(parentPos, parentAngle) {
        this.thigh.display(parentPos, parentAngle);

        push();

        translate(parentPos);
        rotate(parentAngle);

        //Body

        noFill();
        stroke(255);
        strokeWeight(0.75);

        line(this.current.x, this.current.y, this.final.x, this.final.y);

        pop();
    }

    shadows(diff, col) {
        var d = diff;

        this.thigh.shadows(diff, col);

        push();

        //Shadows

        noFill();
        stroke(col);
        strokeWeight(1.5);

        line(this.current.x+d, this.current.y+d, this.final.x+d, this.final.y+d);

        pop();
    }
}

class Thigh {
    constructor(x1, y1, x2, y2) {
        this.current = createVector(x1, y1);
        this.currentZero = y1;

        this.final = createVector(x2, y2);
    }

    update(posA) {
        this.final.x = posA.x;
        this.final.y = posA.y;

        this.current.y = (this.currentZero + this.final.y)*0.35;
    }

    display(parentPos, parentAngle) {
        push();

        translate(parentPos);
        rotate(parentAngle);

        //Body

        noFill();
        stroke(255);
        strokeWeight(1.25);

        line(this.current.x, this.current.y, this.final.x, this.final.y);

        pop();
    }

    shadows(diff, col) {
        var d = diff;

        push();

        //Shadows

        noFill();
        stroke(col);
        strokeWeight(1.5);

        line(this.current.x+d, this.current.y+d, this.final.x+d, this.final.y+d);

        pop();
    }
}