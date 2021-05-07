let canvas = document.getElementById("Canvas"),
  dotColour = "white",
  lineColour = "white",
  lineW = 0.1,
  context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const getRandPos = () => {
  return {
    y: Math.random() * canvas.height,
    x: Math.random() * canvas.width,
    vel: (Math.random() - 0.5) * 1.25,
  };
};

let dots = {
  dist: 50,
  population: 500,
  rad: 1,
  arr: [],
};

function dot(x, y) {
  this.x = x;
  this.y = y;
  this.vx = getRandPos().vel;
  this.vy = getRandPos().vel;

  this.draw = () => {
    context.beginPath();
    context.arc(this.x, this.y, dots.rad, 0, Math.PI * 2, false);
    context.fillStyle = dotColour;
    context.fill();
  };

  this.animate = () => {
    if (this.x + dots.rad > innerWidth || this.x - dots.rad < 0) {
      this.vx = -this.vx;
    }
    if (this.y + dots.rad > innerHeight - 5 || this.y - dots.rad < 0) {
      this.vy = -this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;
  };
}

const populate = () => {
  for (let i = 0; i < dots.population; i++) {
    let x = getRandPos().x,
      y = getRandPos().y;
    dots.arr.push(new dot(x, y));
  }
};

populate();

const calcLine = () => {
  for (let i = 0; i < dots.population; i++) {
    for (let j = i + 1; j < dots.population; j++) {
      let dotOne = dots.arr[i];
      let dotTwo = dots.arr[j];

      if (
        Math.sqrt(
          Math.pow(dotOne.x - dotTwo.x, 2) + Math.pow(dotOne.y - dotTwo.y, 2)
        ) -
          dots.rad <
        dots.dist
      ) {
        context.beginPath();
        context.lineWidth = lineW;
        context.moveTo(dotOne.x, dotOne.y);
        context.lineTo(dotTwo.x, dotTwo.y);
        context.strokeStyle = lineColour;
        context.stroke();
        context.closePath();
      }
    }
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  calcLine();
  dots.arr.forEach((e) => {
    e.draw();
    e.animate();
  });
};

animate();
