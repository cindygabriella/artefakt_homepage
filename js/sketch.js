var data = [];
var ready = false;

var slider;

function setup() {
  d3.csv("csv/globalplasticsproduction.csv", function (d) {
    return {
      Year: +d.Year,
      ﻿Entity: d.﻿Entity,
      Globalplasticsproduction: +d.Globalplasticsproduction,
    };
  }).then(function (csv) {
    data = csv;
    // console.log(data);
    ready = true;
    redraw();
  });

  let can = createCanvas(1500, 400);
  can.parent('grafik1');
  textSize(10);
  //pixelDensity(10);

  slider = createSlider(1950, 2015, 1960);
  slider.parent('grafik1-ui');
  slider.position(100,600);
}

function draw() {
  if (!ready) {
    background(255, 0, 0);
    noStroke();
    return;
  } else {
    background(255);
  }

  var d, x, y, w, h;

  fill('#96B396');
  stroke(255);


  //Globalplasticsproduction als Y-Achse, Year als X-Achse.
  // Minimum Globalplasticsproduction finden
  var plasticsMin = d3.min(data, function (d) {
    return d.Globalplasticsproduction;
  });

    //Maximum Globalplasticsproduction finden
  var plasticsMax = d3.max(data, function (d) {
    return d.Globalplasticsproduction;
  })

  //Kleinses Jahr finden
  var yearMin = d3.min(data, function (d) {
    return d.Year;
  });

    //Grösstes Jahr finden
  var yearMax = d3.max(data, function (d) {
    return d.Year;
  });


  // test slider

  var val = slider.value();
  console.log(val);


    //Anzahl Jahre rechnen
  var yearCount = yearMax - yearMin;
  for (var i = 0; i < data.length; i++) {
    d = data[i];
     //Jahr auf die x-Achse mappen
    x = map(d.Year, yearMin, yearMax, 0, width);
    //y = (height / d.year) + 10;
     //Globalplasticsproduction auf die y-Achse Mappen
    y = map(d.Globalplasticsproduction, plasticsMin, plasticsMax, 0, 370);


     //Breite des Balkens
    w = width / yearCount;
    //h = (height * (i / data.length)) - 5;
    push();                    // <- push a drawing context
    // translate(x, y);        // <- move to position
    // rect(0, 0, w, h);
    // rect(x, 0, w, y);           // <- draw a rectangle

    // TEST p5.experience.js:
    // one = uxRect(x, height-y, w, y);
    // one.uxEvent('hover', trigger);

    rect(x, height-y, w, val);

    // fill(255);                 // <- change colors

    text(d.Year, x,height-y-10);  // <- draw the label
    text(val, x, height-y-20);
    noStroke();
    pop();                     // <- reset the drawing context
  }








  // const total = slider.value();
  // text('total', totalSlider.x * 2 + totalSlider.width, totalSlider.height);
  // text(str, x, y, [x2], [y2])
  //  rect(total);



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
