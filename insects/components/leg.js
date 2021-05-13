class Leg {
    constructor(x1, y1, x2, y2, x3, y3 ) {
        this.current = createVector(x1, y1);

        //Fixed Final is used to determine whether to "pull" on the leg or not
        this.final = createVector(x2, y2);
        this.fixedFinal = createVector(x2, y2);

        this.bound = createVector(x3, y3);
        this.fixedBound = createVector(x3, y3);

        this.steps = 50;

        this.pullWalk = true;

        setTimeout(() => this.moveLeg(), 1);
    }

    moveLeg(delay = 0) {    
        this.final.x = this.final.x + (this.bound.x - this.final.x)/this.steps;
        this.final.y = this.final.y + (this.bound.y - this.final.y)/this.steps;
        this.steps--;

        if (this.steps < 2) {
            if (this.pullWalk) {   
                this.bound.x = this.fixedFinal.x; 
                this.bound.y = this.fixedFinal.y;
            } else {
                this.bound.x = this.fixedBound.x; 
                this.bound.y = this.fixedBound.y;
            }
            this.steps = 50;
            this.pullWalk = !this.pullWalk;
        }

        setTimeout(() => this.moveLeg(), 0.1);
    }

    display(parentPos, parentAngle) {
        push();

        translate(parentPos);
        rotate(parentAngle);

        noFill();
        stroke(255);
        strokeWeight(1);

        line(this.current.x, this.current.y, this.final.x, this.final.y);

        pop();
    }
}