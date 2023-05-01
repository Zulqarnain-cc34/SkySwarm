let flock = [];
let alignSlider, cohesionSlider, separationSlider;
let PRCohesionSlider, PRalignSlider, PRseperationSlider;
let p;

function setup() {
    createCanvas(640, 360);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    PRCohesionSlider = createSlider(0, 200, 100, 5);
    PRalignSlider = createSlider(0, 200, 100, 5);
    PRseperationSlider = createSlider(0, 100, 50, 5);
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(151);
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.show();
        boid.update();
    }
}