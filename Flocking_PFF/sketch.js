let flock = [];
let alignSlider, cohesionSlider, separationSlider;
let PRCohesionSlider, PRalignSlider, PRseperationSlider;
let p;
let cols, rows;
let z_offslider;
let scl = 20;
let w = 420;
let h = 420;
let z_off = 0;
let PRS = 50;

function setup() {
    createCanvas(400, 400);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    PRCohesionSlider = createSlider(0, 200, 100, 5);
    PRalignSlider = createSlider(0, 200, 100, 5);
    PRseperationSlider = createSlider(0, 100, 50, 5);
    cols = floor(w / scl);
    rows = floor(h / scl);
    flowfield = new Array(cols * rows);
    z_offslider = createSlider(0.001, 0.01, 0.002, 0.001);

    for (let i = 0; i < 400; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(151);
    timestep = z_offslider.value();
    let inc = 0.1;
    x_off = 0;
    for (let x = 0; x < cols + 1; x++) {
        y_off = 0;
        for (let y = 0; y < rows; y++) {
            let angle = noise(x_off, y_off, z_off) * TWO_PI;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(2);
            let index = (x + y * cols);
            flowfield[index] = v;
            stroke(0, 70);
            //push();
            //strokeWeight(2);
            //translate(x * scl, y * scl);
            //rotate(v.heading());
            //line(0, 0, scl, 0);
            //pop();
            y_off += inc;
        }
        x_off += inc;
        z_off += timestep;
    }


    let boundry = new Rectangle(0, 0, width, height);
    let qtree = new QuadTree(boundry, 2);

    for (let boid of flock) {
        let point = new Point(boid.pos.x, boid.pos.y, boid);
        qtree.insert(point);
        //qtree.show();
        let range = new Circle(boid.pos.x, boid.pos.y, boid.r * 8);
        //range.show()
        let points = qtree.query(range);
        boid.flocking(points);
        boid.follow(flowfield);
        boid.update();
        boid.edges();
        boid.show();
    }
}