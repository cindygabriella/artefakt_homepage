var data = [];
var ready = false;

function setup() {
  d3.csv("csv/mismanagedplasticwaste.csv", function (d) {
    return {
      Year: +d.Year,
      ﻿Entity: d.﻿Entity,
      Mismanagedplasticwaste: +d.Mismanagedplasticwaste,
    };
  }).then(function (csv) {
    data = csv;
    ready = true;
    redraw();
  });

  createCanvas(1700, 700);
  textSize(11);
  //pixelDensity(10);

}

function draw() {
  if (!ready) {
    background(255, 0, 0);
    noStroke();
    return;
  } else {
    background(255);
  }

  var d, x, y, w, ent, h;

  fill('#FOFFFO');
  stroke(255);


  //Mismanagedplasticwaste als y-Achse, Entity als X-Achse.
  // Minimum Mismanagedplasticwaste finden
  var mismanagedMin = d3.min(data, function (d) {
    return d.Mismanagedplasticwaste;
  });

    //Maximum Mismanagedplasticwaste finden
  var mismanagedMax = d3.max(data, function (d) {
    return d.Mismanagedplasticwaste;
  })

  // //Kleinses Jahr finden
  // var yearMin = d3.min(data, function (d) {
  //   return d.Year;
  // });
  //
  //   //Grösstes Jahr finden
  // var yearMax = d3.max(data, function (d) {
  //   return d.Year;
  // });

    //Anzahl Jahre rechnen
  var mismanagedCount = mismanagedMax - mismanagedMin;


  for (var i = 0; i < data.length; i++) {
    d = data[i];
    x = d.Entity;
   //Mismanagedplasticwaste auf die x-Achse Mappen
    y = map(d.Mismanagedplasticwaste, mismanagedMin, mismanagedMax, 0, 650);

     //Breite des Balkens
    w = width / mismanagedCount;

    push();                    // <- push a drawing context
    // translate(x, y);        // <- move to position

    rect(x, height-y, w, y);

    // text(d.Year, x,height-y-10);  // <- draw the label
    text(d.Entity, x,height-y-10);
    noStroke();
    pop();                     // <- reset the drawing context
  }

  // // test button - Achsen tauschen
  // button = createButton('Achsen tauschen');
  // button.position(600, 650);
  // button.mousePressed(achsentauschen);
}

// function achsentauschen() {
//   var val = random(255);
//   background(val);
// }


// function trigger() {
//   console.log('uxRect just got clicked!');
// }
