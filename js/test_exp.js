var one;
var hover = false;

function setup() {
  var thisCanvas = createCanvas(600, 300);
  thisCanvas.parent('Exp');

  uxNoStroke();

  one = uxRect(100, 100, 200, 200);
  one.uxEvent('hover', trigger);

}

function draw() {

    if (hover) {
    one.uxFill = '#79c65d';
     hover = false;
    } else {
     one.uxFill = '#C65D5D';
      }

}

function trigger() {
  hover = true;
}
