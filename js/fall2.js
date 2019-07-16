var data = [];
var ready = false;

var button;


function setup() {
  d3.csv("csv/recycling.csv", function (d) {
    return {
      Year: +d.Year,
      ﻿Entity: d.﻿Entity,
      plastic: +d.plastic,
    };
  }).then(function (csv) {
    data = csv;
    ready = true;
    //redraw();
  });

  createCanvas(700, 700);
  textSize(11);
  //pixelDensity(10);

  // test button - Achsen tauschen
  button = createButton('Achsen tauschen');
  button.position(600, 650);
  button.mousePressed(achsentauschen);
}

function draw() {
  if (!ready) {
    background(255, 0, 0);
    noStroke();
    return;
  } else {
    background(255);
  }



  fill('#9dc79d');
  // stroke(255);


  //Mismanagedplasticwaste als y-Achse, Entity als X-Achse.
  // Minimum Mismanagedplasticwaste finden
  var plasticMin = d3.min(data, function (d) {
    return d.plastic;
  });

    //Maximum Mismanagedplasticwaste finden
  var plasticMax = d3.max(data, function (d) {
    return d.plastic;
  })


  var yearMin = d3.min(data, function (d) {
     return d.Year;
  });

  var yearMax = d3.max(data, function (d) {
     return d.Year;
  });

  var yearCount = yearMax - yearMin;
  for (var i = 0; i < data.length; i++) {
    var d = data[i];

    var x = map(d.plastic, plasticMin, plasticMax, 0, 700-w);

   //Mismanagedplasticwaste auf die x-Achse Mappen
    var y = map(d.Year, yearMin, yearMax, 0, width-w);

     //Breite des Balkens
    var w = width / yearCount;
    push();                    // <- push a drawing context
    // translate(x, y);        // <- move to position

    rect(x, height-y, w, y);

    // text(d.Year, x,height-y-10);  // <- draw the label
    text(d.plastic, x,height-y-10);
    noStroke();
    pop();                     // <- reset the drawing context
  }

  // Make a call to the custom function achsentauschen()
  achsentauschen()

}

function achsentauschen() {

  }


// function trigger() {
//   console.log('uxRect just got clicked!');
// }
