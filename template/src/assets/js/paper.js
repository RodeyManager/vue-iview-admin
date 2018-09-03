import * as paper from 'paper';

const {
  Path,
  Point,
  Size,
  Segment
} = paper;

var values = {
  friction: 0.8,
  timeStep: 0.01,
  amount: 20,
  mass: 2,
  count: 0
};
values.invMass = 1 / values.mass;

var path, springs, size;

var Spring = function (a, b, strength, restLength) {
  this.a = a;
  this.b = b;
  this.restLength = restLength || 80;
  this.strength = strength ? strength : 0.25;
  this.mamb = values.invMass * values.invMass;
};

Spring.prototype.update = function () {
  var delta = new Point(this.b.x - this.a.x, this.b.y - this.a.y);
  var dist = delta.length;
  var normDistStrength = (dist - this.restLength) / (dist * this.mamb) * this.strength;
  delta.y *= normDistStrength * values.invMass * 0.2;
  if (!this.a.fixed) this.a.y += delta.y;
  if (!this.b.fixed) this.b.y -= delta.y;
};

function createPath(strength) {
  var path = new Path({
    fillColor: 'black'
  });
  path.opacity = 0.05;
  springs = [];
  for (var i = 0; i <= values.amount; i++) {
    var segment = path.add(new Segment(new Point(i / values.amount * size.width, size.height * 0.3)));
    var point = segment.point;
    if (i == 0 || i == values.amount) point.y += size.height;
    point.px = point.x;
    point.py = point.y;
    point.fixed = i < 2 || i > values.amount - 2;
    if (i > 0) {
      var spring = new Spring(segment.previous.point, point, strength);
      springs.push(spring);
    }
  }
  path.position.x -= size.width / 4;
  return path;
}

function onResize() {
  if (path) path.remove();
  size = new Size(paper.view.bounds.size.width * 2, paper.view.bounds.size.height);
  path = createPath(0.1);
}

function onMouseMove(event) {
  var location = path.getNearestLocation(event.point);
  var segment = location.segment;
  var point = segment.point;

  if (!point.fixed && location.distance < size.height / 4) {
    var y = event.point.y;
    point.y += (y - point.y) / 6;
    if (segment.previous && !segment.previous.fixed) {
      var previous = segment.previous.point;
      previous.y += (y - previous.y) / 24;
    }
    if (segment.next && !segment.next.fixed) {
      var next = segment.next.point;
      next.y += (y - next.y) / 24;
    }
  }
}

function onFrame(event) {
  updateWave(path);
}

function updateWave(path) {
  var force = 1 - values.friction * values.timeStep * values.timeStep;
  for (var i = 0, l = path.segments.length; i < l; i++) {
    var point = path.segments[i].point;
    var dy = (point.y - point.py) * force;
    point.py = point.y;
    point.y = Math.max(point.y + dy, 0);
  }

  for (var j = 0, l = springs.length; j < l; j++) {
    springs[j].update();
  }
  path.smooth({
    type: 'continuous'
  });
}

function init(id) {
  const canvas = document.getElementById(id);
  const context = canvas.getContext('2d');
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  context.width = w;
  context.height = h;
  paper.setup(canvas);
  size = new Size(paper.view.size.width * 2, paper.view.size.height);
  paper.view.onFrame = onFrame;
  paper.view.onResize = onResize;
  paper.view.onMouseMove = onMouseMove;
  onResize();
}

export default {
  init
};
