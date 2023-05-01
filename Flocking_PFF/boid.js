class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(2, 4));
        this.acc = createVector();
        this.maxforce = 0.5;
        this.maxspeed = 4;
        this.r = 4;

    }
    follow(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyforce(force);
    }
    showCircle() {
        stroke(255);
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    show() {
        let triangleSize = 12;
        let x = this.pos.x;
        let y = this.pos.y;
        fill(51);
        stroke(255);
        push();
        translate(x, y);
        rotate(this.vel.heading() - radians(90));
        triangle(
            0,
            0,
            triangleSize,
            0,
            triangleSize / 2,
            triangleSize * 1.2,

        );
        pop();
    }

    applyforce(force) {
        this.acc.add(force);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.acc.mult(0);
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    align(boids) {
        let PreceptionRadius = PRalignSlider.value();
        let steering = createVector();
        let total = 0;

        for (let other of boids) {
            let boid = other.userData;
            //console.log(boid);
            let d = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
            //let d = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
            if (d < PreceptionRadius && boid != this) {
                steering.add(boid.vel);
                total++;
            }

        }


        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxspeed)
            steering.sub(this.vel);
            steering.limit(this.maxforce);
            return steering;
        }

    }

    cohesion(boids) {
        let PreceptionRadius = PRCohesionSlider.value();
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let boid = other.userData;
            //console.log(boid);
            let d = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
            //let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

            if (d < PreceptionRadius && boid != this) {
                steering.add(boid.pos);
                total++;
            }

        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.maxspeed);
            steering.sub(this.vel);
            steering.limit(this.maxforce);
            return steering;
        }
    }

    separation(boids) {
        let PreceptionRadius = PRseperationSlider.value();
        let steering = createVector();
        let total = 0;

        for (let other of boids) {
            let boid = other.userData;
            //console.log(boid);
            let d = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
            //let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (d < PreceptionRadius && boid != this) {
                let diff = p5.Vector.sub(this.pos, boid.pos);
                diff.mult(d * d);
                steering.add(diff);
                total++;
            }


        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxspeed);
            steering.sub(this.vel);
            steering.limit(this.maxforce);
            return steering;
        }
    }
    flocking(boids) {
        this.acc.mult(0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        if (separation != undefined) {
            separation.mult(separationSlider.value());
        }
        if (alignment != undefined) {
            alignment.mult(alignSlider.value());
        }
        if (cohesion != undefined) {
            cohesion.mult(cohesionSlider.value());
        }
        //separation.mult(separationSlider.value());
        //alignment.mult(alignSlider.value());
        //cohesion.mult(cohesionSlider.value());

        this.applyforce(alignment);
        this.applyforce(cohesion);
        this.applyforce(separation);
    }

}